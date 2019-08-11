<!--Decorator-Reflect-Metadata-InversifyJS-->

- InversifyJS 比 SOLID（面向对象设计)中的 D（依赖反转）好在哪里？
- 四种 Decorator
- Reflect Metadata
- InversifyJS

<!--more-->

# SOLID-D VS InversifyJS

## SOLID-D

- 高层模块不应该依赖于低层模块，他们都应该依赖于抽象接口
- 抽象接口应该脱离具体实现，具体实现应该依赖于抽象接口

```js
// 反例
class InventoryTracker {
  constructor(items) {
    this.items = items;

    // 依赖了一个具体实现
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

let inventoryTracker = new InventoryTracker(
  ['apples', 'bananas'],
);
inventoryTracker.requestItems();

// 正例
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ['WS'];
  }

  requestItem(item) {
    // ...
  }
}

// 依赖外置，通过参数注入依赖
// 我们可以轻松替换依赖项
let inventoryTracker = new InventoryTracker(
  ['apples', 'bananas'],
  new InventoryRequesterV2(),
);
inventoryTracker.requestItems();
```

## InversifyJS

InversifyJS 一个特性是可以利用 lazyInject 来实现无需把依赖放入 constructor 参数中，直接注入为类属性。

```js
@injectable()
export class Events {
  @lazy_inject(BINDING.Blink) protected Blink:DI.Blink;
  @lazy_inject(BINDING.touch_manager) protected touch_manager:DI.TouchManager;

  @lazy_inject(BINDING.WorkspaceSvg) protected WorkspaceSvg:DI.WorkspaceSvgClass;
}
```

下面将从 Decorator、Reflect-Metadata 解释 InversifyJS 的实现原理。

# TS 中的 Decorator

## 四种 Decorator

 Decorator 类型的定义：

 - ClassDecorator
 - MethodDecorator
 - PropertyDecorator
 - ParameterDecorator

### __decorate

当我们使用注解时，TypeScript 编译器就会产生一个 `__decorator` 函数。

```js
var __decorate = this.__decorate || function (decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    return Reflect.decorate(decorators, target, key, desc);
  }
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function (o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function (o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function (o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
```

### Class Decorator

#### 编译结果

```js
@logClass
class Person { 

  public name: string;
  public surname: string;

  constructor(name : string, surname : string) { 
    this.name = name;
    this.surname = surname;
  }
}

// 编译结果：
// 使用了__decorate 的返回值来覆盖原始构造函数
// 这就是类装饰器必须返回构造函数的原因
// 类装饰器接受一个参数 target
var Person = (function () {
  function Person(name, surname) {
    this.name = name;
    this.surname = surname;
  }
  Person = __decorate(
    [logClass],          // decorators
    Person,              // target
  );
  return Person;
})();
```

#### logClass 实现

```js
function logClass(target: any) {

  // 保存对原始构造函数的引用
  const original = target;

  // 生成类实例的工具函数
  function construct(constructor, args) {
    var c: any = function () {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }

  // 新的构造器行为
  var f: any = function (...args) {
    console.log("New: " + original.name);
    return construct(original, args);
  }

  // 复制原型，因此 instanceof 仍然有效
  f.prototype = original.prototype;

  // 返回新构造函数(将覆盖原始构造函数)
  return f;
}
```

### Property Decorator

#### 编译结果

```js
class Person {
  @logProperty
  public name: string;
  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
}

// 编译结果：
// 属性装饰器只需要 2 个参数（原型和键）
// 属性装饰器没有返回值
var Person = (function () {
  function Person(name, surname) {
    this.name = name;
    this.surname = surname;
  }
  __decorate(
    [logProperty],     // decorators
    Person.prototype,  // target
    'name',            // key
  );
  return Person;
})();

```

#### logProperty 实现

