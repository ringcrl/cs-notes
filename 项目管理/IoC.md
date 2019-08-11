# IoC

## 概念解释

IoC 的全称叫做 Inversion of Control，可翻译为为「控制反转」或「依赖倒置」，它主要包含了三个准则：

- 高层次的模块不应该依赖于低层次的模块，它们都应该依赖于抽象
- 抽象不应该依赖于具体实现，具体实现应该依赖于抽象
- 面向接口编程，而不要面向实现编程

## 名词解释

- 控制反转（Inversion of Control）：是一种「思想」，类 A 依赖类 B，但 A 不控制 B 的创建和销毁，仅使用 B，那么 B 的控制权则交给 A 之外处理
- 依赖注入（Dependency Injection）：则是这一思想的一种具体「实现方式」，A 依赖于 B，因此在 A 中必然要使用 B 的实例，我们可以通过容器提供的方法注入 B 的实例
- 容器：跟业务没有关系，它仅仅只是提供了一些方法来辅助管理注入的依赖和控制模块如何执行

# App 的例子

```js
// app.js
class App {
  // App 模块此时应该称之为「容器」比较合适
  // 跟业务已经没有任何关系了
  // 它仅仅只是提供了一些方法来辅助管理注入的依赖和控制模块如何执行 
  static modules = [];
  constructor(options) {
    this.options = options;
    this.init();
  }
  init() {
    window.addEventListener('DOMContentLoaded', () => {
      this.initModules();
      this.options.onReady(this);
    });
  }
  static use(module) {
    Array.isArray(module) ?
      module.map(item => App.use(item)) :
      App.modules.push(module);
  }
  initModules() {
    App.modules.map(module => {
      module.init &&
      typeof module.init == 'function' &&
      module.init(this)
    });
  }
}

// modules/Router.js
import Router from 'path/to/Router';
export default {
  init(app) {
    app.router = new Router(app.options.router);
    app.router.to('home');
  }
};

// modules/Track.js
import Track from 'path/to/Track';
export default {
  init(app) {
    app.track = new Track(app.options.track);
    app.track.tracking();
  }
};

// index.js
import App from 'path/to/App';
import Router from './modules/Router';
import Track from './modules/Track';

App.use([Router, Track]);

new App({
  router: {
    mode: 'history',
  },
  track: {
    // ...
  },
  onReady(app) {
    // app.options ...
  },
});
```

# Car 的例子

## 非依赖注入代码

```js
// 引擎 
export class Engine {
  public cylinders = '引擎发动机1';
}
// 轮胎
export class Tires {
  public make = '品牌';
}
export class Car {
  public engine: Engine;
  public tires: Tires;
  public description = 'No DI'; 
  constructor() {
    this.engine = new Engine();
    this.tires = new Tires();
  }
  // Method using the engine and tires
  drive() {
    return `${this.description} car with ` +
      `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
}
```

这样会存在以下问题：

1. 如果有一天对引擎进行升级，在创建引擎的时候需要传入一个参数，那么这时候就需要修改Car类里的new Engine(parameter)，这样就导致Car类被破坏了。

```js
// 引擎  
export class Engine {
  public cylinders = '';
  constructor(_cylinders:string) {
    this.cylinders = _cylinders;
  }
}
```

2. 如果想在Car上使用不同品牌的轮胎，此时又得重新修改Car的代码。

```js
// 轮胎
export class Tires {
  public make = '品牌';
}
export class Tires1 extends Tires {
  public make = '品牌1';
}
export class Tires2 extends Tires {
  public make = '品牌2';
}
export class Car {
   //。。。。。。其他代码省略。。。。。。。
  public tires: Tires;
  constructor() {
    this.tires = new Tires1();
  }
}
```

3. 如何实现数据共享，比如说车联网，建立了一个Service数据中心，不同的Car通过Service实现数据通信以及数据共享，如果是通过在Car里new Service的方式，是无法实现数据共享和通信的，因为不同Car里的Service不是同一个实例。


4. 测试比较难，根本无法测试。

```js
// 一次只能测试一种情况，效率低
import { Car } from './car.ts';