```js
// 
function logProperty(target: any, key: string) {
  // 属性值
  var _val = this[key];

  // 属性 getter
  var getter = function () {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };

  // 属性 setter
  var setter = function (newVal) {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };

  // 从类原型中删除原始属性
  // 如果属性被成功删除
  // Object.defineProperty() 方法用于使用原始属性的名称创建一个新的属性
  if (delete this[key]) {

    // 使用 getter 和 setter 创建新属性
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}
```

### Method Decorator

#### 编译结果

```js
class C {
  @logMethod
  foo(n:number) {
    return n * 2;
  }
}

// 编译结果：
// 方法装饰器需要 3 个参数（原型，键和属性描述符）
var C = (function () {
  function C() {
  }
  C.prototype.foo = function (n) {
    return n * 2;
  };
  Object.defineProperty(
    __decorate(
      [log],                                              // decorators
      C.prototype,                                        // target
      "foo",                                              // key
      Object.getOwnPropertyDescriptor(C.prototype, "foo") // desc
    );
  return C;
})();
```

#### logMethod 实现

```js
/**
 * 
 * @param target 被注解的方法
 * @param key 被注解方法的名字
 * @param value
 * 属性的描述，如果这个属性不存在于对象上则为 undefined
 * 可以通过 Object.getOwnPropertyDescriptor() 函数获得
 */
function logMethod(target: Function, key: string, value: any) {
  // target === C.prototype
  // key === "foo"
  // value === Object.getOwnPropertyDescriptor(C.prototype, "foo")
  return {
    value(...args: any[]) {
      // 将 foo 参数列表转换为字符串
      const a = args.map(a => JSON.stringify(a)).join();
      // 调用 foo() 并获取其返回值
      const result = value.value.apply(this, args);
      // 将结果转换为字符串
      const r = JSON.stringify(result);
      // 在控制台中显示函数调用详细信息
      console.log(`Call: ${key}(${a}) => ${r}`);
      // 返回调用 foo 的结果
      return result;
    }
  };
}
```

foo 注解之后也是正常执行，只是还会额外运行 log 的功能，这些功能是由 log 注解添加的。

```js
const c = new C();
const r = c.foo(23); //  "Call: foo(23) => 46"
console.log(r);    // 46
```

### Parameter Decorator

#### 编译结果

```js
class Person {

  public name: string;
  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  public saySomething(@logParameter something: string): string {
    return this.name + " " + this.surname + " says: " + something;
  }
}

// 编译后代码
Object.defineProperty(
  Person.prototype,
  "saySomething",
  __decorate(
    // 当 __decorate 调用 __param 时 ，它的返回将不会用于覆盖该 saySomething 方法
    // 参数装饰器不返回
    [__param(0, logParameter)], 
    Person.prototype, // 正在装饰的类的原型
    "saySomething", // 包含要装饰的参数的方法的名称
    Object.getOwnPropertyDescriptor(Person.prototype, "saySomething") // 要装饰的参数的索引
  ),
);
return Person;
```

#### __param.js 实现

```js
// __param 函数由 TypeScript 编译器生成
// 装饰器包装器 __param 用于在闭包中存储参数的索引
// 索引只是参数列表中的位置
var __param = this.__param || function (index, decorator) {

  // 返回装饰器函数(包装器)
  return function (target, key) {

    //应用装饰器(忽略返回)
    decorator(target, key, index);
  }
};
```

#### logParameter 实现

```js
function logParameter(target: any, key: string, index: number) {
  var metadataKey = `log_${key}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  }
  else {
    target[metadataKey] = [index];
  }
}
```

上面的参数装饰器 metadataKey 向类原型添加了一个新的属性(`metadataKey`)。新属性是一个数组，包含要装饰的参数的索引。我们可以将这个新属性视为元数据。

参数装饰器不应该修改构造函数，方法或属性的行为。**参数装饰器只应用于生成某种元数据**。

## 装饰工厂

装饰器工厂是一个可以接受任意数量参数的函数，并且必须返回一种类型的装饰器。

### 四种装饰器

```js
@logClass
class Person {

  @logProperty
  public name: string;

  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  @logMethod
  public saySomething(@logParameter something: string): string {
    return this.name + " " + this.surname + " says: " + something;
  }
}
```

上面一段代码应用了所有可用的装饰器（类、方法、属性和参数），如果我们可以在任何地方使用装饰器而不用管类型更好。

```js
@log
class Person {

  @log
  public name: string;

  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  @log
  public saySomething(@log something: string): string {
    return this.name + " " + this.surname + " says: " + something;
  }
}
```

### 装饰器工厂函数

```js
function log(...args: any[]) {
  switch (args.length) {
    case 1:
      return logClass.apply(this, args);
    case 2:
      return logProperty.apply(this, args);
    case 3:
      if (typeof args[2] === "number") {
        return logParameter.apply(this, args);
      }
      return logMethod.apply(this, args);
    default:
      throw new Error("Decorators are not valid here!");
  }
}
```

### 可配置的装饰器

```js
@logClassWithArgs({ when : { name : "remo"} })
class Person { 
  public name: string;

  // ...
}
```

```js
function logClassWithArgs(filter: Object) {
  return (target: Object) => {
    // 在这里实现类装饰器
    // 类装饰师将有权访问装饰器参数(筛选器)
    // 因为它们存储在闭包中
  }
}
```

# Reflect-Metadata

## 反射

我们的 JS 应用程序越来越大，我们开始需要一些工具（IoC）和（运行时类型断言）这样的功能来管理这种日益增加的复杂性。

强大的反射 API 应该允许我们在运行时检查未知对象并找出有关它的所有内容。我们应该能够找到像这样的东西：

- 实例的名称
- 实例的类型
- 哪些接口由实例实现
- 实例属性的名称和类型。
- 实例的构造函数参数的名称和类型


在 JS 中，我们可以使用 `Object.getOwnPropertyDescriptor()` 或 `Object.keys()` 等函数来查找有关实例的一些信息，但我们需要反射来实现更强大的开发工具。

## 元数据

- 装饰器通过反射来获取类属性上面的批注
- 但是 JS 的装饰器更多的是对函数或者属性进行一些操作，比如修改他们的值，代理变量，自动绑定 this 等等功能
- 无法实现通过反射来获取究竟有哪些装饰器添加到这个类/方法上，这时候就需要 `Reflect Metadata`

## 概念

- Relfect Metadata，可以通过装饰器来给类添加一些自定义的信息
- 然后通过反射将这些信息提取出来
- 也可以通过反射来添加这些信息

```js
@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
```

- `Metadata Key {Any}`: 元数据的 Key，简写 k。对于一个对象来说，他可以有很多元数据，每一个元数据都对应有一个 Key
    - 可以对象上面设置一个叫做 `name` 的 Key 用来设置他的名字，用 `created time` 的 Key 来表示他创建的时间
    - 这个 Key 可以是任意类型, 内部本质就是一个 Map 对象
- `Metadata Value {Any}`: 简写 v。元数据的类型，任意类型都行
- `Target {Object}`: 简写 o。表示要在这个对象上面添加元数据
- `Property {String|Symbol}`: 简写 p。用于设置在那个属性上面添加元数据。不仅仅可以在对象上面添加元数据，甚至还可以在对象的属性上面添加元数据。当给一个对象定义元数据的时候，默认指定了 undefined 作为 Property

## 引入

安装库 `reflect-metadata`：

```js
import 'reflect-metadata';

// 定义对象或属性的元数据
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);

// 检查对象或属性的原型链上是否存在元数据键
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);

// 检查对象或属性是否存在自己的元数据键
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);

// 获取对象或属性原型链上元数据键的元数据值
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, target, propertyKey);

// 获取对象或属性的自己的元数据键的元数据值
let result = Reflect.getOwnMetadata(metadataKey, target);
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey);