describe('Car类单元测试', function () {
  it('测试品牌1轮子的Car的驾驶性能', function () {
    const car = new Car();
    car.drive().should.equal('No DI car with 品牌1 tires.');
  })
})
```

## 使用依赖注入（DI）

```js
export class Engine {
  public cylinders = '引擎发动机1';
}
export class Tires {
  public make = '品牌';
}
export class Tires1 extends Tires {
  public make = '品牌1';
}
export class Tires2 extends Tires {
  public make = '品牌2';
}
export class Car {
  public description = 'DI'; 
  // 通过构造函数注入Engine和Tires
  constructor(public engine: Engine, public tires: Tires) {}  
  // Method using the engine and tires
  drive() {
    return `${this.description} car with ` +
      `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
}
```

1. 解决问题1：如果有一天对引擎进行升级

```js
export class Engine {
  public cylinders = '';
  constructor(_cylinders:string) {
    this.cylinders = _cylinders;
  }
}

main(){
    const car = new Car(
        new Engine('引擎启动机2'), 
        new Tires1(),
    );
    car.drive();
}
```

2. 解决问题2：如果想在Car上使用不同品牌的轮胎

```js
export class Tires {
  public make = '品牌';
}
export class Tire1 extends Tires {
  public make = '品牌1';
}
export class Tire2 extends Tires {
  public make = '品牌2';
}
export class Car {
   //。。。。。。其他代码省略。。。。。。。
  constructor(public engine: Engine, public tires: Tires) {}  
}

// 此时不需要修改Car类，只需要修改主程序即可
main(){
  // 使用品牌2的轮胎
  const car = new Car(
    new Engine('引擎启动机2'),
    new Tires2(),
  );
  car.drive();
}
```

3. 解决问题3：如何实现数据共享，比如说车联网，建立一个Service数据中心（就像angular的Service层，可以给多个component共享），不同的Car通过Service实现数据通信以及数据共享。

```js
export class Service {
  public data = '';
  // 向Service存数据
  setData(_data: string) {
    this.data = _data;
  }
  // 从Service中取数据
  getData() {
    return this.data;
  }
}

export class Car {
  constructor(public service: Service) { }
  // 向Service存数据
  setDataToService(_data: string) {
    this.service.setData(_data);
  }
  // 从Service中取数据
  getDataFromService() {
    return this.service.getData();
  }
}

main(){
  // 创建一个共享服务中心Service
  const shareService = new Service();
  const car1 = new Car(shareService);
  const car2 = new Car(shareService);
  // car1向服务中心存数据
  car1.setDataToService('this data is from car1.');
  // car2从服务中心取数据
  car2.getDataFromService();
}
```

4. 解决问题4：测试用例

```js
import { Car,Engine,Tires1, Tires2} from './car.ts';
// 测试程序入口
describe('Car类单元测试', function () {
  const engine1 = new Engine('引擎发动机1');
  const engine2 = new Engine('引擎发动机2');
  const tires1 = new Tires1();
  const tires2 = new Tires2();

  it('测试引擎1 轮胎品牌1', function () {
    const car = new Car(engine1, tires1);
    car.drive().should.equal('DI car with 引擎发动机1 cylinders and 品牌1 tires.');
  });
  it('测试引擎1 轮胎品牌2', function () {
    const car = new Car(engine1, tires2);
    car.drive().should.equal('DI car with 引擎发动机1 cylinders and 品牌2 tires.');
  });
  it('测试引擎2 轮胎品牌1', function () {
    const car = new Car(engine2, tires1);
    car.drive().should.equal('DI car with 引擎发动机2 cylinders and 品牌1 tires.');
  });
  it('测试引擎2 轮胎品牌2', function () {
    const car = new Car(engine2, tires2);
    car.drive().should.equal('DI car with 引擎发动机2 cylinders and 品牌2 tires.');
  });
    
})
```