// 获取对象或属性原型链上的所有元数据键
let result = Reflect.getMetadataKeys(target);
let result = Reflect.getMetadataKeys(target, propertyKey);

// 获取对象或属性的所有自己的元数据键
let result = Reflect.getOwnMetadataKeys(target);
let result = Reflect.getOwnMetadataKeys(target, propertyKey);

// 从对象或属性中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target);
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);

// 通过装饰器将元数据应用于构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // 通过装饰器将元数据应用于方法(属性)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}
```

在 tsconfig.json 配置：

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"],
    "types": ["reflect-metadata"],
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 用途

### 获取属性类型元数据

```js
function logType(target: any, key: string) {
  var t = Reflect.getMetadata("design:type", target, key);
  console.log(`${key} type: ${t.name}`);
}
```

```js
class Demo { 
  // 应用属性装饰器
  // 会打印出 attr1 type: String
  @logType 
  public attr1 : string;
}
```

### 获取参数类型元数据

```js
function logParamTypes(target: any, key: string) {
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  var s = types.map(a => a.name).join();
  console.log(`${key} param types: ${s}`);
}
```

```js
class Foo {}
interface IFoo {}

class Demo {
  // 应用参数装饰器
  // 打印出：doSomething param types: String, Number, Foo, Object, Object, Function
  @logParameters 
  doSomething(
    param1: string,
    param2: number,
    param3: Foo,
    param4: { test: string },
    param5: IFoo,
    param6: (a: number) => void
  ): number {
    return 1;
  }
}
```

### 获取返回类型元数据

我们还可以使用  `"design:returntype"` 元数据键获取有关方法返回类型的信息：

```js
Reflect.getMetadata("design:returntype", target, key);
```

### 基本类型序列化规则

- number 序列化为 Number
- string 序列化为 String
- boolean 序列化为 Boolean
- any 序列化为 Object
- void 序列化为 undefined
- Array 序列化为 Array
- Tuple序列化为 Array
- class 序列化为类构造函数
- Enum 序列化为 Number
- 如果至少有一个签名，则序列化为 Function
- 否则序列化为 Object（包括接口）

## 实现原理

所有的元数据都是存在于对象下面的 `[[Metadata]]` 属性下面，但是不是通过 `Symbol` 实现的：

```js
@Reflect.metadata('name', 'A')
class A {}

Object.getOwnPropertySymbols(A) // []
```

内部的数据结构：

```js
WeakMap<any, Map<any, Map<any, any>>>

// 调用的角度
// 先根据对象获取，然后在根据属性，最后根据元数据的 Key 获取最终要的数据
weakMap.get(o).get(p).get(k)
```

## 例子

### Controller 与 Get


```js
// app.js
@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world';
  }

  @Post('/b')
  somePostMethod() {}
}
```

```js
// Controller.js
const METHOD_METADATA = 'method'；
const PATH_METADATA = 'path'；

const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
  }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');
```

```js
// mapRoute.js
function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // 筛选出类的 methodName
  const methodsNames = Object
    .getOwnPropertyNames(prototype)
    .filter(item => !isConstructor(item) && isFunction(prototype[item]));
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn)；
    return {
      route,
      method,
      fn,
      methodName
    }
  })
};
```

```js
Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'

mapRoute(new SomeClass());

/**
 * [{
 *    route: '/a',
 *    method: 'GET',
 *    fn: someGetMethod() { ... },
 *    methodName: 'someGetMethod'
 *  },{
 *    route: '/b',
 *    method: 'POST',
 *    fn: somePostMethod() { ... },
 *    methodName: 'somePostMethod'
 * }]
 *
 */
```

# InversifyJS

## 体系结构概述

InversifyJS 在解析依赖关系之前执行：

- 注解（Annotation）
- 规划（Planning）
- 中间件（Middleware）（可选）
- 分解（Resolution）
- 激活（Activation）（可选）

### 注解

注释：一种将元数据添加到类声明以供依赖注入或编译指令使用的方法。

- 注释阶段读取装饰器生成的元数据，并将其转换为请求类和目标类的一系列实例
- 该请求类和目标类的实例将用于在规划阶段生成解决计划

### 规划

- 我们开始新的解析，这意味着容器将创建新的解析上下文。解析上下文包含对容器的引用和对 Plan 的引用
- Plan 由 Planner 类的实例生成。该 Plan 包含对上下文的引用和对(根)请求的引用。请求表示将被注入目标的依赖

```js
var obj = container.get<SomeType>("SomeType");

@injectable()
class FooBar implements FooBarInterface {
  public foo : FooInterface;
  public bar : BarInterface;
  public log() {
    console.log("foobar");
  }
  constructor(
    @inject("FooInterface") foo : FooInterface, 
    @inject("BarInterface") bar : BarInterface
  ) {
    this.foo = foo;
    this.bar = bar;
  }
}

var foobar = container.get<FooBarInterface>("FooBarInterface");
```

前面的代码片段将生成新的上下文和新的 Plan。该 Plan 将包含一个具有 null target 和两个子 requests 的RootRequest：

- 第一个子 request 表示对 fooInterface 的依赖，其目标是名为 Foo 的构造函数参数
- 第二个子 request 表示对 barInterface 的依赖，其目标是名为 Bar 的构造函数参数

### 中间件

如果配置了一些中间件，它将在分解阶段开始之前执行。中间件可以用来开发一些浏览器扩展，这将允许我们使用一些数据可视化工具来显示解决方案，比如 D3.js。这种工具将帮助开发人员在开发过程中发现问题。

### 分解阶段

该计划被传递给解析器类的实例。解析器将继续解析请求树中的每个依赖项，从叶开始，以根请求结束。解析过程可以同步或异步执行，这有助于提高性能。

### 激活

激活在依赖关系解决后进行。就在它被添加到缓存(如果是单例)并被注入之前。可以添加一个事件处理程序，在激活完成之前调用它。这个特性允许开发人员做一些事情，比如注入代理来拦截对该对象的属性或方法的所有调用。

## 控制依赖项的范围

有许多可用的绑定：

```js
interface BindingToSyntax<T> {
  to(constructor: { new(...args: any[]): T; }): BindingInWhenOnSyntax<T>;
  toSelf(): BindingInWhenOnSyntax<T>;
  toConstantValue(value: T): BindingWhenOnSyntax<T>;
  toDynamicValue(func: (context: Context) => T): BindingWhenOnSyntax<T>;
  toConstructor<T2>(constructor: Newable<T2>): BindingWhenOnSyntax<T>;
  toFactory<T2>(factory: FactoryCreator<T2>): BindingWhenOnSyntax<T>;
  toFunction(func: T): BindingWhenOnSyntax<T>;
  toAutoFactory<T2>(serviceIdentifier: ServiceIdentifier<T2>): BindingWhenOnSyntax<T>;
  toProvider<T2>(provider: ProviderCreator<T2>): BindingWhenOnSyntax<T>;
}
```

就作用域的行为方式而言，我们可以将这些类型的绑定分为两个主要组：

- 将注入 `object`
- 讲注入 `function`

### object

```js
interface BindingToSyntax<T> {
  to(constructor: { new(...args: any[]): T; }): BindingInWhenOnSyntax<T>;
  toSelf(): BindingInWhenOnSyntax<T>;
  toConstantValue(value: T): BindingWhenOnSyntax<T>;
  toDynamicValue(func: (context: Context) => T): BindingInWhenOnSyntax<T>;
}
```

默认情况下使用 `inTransientScope`，我们可以选择这种类型绑定的范围，但 `toConstantValue` 除外，它将始终使用 `inSingletonScope`。

当我们第一次调用 `container.get` 时，我们使用 `to`、`toSelf` 或 `toDynamicValue`，InversifyJS 容器将尝试使用构造函数或动态值工厂生成对象实例或值。如果范围设置为 InSingleTonScope，则缓存该值。第二次我们调用container.get 来获取相同的资源 ID，如果选择了 inSingletonScope，InversifyJS 将尝试从缓存中获取值。

### function

```js
interface BindingToSyntax<T> {
  toConstructor<T2>(constructor: Newable<T2>): BindingWhenOnSyntax<T>;
  toFactory<T2>(factory: FactoryCreator<T2>): BindingWhenOnSyntax<T>;
  toFunction(func: T): BindingWhenOnSyntax<T>;
  toAutoFactory<T2>(serviceIdentifier: ServiceIdentifier<T2>): BindingWhenOnSyntax<T>;
  toProvider<T2>(provider: ProviderCreator<T2>): BindingWhenOnSyntax<T>;
}
```

我们不能选择这种绑定的范围，因为要注入的值(工厂函数)总是单例的。然而，工厂内部实现可能返回也可能不返回单例。以下绑定将注入一个工厂，该工厂将始终是单例。

```js
container.bind<interfaces.Factory<Katana>>("Factory<Katana>").toAutoFactory<Katana>("Katana");
```

工厂返回的值可能是单一值，也可能不是单一值：

```js
container.bind<Katana>("Katana").to(Katana).inTransientScope();
// or
container.bind<Katana>("Katana").to(Katana).inSingletonScope();
```

## 容器快照

声明容器快照是一项帮助您轻松编写单元测试的功能：

```js
import { expect } from "chai";
import * as sinon from "sinon";

// application container is shared by all unit tests
import container from "../../src/ioc/container";

describe("Ninja", () => {

  beforeEach(() => {

    // create a snapshot so each unit test can modify 
    // it without breaking other unit tests
    container.snapshot();

  });

  afterEach(() => {

    // Restore to last snapshot so each unit test 
    // takes a clean copy of the application container
    container.restore();

  });

  // each test is executed with a snapshot of the container

  it("Ninja can fight", () => {

    let katanaMock = {
      hit: () => { return "hit with mock"; }
    };

    container.unbind("Katana");
    container.bind<Something>("Katana").toConstantValue(katanaMock);
    let ninja = container.get<Ninja>("Ninja");
    expect(ninja.fight()).eql("hit with mock");

  });

  it("Ninja can sneak", () => {

    let shurikenMock = {
      throw: () => { return "hit with mock"; }
    };

    container.unbind("Shuriken");
    container.bind<Something>("Shuriken").toConstantValue(shurikenMock);
    let ninja = container.get<Ninja>("Shuriken");
    expect(ninja.sneak()).eql("hit with mock");

  });

});
```

## 容器的 API

https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md

### Container Options

#### defaultScope

默认范围是 `transient`，可以在声明绑定时更改类型的范围：

```js
container.bind<Warrior>(TYPES.Warrior).to(Ninja).inTransientScope();
container.bind<Warrior>(TYPES.Warrior).to(Ninja).inSingletonScope();
```

使用容器选项更改应用程序级别使用的默认范围：

```js
let container = new Container({ defaultScope: "Singleton" });
```

#### autoBindInjectable

你可以用这个激活 `@injectable()` 装饰类的自动绑定:

```js
let container = new Container({ autoBindInjectable: true });
container.isBound(Ninja);          // returns false
container.get(Ninja);              // returns a Ninja
container.isBound(Ninja);          // returns true
```

手动定义的绑定优先:

```js
let container = new Container({ autoBindInjectable: true });
container.bind(Ninja).to(Samurai);
container.get(Ninja);              // returns a Samurai
```

### Container.merge

将两个容器合并为一个。

### container.getNamed

命名绑定。

### container.getTagged

标记绑定。

### container.getAll

获取给定标识符的所有可用绑定。

### container.rebind

可以使用 `rebind` 方法替换给定 `serviceIdentifier` 的所有现有绑定。该函数返回 `BindingTexture` 的实例，该实例允许创建替换绑定。

```js
let TYPES = {
  someType: "someType"
};

let container = new Container();
container.bind<number>(TYPES.someType).toConstantValue(1);
container.bind<number>(TYPES.someType).toConstantValue(2);

let values1 = container.getAll(TYPES.someType);
expect(values1[0]).to.eq(1);
expect(values1[1]).to.eq(2);

container.rebind<number>(TYPES.someType).toConstantValue(3);
let values2 = container.getAll(TYPES.someType);
expect(values2[0]).to.eq(3);
expect(values2[1]).to.eq(undefined);
```

### container.resolve

Resolve 就像 `container.get<T>(serviceIdentifier: ServiceIdentifier<T>)`，但是它允许用户创建一个实例，即使没有声明绑定。

请注意，它只允许跳过声明依赖关系图中根元素的绑定(组合根)。所有的子依赖项都需要声明绑定。

## 类 lazyInject

https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md

```js
import "reflect-metadata";
import { Container, injectable, inject } from "inversify";
import getDecorators from "inversify-inject-decorators";

const container = new Container();
const { lazyInject } = getDecorators(container);

const TYPE = {
  Dom: Symbol.for("Dom"),
  DomUi: Symbol.for("DomUi")
};

@injectable()
class DomUi {
  public dom: Dom;
  public name: string;
  constructor(
    @inject(TYPE.Dom) dom: Dom
  ) {
    this.dom = dom;
    this.name = "DomUi";
  }
}

@injectable()
class Dom {
  public name: string;
  @lazyInject(TYPE.DomUi) public domUi: DomUi;
  public constructor() {
    this.name = "Dom";
  }
}

@injectable()
class Test {
  public dom: Dom;
  constructor(
    @inject(TYPE.Dom) dom: Dom
  ) {
    this.dom = dom;
  }
}

container.bind<Dom>(TYPE.Dom).to(Dom).inSingletonScope();
container.bind<DomUi>(TYPE.DomUi).to(DomUi).inSingletonScope();

const test = container.resolve(Test); // Works!
```

## 生态系统

工具：

- inversify-binding-decorators - 允许开发人员使用装饰器声明延迟求值属性注入。
- inversify-inject-decorators - 允许开发人员使用装饰器声明InversifyJS绑定。
- inversify-express-utils - 用 Express 开发快速应用程序的一些实用程序。
- inversify-restify-utils - 使用 Restify 开发快速应用程序的一些实用程序。
- inversify-vanillajs-helpers - 使用 VanillaJS 或 Babel 开发 InversifyJS 应用程序的一些帮助程序。
- inversify-tracer - 允许开发人员跟踪 InversifyJS 创建的对象方法的工具。
- inversify-components - InversifyJS 之上的层，使您可以将应用程序拆分为多个组件。
- inversify-token - InversifyJS 的基于令牌的层，为 TypeScript 中的注入启用强类型安全保证。

中间件：

- nversify-logger-middleware - InversifyJS的控制台记录器中间件。

开发工具

- inversify-devtools - 支持浏览器扩展的 Web 应用程序。
- inversify-chrome-devtools - 一个 chrome 扩展，旨在帮助开发人员使用 InversifyJS。


文章参考：

- [阮一峰 ES6 入门 - Decorator](http://es6.ruanyifeng.com/#docs/decorator)

- [方法装饰器](https://zhuanlan.zhihu.com/p/20297283)

- [属性装饰器和类装饰器](https://zhuanlan.zhihu.com/p/42207655)

- [参数装饰器和装饰器工厂](https://zhuanlan.zhihu.com/p/42217208)

- [类型序列化和元数据反射API](https://zhuanlan.zhihu.com/p/42220487)

- [JavaScript Reflect Metadata 详解](https://www.jianshu.com/p/653bce04db0b)

- [InversifyJS-wiki](https://github.com/inversify/InversifyJS/tree/master/wiki)
