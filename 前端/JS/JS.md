# 基础

## 面向对象

### 对象两类属性

#### 数据属性

- value：就是属性的值，可以为函数
- writable：决定属性能否被赋值
- enumerable：决定 for in 能否枚举该属性
- configurable：决定该属性能否被删除或者改变特征值

#### 访问器属性

- getter：函数或 undefined，在取属性值时被调用
- setter：函数或 undefined，在设置属性值时被调用
- enumerable：决定 for in 能否枚举该属性
- configurable：决定该属性能否被删除或者改变特征值

### 访问操纵原型

- Object.create 根据指定的原型创建新对象，原型可以是 null，可以接收第二个参数
- Object.getPrototypeOf 获得对象的原型
- Object.setPrototypeOf 设置对象的原型

### 原型实现抽象复用

```js
const cat = {
  say() {
    console.log("meow~");
  },
  jump() {
    console.log("jump");
  }
}

const tiger = Object.create(cat, {
  say: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: function () {
      console.log("roar!");
    }
  }
})

const anotherCat = Object.create(cat);
anotherCat.say(); // meow~

const anotherTiger = Object.create(tiger);
anotherTiger.say(); // roar!
```

### 原型继承

#### 默认模式

- 原型属性应该指向一个对象，而不是一个函数，所以它必须指向一个由父构造函数所创建的一个实例
- 缺点：
    - 同时继承了两个对象的属性，在绝大数时候不需要这些属性
    - 不支持参数传递到子构造函数中，而自构造函数又将参数传递到父构造函数中

```js
Child.prototype = new Parent()
```

#### 借用构造函数

- 缺点：只能继承在父构造函数中添加到 this 的属性，并不能继承那些已经添加到原型中的成员

```js
function Child(a, b, c, d) {
  Parent.apply(this, arguments)
}
```

#### 借用和设置原型

优点：能够获得父对象本身的成员副本以及指向父对象中可复用功能的引用，子对象也可以将任意参数传递到父构造函数中
缺点：父构造函数被调用两次，自身的属性会被继承两次

```js
function Child(a, b, c, d) {
  Parent.apply(this, arguments)
}

Child.prototype = new Parent()
```

#### 共享原型

优点：子对象没有继承父对象的构造属性
缺点：子对象或者子孙对象修改了原型，会影响父对象和祖先对象

```js
Child.prototype = Parent.prototype
```

#### 圣杯模式

```js
const inherit = (function () {
  const F = function () { };
  return function (Child, Parent) {
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
  };
}());
```

### prototype 的理解

- 每个函数的 prototype 属性都指向了一个对象，它只有在该函数是构造器时才发挥作用
- 实例通过 `__proto__` 指向构造函数的 prototype，通过 constructor 指向构造函数

### new 的过程

```js
// 直观上理解
let Foo = function(name) {
  let this = Object.create(Foo.prototype)
  this.name = name
  return this
}
Foo()

// 代码底层上理解
let objectFactory() {
  let obj = {}, // 从 Object.prototype 上克隆一个空的对象
    Constructor = [].shift.call(arguments) // 取得外部传入的构造器
  obj.__proto__ = Constructor.prototype // 指向正确的原型
  let ret = Constructor.apply(obj, arguments) // 借用外部传入的构造器给 obj 设置属性
  return typeof ret === 'object' ? ret : obj // 确保构造器总是会返回一个对象
}
let a = objectFactory(Person, 'seven')
console.log(Object.getPrototypeOf(a) === Person.prototype) // true
```

## JS 对象

- 宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定
- 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象
    - 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例
    - 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象
    - 普通对象（Ordinary Objects）：由 {} 语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承

### 判断对象相等

```js
// https://github.com/lukeed/dequal

export default function dequal(foo, bar) {
  var ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array && (len = foo.length) === bar.length) {
      while (len-- && dequal(foo[len], bar[len]));
      return len === -1;
    }
    if (ctor === Object) {
      if (Object.keys(foo).length !== Object.keys(bar).length) return false;
      for (len in foo) if (!(len in bar) || !dequal(foo[len], bar[len])) return false;
      return true;
    }
  }
  return foo !== foo && bar !== bar;
}
```

### 判断数组

```js
// Object.prototype.toString.call()
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"

// instanceof
console.log([] instanceof Array); // true

// Array.isArray()
Array.isArray([]) // true
```

### 宿主对象

- 全局对象是 window，window 上又有很多属性，如 document，这个全局对象 window 上的属性，一部分来自 JavaScript 语言，一部分来自浏览器环境
- 宿主对象也分为固有的和用户可创建的两种，比如 document.createElement 就可以创建一些 dom 对象
- 宿主也会提供一些构造器，比如我们可以使用 new Image 来创建 img 元素

#### window

```js
window.close();  //关闭窗口
window.alert("message");  //弹出一个具有OK按钮的系统消息框，显示指定的文本
window.confirm("Are you sure?");  //弹出一个具有OK和Cancel按钮的询问对话框，返回一个布尔值
window.prompt("What's your name?", "Default");  //提示用户输入信息，接受两个参数，即要显示给用户的文本和文本框中的默认值，将文本框中的值作为函数值返回
window.status  //可以使状态栏的文本暂时改变
window.defaultStatus  //默认的状态栏信息，可在用户离开当前页面前一直改变文本
window.setTimeout("alert('xxx')", 1000);  //设置在指定的毫秒数后执行指定的代码，接受2个参数，要执行的代码和等待的毫秒数
window.clearTimeout("ID");  //取消还未执行的暂停，将暂停ID传递给它
window.setInterval(function(){}, 1000);  //无限次地每隔指定的时间段重复一次指定的代码，参数同setTimeout()一样
window.clearInterval("ID");  //取消时间间隔，将间隔ID传递给它
```

#### history

```js
history.go(-1);  //访问浏览器窗口的历史，负数为后退，正数为前进
history.back();  //同上
history.forward();  //同上
history.length  //可以查看历史中的页面数
history.pushState // 修改历史记录
```

- `history.pushState()` 和 `history.replaceState()` 方法，它们分别可以添加和修改历史记录条目。通常与 `window.onpopstate` 配合使用
- 每当活动的历史记录项发生变化时， popstate 事件都会被传递给 window 对象。如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝

```js
// 监听 url 改变
window.onpopstate = () => {
  const query = parseQueryString()
  // ...
}

// 触发 url 变化
// 为 history 添加记录
history.pushState(null, null, url)
// 不为 url 添加记录
history.replaceState(null, null, url)
```

#### document

```js
// document对象：实际上是window对象的属性，document == window.document为true，是唯一一个既属于BOM又属于DOM的对象
document.lastModified  //获取最后一次修改页面的日期的字符串表示
document.referrer  //用于跟踪用户从哪里链接过来的
document.title  //获取当前页面的标题，可读写
document.URL  //获取当前页面的URL，可读写
document.anchors[0]或document.anchors["anchName"] //访问页面中所有的锚
document.forms[0]或document.forms["formName"]  //访问页面中所有的表单
document.images[0]或document.images["imgName"]  // 访问页面中所有的图像
document.links [0]或document.links["linkName"]  //访问页面中所有的链接
document.applets [0]或document.applets["appletName"]  //访问页面中所有的Applet
document.embeds [0]或document.embeds["embedName"]  //访问页面中所有的嵌入式对象
document.write(); 或document.writeln();  //将字符串插入到调用它们的位置
```

#### location

```js
// location对象：表示载入窗口的URL，也可用window.location引用它
location.href  //当前载入页面的完整URL，如http://www.somewhere.com/pictures/index.htm
location.portocol  //URL中使用的协议，即双斜杠之前的部分，如http
location.host  //服务器的名字，如www.wrox.com
location.hostname  //通常等于host，有时会省略前面的www
location.port  //URL声明的请求的端口，默认情况下，大多数URL没有端口信息，如8080
location.pathname  //URL中主机名后的部分，如/pictures/index.htm
location.search  //执行GET请求的URL中的问号后的部分，又称查询字符串，如?param=xxxx
location.hash  //如果URL包含#，返回该符号之后的内容，如#anchor1
location.assign("http:www.baidu.com");  //同location.href，新地址都会被加到浏览器的历史栈中
location.replace("http:www.baidu.com");  //同assign()，但新地址不会被加到浏览器的历史栈中，不能通过back和forward访问
location.reload(true | false);  //重新载入当前页面，为false时从浏览器缓存中重载，为true时从服务器端重载，默认为false
```

#### navigator

```js
// `navigator`对象：包含大量有关Web浏览器的信息，在检测浏览器及操作系统上非常有用，也可用window.navigator引用它
// `navigator.appCodeName`  //浏览器代码名的字符串表示
navigator.appName  //官方浏览器名的字符串表示
navigator.appVersion  //浏览器版本信息的字符串表示
navigator.cookieEnabled  //如果启用cookie返回true，否则返回false
navigator.javaEnabled  //如果启用java返回true，否则返回false
navigator.platform  //浏览器所在计算机平台的字符串表示
navigator.plugins  //安装在浏览器中的插件数组
navigator.taintEnabled  //如果启用了数据污点返回true，否则返回false
navigator.userAgent  //用户代理头的字符串表示
```

#### screen

```js
// screen对象：用于获取某些关于用户屏幕的信息，也可用window.screen引用它
screen.width/window.height  //屏幕的宽度与高度，以像素计
screen.availWidth/screen.availHeight  //窗口可以使用的屏幕的宽度和高度，以像素计
screen.colorDepth  //用户表示颜色的位数，大多数系统采用32位
window.moveTo(0, 0);
window.resizeTo(screen.availWidth, screen.availHeight);  //填充用户的屏幕
```



### 内置-固有对象

[ECMA 标准](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-well-known-intrinsic-objects)为我们提供了一份固有对象表，里面含有 150+ 个固有对象。

三个值

- Infinity
- NaN
- undefined

九个函数

- eval
- isFinite
- isNaN
- parseFloat
- parseInt
- decodeURI
- decodeURIComponent
- encodeURI
- encodeURIComponent

四个命名空间对象

- Atomics
- JSON
- Math
- Reflect

一堆构造器

Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeapSet、Function、Boolean、String、Number、Symbol、Object、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ArrayBuffer、SharedArrayBuffer、DataView、Typed Array、Float32Array、Float64Array、Int8Array、Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array、UInt8ClampedArray

#### Number.isNaN 与 isNaN

```js
isNaN === Number.isNaN // false
isNaN('a') // true
Number.isNaN('a') // false
```

### 内置-原生对象

- 基本类型
    - Boolean、String、Number、Symbol、Object
- 基础功能和数据类型
    - Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeapSet、Function
- 错误类型
    - Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError
- 二进制操作
    - ArrayBuffer、SharedArrayBuffer、DataView
- 带类型的数组
    - Float32Array、Float64Array、Int8Array、Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array、Uint8ClampedArray

几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承。

#### Error

##### RangeError

当数字类型变量或者参数超出其有效范围时

```js
// 使用过多参数调用 console
console.log.apply(console, new Array(1000000000)); // RangeError: 数组长度无效
```

##### ReferenceError

引用无效

```js
'use strict';
console.log(notValidVar); // ReferenceError: notValidVar 未定义
```

##### SyntaxError

解析无效 JavaScript 代码

```js
1 *** 3   // SyntaxError: 无效的标记 *
```

##### TypeError

变量或者参数不是有效类型

```js
'1.2'.toPrecision(1); // TypeError: '1.2'.toPrecision 不是函数
```

##### URIError

传入无效参数至 encodeURI() 和 decodeURI()

```js
decodeURI('%'); // URIError: URL 异常
```

#### String

##### charCodeAt & fromCharCode

```js
'A'.charCodeAt(); // 65
String.fromCharCode(65); // 'A'
```

#### Date

```js
// http://www.w3school.com.cn/jsref/jsref_obj_date.asp
let date = new Date() // 获取一个时间对象
let UTCTime = Date.parse(new Date()) / 1000 // UTC时间
date.getFullYear() // 年份(4位,1970)
date.getMonth() // 月份(0-11,0代表1月,用的时候记得加上1)
date.getDate() // 日(1-31)
date.getTime() // 时间戳(从1970.1.1开始的毫秒数)
date.getHours() // 获取小时数(0-23)
date.getMinutes() // 分钟数(0-59)
date.getSeconds() // 秒数(0-59)
date.getDay() // 星期几(0-6,0代表星期天)
let monthBegDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  1,
) // 这个月第一天0点时刻
let monthEndDate = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0,
) // 这个月最后一天0点时刻
let monthEndTime = Date.parse(monthEndDate) / 1000 + 86399 // 这个月最后一秒的时间戳
}
```

#### Set

##### 属性与方法

```js
const s = new Set();
s.add(1).add(2).add(2); // 添加元素

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

s.clear();
console.log(s);  // Set(0) {}
```

##### 实例的遍历

```js
let set = new Set(['aaa', 'bbb', 'ccc']);

for (let item of set.keys()) {
  console.log(item);
}
// aaa
// bbb
// ccc

for (let item of set.values()) {
  console.log(item);
}
// aaa
// bbb
// ccc

for (let item of set.entries()) {
  console.log(item);
}
// ["aaa", "aaa"]
// ["bbb", "bbb"]
// ["ccc", "ccc"]

set.forEach((value, key) => console.log(key + ' : ' + value))
// aaa : aaa
// bbb : bbb
// ccc : ccc
```

##### 转成数组的方法

```js
// Array.from
let array = Array.from(mySet);

// spreading
let array = [...mySet];

// forEach
let array = [];
mySet.forEach(v => array.push(v));
```

#### Map

##### 属性与方法

```js
const map = new Map();
map.set('aaa', 100);
map.set('bbb', 200);

map.size // 2

map.get('aaa') // 100

map.has('aaa') // true

map.delete('aaa')
map.has('aaa') // false

map.clear()
```

##### 实例的遍历

```js
const map = new Map();
map.set('aaa', 100);
map.set('bbb', 200);

for (let key of map.keys()) {
  console.log(key);
}
// "aaa"
// "bbb"

for (let value of map.values()) {
  console.log(value);
}
// 100
// 200

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// aaa 100
// bbb 200

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// aaa 100
// bbb 200
```

##### 与 WeakMap 的区别

- WeakMap 的 key 只能是 Object 类型（null 除外），原始数据类型是不能作为 key 的（比如 `Symbol`），键名所指向的对象，不计入垃圾回收机制
- WeakMap 最大的好处是可以避免内存泄漏，一个仅被 WeakMap 作为 key 而引用的对象，会被垃圾回收器回收掉
    - 当一个对象被引用的时候，往往意味着它正在被使用，或者在将来有可能会被使用。此时对象不会被垃圾回收机制回收掉
    - 使用场景是对象有可能被手动回收的场景
- WeakMap 没有任何与迭代有关的属性和方法

#### XMLHttpRequest

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.dir(xhr.responseText);
    }
  }
}
xhr.open("GET", "/api", false);
xhr.send(null);
```

### 内置-普通对象

- 函数：具有 `[[call]]` 私有字段的对象，任何对象只需要实现 `[[call]]`，它就是一个函数对象
- 构造器对象：具有 `[[construct]]` 的对象，实现 `[[construct]]`，它就是一个构造器对象，可以作为构造器被调用

## 函数

### arguments

```js
// 转成数组
function foo() {
  const args = [...arguments];
  const args2 = Array.from(arguments);
}

// 使用剩余参数取代 arguments
function foo(...args) {
  console.log(args);
}
```

### bind 的入参

```js
yield call(load_sounds_from_state.bind(this, persisted.audio));
```

### 纯函数

- 只有逻辑运算与数学运算
- 同一个输入总是得到同一个输出

#### 优点

- 可缓存、可测试、可并行（web worker）
- 惰性计算

#### 纯函数缓存特性

```js
let memoize = function(f) {
  let cache = {};
  return function() {
    let arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};
```

#### 副作用列表

- 更改文件系统
- 往数据库插入记录
- 发送一个 http 请求
- 可变数据
- 打印/log
- 获取用户输入
- DOM 查询
- 访问系统状态

#### 避免副作用

延迟执行副作用方法

```js
// 非纯函数
let signUp = function(attrs) {
  let user = saveUser(attrs);
  welcomeUser(user);
};

// 纯函数
let signUp = function(Db, Email, attrs) {
  return function() {
    let user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  }
}
```

### generator 迭代器函数

生成器对象是由一个 generator function 返回的。

```js
function* idMaker(){
    let index = 0;
    while(true)
        yield index++;
}

let gen = idMaker(); // "Generator { }"

console.log(gen.next().value); 
// 0
console.log(gen.next().value); 
// 1
console.log(gen.next().value); 
// 2
```

### async-await 函数

#### then 调用

```js
const fetch = require('node-fetch');

async function getZhihuColumn(id) {
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  return await response.json();
}

getZhihuColumn('feweekly')
  .then(column => {
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
  });
```

#### 立即 await

```js
const fetch = require('node-fetch');

const getZhihuColumn = async (id) => {
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  return await response.json();
};

(async () => {
  const column = await getZhihuColumn('feweekly');
  console.log(`NAME: ${column.name}`);
  console.log(`INTRO: ${column.intro}`);
})();
```

#### 错误处理

```js
const fetch = require('node-fetch');

async function getZhihuColumn(id) {
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

const showColumnInfo = async (id) => {
  try {
    const column = await getZhihuColumn(id);
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
  } catch (err) {
    console.error(err);
  }
};

showColumnInfo('feweekly123');
```

#### 多个 await 并行

```js
const fetch = require('node-fetch');

async function getZhihuColumn(id) {
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  return await response.json();
}

const showColumnInfo = async () => {
  const [feweekly, toolingtips] = await Promise.all([
    getZhihuColumn('feweekly'),
    getZhihuColumn('toolingtips'),
  ]);

  console.log(`NAME: ${feweekly.name}`);
  console.log(`INTRO: ${feweekly.intro}`);

  console.log(`NAME: ${toolingtips.name}`);
  console.log(`INTRO: ${toolingtips.intro}`);
};

showColumnInfo();
```

#### for 循环使用 await

```js
const fetch = require('node-fetch');
const bluebird = require('bluebird');

async function getZhihuColumn(id) {
  await bluebird.delay(1000);
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  return await response.json();
}

const showColumnInfo = async () => {
  console.time('showColumnInfo');

  const names = ['feweekly', 'toolingtips'];
  const promises = names.map(x => getZhihuColumn(x));
  for (const promise of promises) {
    const column = await promise;
    console.log(`Name: ${column.name}`);
    console.log(`Intro: ${column.intro}`);
  }

  console.timeEnd('showColumnInfo');
};
```

## DOM

### 元素查找

#### querySelector

```js
// 查找所有 id 以 d 开头的元素
document.querySelectorAll('[id^=d]');

node.querySelector('[name="x"]');
```

#### 上下查找

- Node.parentNode
- Node.firstChild
- Node.lastChild
- Node.childNodes

#### 左右查找

- Node.previousSibling
- Node.nextSibling

### 增删改查

```js
// DOM 元素的添加、删除、替换、插入到某个节点
$ele.appendChild()
$ele.removeChild()
$ele.replaceChild()
$ele.insertBefore()

// 创建新节点
document.createDocumentFragment() // 创建一个 DOM 片段
document.createElement() // 创建一个具体的元素
ducoment.createTextNode() // 创建一个文本节点
```

### offset、clent、scrollWidth

![01.jpg](https://qiniu.chenng.cn/2019-02-07-21-24-01.jpg)

### property 和 attribute

- property
  - DOM 节点就是一个 JS 对象，`p` 可以有 `style` 属性，有 `className`、`nodeName`、`nodeType` 属性
  - 这些都是 JS 范畴的属性，符合 JS 语法标准的
- attribute
  - `attribute` 是直接改变 HTML 的属性
  - attribute 就是对 HTML 属性的 get 和 set，和 DOM 节点的 JS 范畴的 property 没有关系
  - get 和 set attribute 时，还会触发 DOM 的查询或者重绘、重排，频繁操作会影响页面性能

### tagName 与 nodeName

- `nodeName` 是 `node` 接口上的属性
- `tagName` 是 `element` 接口上的属性
- 所有的节点（元素节点，属性节点，文本节点等 12 种）都继承了 `node` 接口，而只有元素节点才继承了 `element` 节点，因此 `nodeName` 比 `tagName` 具有更大的使用范围

### createDocumentFragment

```js
let p, t, frag

frag = document.createDocumentFragment()

p = document.createElement('p')
t = document.createTextNode('first paragraph')
p.appendChild(t)
grag.appendChild(p)

p = document.createElement('p')
t = document.createTextNode('second paragraph')
p.appendChild(t)
frag.appendChild(p)

document.body.appendChild(frag)
```

### cloneNode

```js
let oldNode = document.getElementById('result'),
  clone = oldNode.cloneNode(true)

// 处理克隆对象...

oldNode.parentNode.repalceChild(clone, oldNode)
```

### DOM 序列化与反序列化

#### XMLSerializer 序列化

```js
const xmlSerializer = new XMLSerializer();
const documentStr = xmlSerializer.serializeToString(document);
```

#### DOMParse 反序列化

```js
const parse = new DOMParser();
const documentDom = parse.parseFromString(documentStr, 'text/html');
```

##### MIME 类型：

- `text/xml`: 返回一个 `XMLDocument`
- `image/svg+xml`: 返回一个 `SVGDocument`
- `text/html`: 返回一个 `HTMLDocument`

##### 获取 DOM 节点

```js
const xml_dom = parser
  .parseFromString(`<xml style="display: none" />`, 'text/xml')
  .firstElementChild;
```

# 事件

## 跨域通信

### document.domain + iframe

```html
<!-- A页面 http://a.qq.com/a.html -->
<iframe id="iframe" src="http://b.qq.com/b.html"></iframe>
<script>
    document.domain = "qq.com";
    var windowB = document.getElementById("iframe").contentWindow;
    alert("B页面的user变量：" + windowB.user);
</script>
```

```html
<!-- B页面 http://b.qq.com/b.html -->
<script>
    document.domain = "qq.com";
    var user = "saramliu";
</script>
```

### postMessage

```html
<!-- A页面 http://a.qq.com/a.html -->
<iframe id="iframe" src="http://b.qq1.com/b.html"></iframe>
<script>
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {meesage: "这里是A页面发的消息"}; 
        var url = "http://b.qq1.com/b.html";
        // 向B页面发送消息
        iframe.contentWindow.postMessage(JSON.stringify(data), url);
    };
    window.addEventListener("message", function(e) {
        alert("B页面发来消息：" + JSON.parse(e.data));
    });
</script>
```

```html
<!-- B页面 http://b.qq1.com/b.html -->
<script>
    window.addEventListener("message", function(e) {
        alert("A页面发来消息：" + JSON.parse(e.data));
        var data = {meesage: "这里是B页面发的消息"}; 
        var url = "http://a.qq.com/a.html";
        window.parent.postMessage(JSON.stringify(data), url);
    }, false);
</script>
```

## 鼠标事件判断

```js
ele.addEventListener('mousedown', function(e) {
    // e.button === 0: the left button is clicked
    // e.button === 1: the middle button is clicked
    // e.button === 2: the right button is clicked
    // e.button === 3: the `Browser Back` button is clicked
    // e.button === 4: the `Browser Forward` button is clicked
});
```

## animationend

```js
el.addEventListener('animationend', () => {
  // 监听到动画结束做点事情
});
```

## deviceorientation

```js
/**
 * 操作手机旋转角度，获取alpha，beta，gamma的角度值并且操作
 */
function getOrientationEvent() {
  if (window.DeviceOrientationEvent) { // 判断是否支持重力感应事件
    //绑定重力感应事件
    window.addEventListener('deviceorientation', function (event) {
      //alpha角度，三d坐标系z轴旋转
      document.getElementById('alpha').innerHTML = Math.round(event.alpha)
      //beta角度，三D坐标系X轴旋转
      document.getElementById('beta').innerHTML = Math.round(event.beta)
      //gamma角度，三D坐标系Y轴旋转
      document.getElementById('gamma').innerHTML = Math.round(event.gamma)

      //PS：能操作的就这三个属性，或者重力感应的角度
    }, false)
  }
}
```

## touch 事件

### 操作小于 300 ms

- touchstart => touchmove(n) => touchend => click
- touchstart => touchend => click

### 操作大于 300ms

不会有 click 事件

### 点击穿透

- 300ms 用于在移动端判断是否是双击
- 移动端没有 tap 支持，`touchstart` 和 `touchend` 存在问题：手指接触目标元素按住不放，移出区域依然会触发事件

#### 出现原因

- touch 蒙层导致蒙层消失，消失后 touch 下面的元素 click 事件会触发
- 单页应用 touch 事件跳转后新页面元素的 click 事件触发

#### 解决方案

- 不要混用 touch 和 click，只用 touch
- 吃掉 touch 之后的 click：延时隐藏蒙层、pointer-events、flag 检测、fastclick

## DOM 事件模型

指的是冒泡和捕获

### 事件级别

- DOM0
    - 如果说给同一个元素绑定了两次或者多次相同类型的事件，那么后面的绑定会覆盖前面的绑定
    - 不支持 DOM 事件流：事件捕获阶段 => 目标元素阶段 => 事件冒泡阶段
    - `$el.onclick = function(){}`
- DOM2
  - 如果说给同一个元素绑定了两次或者多次相同类型的事件，所有的绑定将会依次触发
  - 支持 DOM 事件流的
  - 进行事件绑定传参不需要 on 前缀
  - `$el.addEventListener('click', function(){}, false)`
- DOM3
    - 增了很多鼠标事件、键盘事件
    - `$el.addEventListener('keyup', function() {}, false)`

### 同一元素的捕获与冒泡

在同一元素上面绑定了捕获事件和冒泡事件，哪个先绑定就哪个先触发。

### DOM 事件流

捕获阶段 => 目标阶段 => 冒泡阶段

### DOM 事件捕获的流程

window => document => html(document.documentElement) => body(document.body) => ... => 目标对象

### 不支持冒泡的事件

仅在自己身上发生的事件：blur、bocus、load、unload、自定义事件

### 事件的方法

```js
// 阻止默认行为
event.preventDefault()
// 阻止事件冒泡
event.stopPropagation()
// 阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上
// 这个方法不接受任何参数。
// 例如注册了A、B两个 click 事件，在 A 的方法中阻止后，不会执行 B 的方法
event.stopImmediatePropagation()
// 返回绑定事件的元素
event.currentTarget
// 返回触发事件的元素
event.target
```

### 自定义事件

```js
let myEvent = new Event('custome')
$el.addEventListener('custome', () => {
  console.log('custome')
})
$el.dispatchEvent(myEvent)
```

## target 与 currentTarget

```html
<div id="a">
    <div id="b">
      <div id="c">
        <div id="d"></div>
      </div>
    </div>
</div>

<script>
  document.getElementById('a').addEventListener('click', function(e) {
    console.log('target:' + e.target.id + ' & currentTarget:' + e.currentTarget.id)
  })
  document.getElementById('b').addEventListener('click', function(e) {
    console.log('target:' + e.target.id + ' & currentTarget:' + e.currentTarget.id)
  })
  document.getElementById('c').addEventListener('click', function(e) {
    console.log('target:' + e.target.id + ' & currentTarget:' + e.currentTarget.id)
  })
  document.getElementById('d').addEventListener('click', function(e) {
    console.log('target:' + e.target.id + ' & currentTarget:' + e.currentTarget.id)
  })
</script>


结果
target:d & currentTarget:d
target:d & currentTarget:c
target:d & currentTarget:b
target:d & currentTarget:a
```

## DOM 事件清除

清除元素上面所有绑定的点击事件：

```js
const $el = document.getElementById('el')
const $elClone = el.cloneNode(true)

$el.parentNode.replaceChild($elClone, $el)
```

## input 事件

### setSelectionRange

`el.setSelectionRange` 设置光标的选中范围、位置

### compositionstart

- 中文输入法延时发送请求
- 输入中文过程中不会发送请求

```js
let cpLock = false
let $searchKeyword = document.querySelector('#search-keyword')
if($searchKeyword) {
  $searchKeyword.addEventListener('compositionstart', () => {
    cpLock = true
  })
  $searchKeyword.addEventListener('compositionend', () => {
    cpLock = false
  })
  $searchKeyword.addEventListener('keyup', (e) => {
    if(!cpLock) search(e)
  })
}
```

## paste 事件从剪切板粘贴图片

```js
// Handle the `paste` event
document.addEventListener('paste', function(evt) {
    // Get the data of clipboard
    const clipboardItems = evt.clipboardData.items;
    const items = [].slice
        .call(clipboardItems)
        .filter(function(item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
        });
    if (items.length === 0) {
        return;
    }

    const item = items[0];
    // Get the blob of image
    const blob = item.getAsFile();

    // Assume that we have an `img` element
    // <img id="preview" />

    const imageEle = document.getElementById('preview');
    imageEle.src = URL.createObjectURL(blob);

    // 粘贴后上传服务器
    // Create a new FormData
    const formData = new FormData();
    formData.append('image', blob, 'filename');

    // Create new Ajax request
    const req = new XMLHttpRequest();
    req.open('POST', '/path/to/back-end', true);

    // Handle the events
    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
            const res = req.responseText;
            // Do something with the response
            // ...
        }
    };

    // Send it
    req.send(formData);
});
```

# API

## First-Contentful-Paint 首屏时间

[以用户为中心的性能指标](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics?hl=zh-cn)

### first-contentful-paint

```js
const getPerformanceTimingByName = (performance, name) => {
  if (!performance || !name || !performance.getEntriesByName) {
    return false;
  }
  const timeItems = performance.getEntriesByName(name);
  if (timeItems && timeItems[0] && timeItems[0].startTime) {
    return Math.round(timeItems[0].startTime);
  }
  return false;
};

getPerformanceTimingByName(performance, 'first-contentful-paint')
```

### MutationObserver

```js
const details = [];
const ignoreEleList = ['script', 'style', 'link', 'br'];
let observeDom;
let firstScreenTiming;

// 查看当前元素的祖先元素是否在数组中
function isEleInArray(target, arr) {
  if (!target || target === document.documentElement) {
    return false;
  } else if (arr.indexOf(target) !== -1) {
    return true;
  } else {
    return isEleInArray(target.parentElement, arr);
  }
}

function isInFirstScreen(target) {
  if (!target || !target.getBoundingClientRect) return false;

  const rect = target.getBoundingClientRect();
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;
  return rect.left >= 0
    && rect.left < screenWidth
    && rect.top >= 0
    && rect.top < screenHeight;
}

function updateTiming() {
  if (observeDom) {
    observeDom.disconnect();
  }
  for (let i = 0; i < details.length; i++) {
    const detail = details[i]
    for (let j = 0; j < detail.roots.length; j++) {
      if (isInFirstScreen(detail.roots[j])) {
        firstScreenTiming = detail.time;
        break;
      }
    }
    if (typeof firstScreenTiming === 'number') {
      break;
    }
  }
  console.log('ccc firstScreenTiming', firstScreenTiming);
}

if (window.MutationObserver) {
  observeDom = new MutationObserver((mutations => {
    if (!mutations || !mutations.forEach) return;
    const detail = {
      time: performance.now(),
      roots: [],
    };

    mutations.forEach(mutation => {
      if (!mutation || !mutation.addedNodes || !mutation.addedNodes.forEach) return;

      mutation.addedNodes.forEach(ele => {
        if (ele.nodeType === 1 && ignoreEleList.indexOf(ele.nodeName.toLocaleLowerCase()) === -1) {
          if (!isEleInArray(ele, detail.roots)) {
            detail.roots.push(ele);
          }
        }
      });
    });

    if (detail.roots.length) {
      details.push(detail);
    }
  }));

  observeDom.observe(document, {
    childList: true,
    subtree: true,
  });
}

window.addEventListener('load', function () {
  updateTiming()
});
```

## MutationObserver 监听 DOM 变化

- Mutation Observer API 用来监视 DOM 变动
- DOM 的任何变动，比如节点的增删、属性的变动、文本内容的变化，这个 API 都可以得到通知
- 这个 API 归属于微任务，比 Promise.resolve 更快，在响应时间内比如说插入 1000 个 p 元素，那么 MutationObserver 会把这些响应合并成一次

### 构造函数

```js
/**
 * mutations 变动记录数据
 * ovserver 观察者实例
 */
const observer = new MutationObserver((mutations, observer) => {
  console.log(muatation, observer);
});
```

### MutationRecord 对象

- DOM 每次发生变化，就会生成一条变动记录(MutationRecord实例)
- 该实例包含了与变动相关的所有信息。MutationObserver 处理的就是一个个 MutationRecord 实例组成的数组

- type：观察变动的类型(attribute、characterData 或者 childList)
- target：发生变动的DOM节点
- addedNodes：新增的DOM节点
- removedNodes：删除的DOM节点
- previousSibling：前一个同级节点，如果没有则返回 null
- nextSibling：下一个同级的节点，如果没有则返回null
- attributeName：发生变动的属性名，如果设置了 attributeFilter，则只返回 attributeFilter 中的属性值
- oldValue：这个属性只对 attribute 和 characterData 变动生效，如果发生 childList 变动，则返回 null

### observer 实例

#### ovserver

observe 方法用来监听 DOM 变化，接受两个参数

- 所要观察的 DOM 节点
- 配置对象，指定所要观察的变动类型
    - childList：子节点变动(指新增、删除、修改)
    - attributes：属性的变动
    - characterData：节点内容或节点文本的变动
    - subtree：布尔值，表示是否将观察者应用于该节点的后代所有节点
    - attributeOldValue：布尔值，表示观察 attributes 变动时，是否需要记录变动前的属性值
    - characterDataOldValue：布尔值，表示观察 characterData 变动时，是否需要记录变动前的值
    - attributeFilter：数组，表示需要观察的特定属性(比如说 `['class','src']` )

```js
observer.observe(document.documentElement, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
});
```

#### taskRecoreds

- taskRecoreds 方法用于清除变动记录，即不再处理未处理的变动
- 该方法返回变动记录的数组

```js
const changes = observer.taskRecords();
console.log(changes);
```

#### disconnect

- disconnect 方法用来停止观察，调用该方法后，DOM 再发生变动，也不会触发观察者对象

```js
observer.disconnect();
```

## JSZipUtils 压缩包帧动画优化

- 资源打包，减少请求数
- 避免单个大图渲染瓶颈
- 前端解压：[jszip](https://stuk.github.io/jszip/)
- jszip 解析出 Blob
- URL.createObjectURL(blob)

```js
export async function downloadZip(url) {
  let data = await new Promise(function(rs, rj) {
    JSZipUtils.getBinaryCountent(url, function(err, result) {
      if(err) {
        throw err
      }
      rs(result)
    })
  })

  let zip = await JSZip.loadAsync(data)

  let re = /(.jpg|.png|.gif|.ps|.jpeg)$/

  let result = await Promise.all(
    Object.keys(zip.files)
      .filter(fileName => re.test(fileName.toLocaleLowerCase()))
      .map(async function(fileName) {
        let file = zip.files[fileName]
        let blob = await file.async('blob')

        return [
          fileName,
          blob // create an url: URL.createObjectURL(blob)
        ]
      })
  )
}
```

## openDatabase WebSQL

### 检测支持性

```js
if (!window.openDatabase) {
  alert('浏览器不支持 WebSQL')
}
```

### 打开数据库：openDatabase

```js
/**
 * dbname 数据库名
 * version 版本号
 * dbdesc 描述
 * dbsize 数据库大小
 * cb 创建回调
 */
var db = window.openDatabase(
  dbname,
  version,
  dbdesc,
  dbsize,
  function cb() {}
);
```

### 事务操作：transaction

```js
/** 
 * callback 处理事务的回调函数，在回调函数中可以执行 SQL 语句
 * errorCallback 失败回调
 * successCallback 成功回调
*/
transaction(callback, errorCallback, successCallback);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS heros (id unique, name, hp_max, mp_max, role_main)');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10000, " 夏侯惇 ", 7350, 1746, " 坦克 ")');
});
```

### SQL 执行：executeSql

```js
/**
 * sql 要执行的语句
 * SQL 语句中 ? 占位符对应的参数
 * callback 成功回调
 * errorCallback 失败回调
*/
tx.executeSql(sql, [], callback, errorCallback);
```

## execCommand 复制文本

```js
// Create a fake textarea
const textAreaEle = document.createElement('textarea');

// Reset styles
textAreaEle.style.border = '0';
textAreaEle.style.padding = '0';
textAreaEle.style.margin = '0';

// Set the absolute position
// User won't see the element
textAreaEle.style.position = 'absolute';
textAreaEle.style.left = '-9999px';
textAreaEle.style.top = `0px`;

// Set the value
textAreaEle.value = text;

// Append the textarea to body
document.body.appendChild(textAreaEle);

// Focus and select the text
textAreaEle.focus();
textAreaEle.select();

// Execute the "copy" command
try {
    document.execCommand('copy');
} catch (err) {
    // Unable to copy
} finally {
    // Remove the textarea
    document.body.removeChild(textAreaEle);
}
```

## Pormise 方法

### 解决的问题

解决异步代码的回调嵌套问题。

```js
new Promise(请求1)
  .then(请求2(请求1结果))
  .then(请求3(请求2结果))
  .then(请求4(请求3结果))
  .then(请求5(请求4结果))
  .catch(处理异常(异常信息))
```

### Promise 方法

- Promise.resolve(value)
    - value 是值，以成功状态返回的 Promise 对象，then 之后就是值
    - value 是 Promise 对象，返回的 Promise 对象就是入参的 Promise 对象
- Promise.reject(value)
    - 返回 Promise 的状态为 rejected
- Promise.race([promise1, promise2])
    - 返回最先结束的 Promise 任务结果，不管这个 Promise 是成功还是失败
- Promise.all([promise1, promise2])
    - 如果全部成功，数组防暑返回所有执行结果
    - 如果有一个失败，只返回 rejected 的结果
- Promise.prototype.then(fn)
    - fn 的参数为 value，value 是上一个任务的返回结果
    - fn 函数一定要 return 一个结果或者新的 Promise 对象，才能让后面的 then 回调接收
- Promise.prototype.catch(fn)
    - fn 的参数为 err，之前回调抛出的异常信息

### promise.all 异常处理

```js
function getBannerList() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      // 假设这里 reject 一个异常
      reject(new Error('error'))
    }, 300)
  })
}

function getStoreList() {
  // ...
}

function getCategoryList() {
  // ...
}

function initLoad() {
  Promise.all([
    getBannerList().catch(err => err),
    getStoreList().catch(err => err),
    getCategoryList().catch(err => err)
  ]).then(res => {

    if (res[0] instanceof Error) {
      // 处理异常
    } else {
      // 渲染数据
    }

    if (res[1] instanceof Error) {
      // 处理异常
    } else {
      // 渲染数据
    }

    if (res[2] instanceof Error) {
      // 处理异常
    } else {
      // 渲染数据
    }
  })
}

initLoad()
```

## PromiseAll 超时

```js
// https://stackoverflow.com/questions/48577702/setting-a-timeout-for-each-promise-within-a-promise-all

Promise.delay = function(t, val) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, val), t);
  });
};

Promise.raceAll = function(promises, timeoutTime, timeoutVal) {
  return Promise.all(promises.map((p) => {
    return Promise.race([p, Promise.delay(timeoutTime, timeoutVal)]);
  }));
};
```

## Blob 二进制大对象

Binary Large Object 二进制大对象，JS 中 Blob 对象表示不可变的类似文件的原始数据

```ts
const newBlob = new Blob(
  // ArrayBuffer、DOMString 等组成的数组
  ['string'],
  // type 默认 ''，MIME 类型
  // endings 默认 'transparent'，保持 blob 中默认结束符
  {
    type: 'text/plain',
    endings: 'transparent'
  },
);
```

```ts
// blob 对象包含两个属性
interface IBlob {
  size: number;
  type: 'text/plain'
}
```

### blob 实例

```js
(async function () {
  const blob = new Blob([new Uint8Array([72, 101, 108, 108, 111]), ' ', 'Chenng'], {
    type: 'text/plain',
  });

  // stream() 返回一个能读取 blob 内容的 ReadableStream
  console.log(blob.stream());

  // 返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer
  console.log(await blob.arrayBuffer());

  // text() 返回一个 Promise 对象且包含 blob 所有内容
  console.log(await blob.text()); // Hello Chenng

  // slice([start, [, end]]) 返回一个新的 Blob 对象
  console.log(await blob.slice(0, 5).text()); // Hello
}());
```

### 分片上传

```js
const file = new File(['a'.repeat(1000000)], 'test.txt');

const chunkSize = 40000;

async function chunkedUpload() {
  console.log(file.size); // 1000000
  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize + 1);
    const fd = new FormData();
    fd.append('data', chunk);

    // 上传方法
    console.log(chunk); // blob { size: 40001, type: '' }
  }
}

chunkedUpload();
```

### Blob URL

#### URL.createObjectURL

Blob URL 是一种伪协议，通过 `URL.createObjectURL` 来创建 Blob URL。

浏览器内部存储了 `blob:https://xxx.com/40a5` 到 Blob 的映射

#### Blob 文件下载

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Blob 文件下载示例</title>
  </head>

  <body>
    <button id="downloadBtn">文件下载</button>
    <script src="index.js"></script>
  </body>
</html>
```

```js
const download = (fileName, blob) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

const downloadBtn = document.querySelector('#downloadBtn');
downloadBtn.addEventListener('click', (event) => {
  const fileName = 'blob.txt';
  const myBlob = new Blob(['blob.txt 内的文本内容'], { type: 'text/plain' });
  download(fileName, myBlob);
});
```

### Blob 转 base64

```sh
# base64 格式
# <mediatype> 省略默认为 text/plain;charset=US-ASCII
# ;base64 在非文本时添加
data:[<mediatype>][;base64],<data>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Blob 预览图片示例</title>
  </head>

  <body>
    <input type="file" accept="image/*" onchange="loadFile(event)">
    <img id="output"/>
    
    <script>
      const loadFile = function(event) {
        const reader = new FileReader();
        reader.onload = function(){
          const output = document.querySelector('#output');
          output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      };
    </script>
  </body>
</html>
```

### 本地图片压缩

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>本地图片压缩</title>
  </head>
  <body>
    <input type="file" accept="image/*" onchange="loadFile(event)" />
    <script src="./index.js"></script>
  </body>
</html>
```

```js
// 图片压缩返回 base64
function compress(base64, quality, mimeType) {
  const MAX_WIDTH = 800; // 图片最大宽度
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');
  img.crossOrigin = 'anonymous';
  return new Promise((resolve) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth; let
        targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}

// 对于返回的 Data URL 格式的图片数据，为了进一步减少传输的数据量，把它转换为 Blob
function dataUrlToBlob(base64, mimeType) {
  const bytes = window.atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i += 1) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

// 压缩后的图片对应的 Blob 对象封装在 FormData 对象中，然后再通过 AJAX 提交到服务器上
function uploadFile(url, blob) {
  const formData = new FormData();
  const request = new XMLHttpRequest();
  formData.append('image', blob);
  request.open('POST', url, true);
  request.send(formData);
}


function loadFile(event) {
  const reader = new FileReader();
  reader.onload = async function () {
    const compressedDataURL = await compress(
      reader.result,
      90,
      'image/jpeg',
    );
    const compressedImageBlob = dataUrlToBlob(compressedDataURL);
    uploadFile('https://xxx.com/post', compressedImageBlob);
  };
  reader.readAsDataURL(event.target.files[0]);
}
```

### Blob 与 ArrayBuffer 

- Blob 对象是不可变的，而 ArrayBuffer 是可以通过 TypedArrays 或 DataView 来操作
- ArrayBuffer 是存在内存中的，可以直接操作。而 Blob 可以位于磁盘、高速缓存内存和其他不可用的位置
- 使用 FileReader 的 readAsArrayBuffer() 方法，可以把 Blob 对象转换为 ArrayBuffer 对象
- 使用 Blob 构造函数，如 new Blob([new Uint8Array(data]);，可以把 ArrayBuffer 对象转换为 Blob 对象

## iFrame 通信

- 这个标签能够嵌入一个完整的网页
- 在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上
- 很多网页也会通过 http 协议头禁止自己被放入 iframe 中
- 在新标准中，为 iframe 加入了 sandbox 模式和 srcdoc 属性，给 iframe 带来了一定的新场景

### 发送信息

```js
// Called from the iframe
const message = JSON.stringify({
    message: 'Hello from iframe',
    date: Date.now(),
});
window.parent.postMessage(message, '*');
```

```js
// Called from the page
frameEle.contentWindow.postMessage(message, '*');
```

### 接收信息

```js
window.addEventListener('message', function(e) {
    // Get the sent data
    const data = e.data;
    
    // If you encode the message in JSON before sending them, 
    // then decode here
    // const decoded = JSON.parse(data);
});
```

### 多个 iframe 通信

```js
// From a child iframe
const message = JSON.stringify({
  channel: 'FROM_FRAME_A',
  ...
});
window.parent.postMessage(message, '*');
```

```js
window.addEventListener('message', function(e) {
  const data = JSON.parse(e.data);
  // Where does the message come from
  const channel = data.channel;
});
```

## try...catch...错误处理

```js
function returnAndFinally() {
  try {
    console.log('1. I\'m picking up my ball and going home.');
    return;
  } finally {
    console.log('2. finally run');
  }
}

returnAndFinally();

// 1. I'm picking up my ball and going home.
// 2. finally run
```

```js
function catchThrowError() {
  try {
    fail();
  } catch (e) {
    console.log('1. catch run');
    throw e; // 3. new Error
  } finally {
    console.log('2. finally run');
  }

  console.log('not run');
}

catchThrowError();

function fail() {
  throw new Error('new Error');
}

// 1. catch run
// 2. finally run
// /Users/ringcrl/Documents/saga/cs-notes/_test/index.js:6
//     throw e; // 3. new Error
```

```js
function withoutCatch() {
  try {
    console.log('1. Hakuna matata');
  } finally {
    console.log('2. What a wonderful phrase!');
  }
}

withoutCatch();

// 1. Hakuna matata
// 2. What a wonderful phrase!
```

## ES6模块 和 CommonJS

### 输出形式

```js
// require/exports 的用法只有以下三种的写法
const fs = require('fs')
exports.fs = fs
module.exports = fs

// import/export 的写法多样
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'
export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

### 本质差别

-  ES6 Module 的 import 和 export 都是静态的，静态意味着一个模块要暴露或引入的所有方法在编译阶段就全部确定了，导入模块的属性或者方法是强绑定的，包括基础类型，改动全局共享
-  而 CommonJS 则是普通的值传递或者引用传递

```js
// counter.js
exports.count = 0;
setTimeout(function () {
  console.log('increase count to', exports.count++, 'in counter.js after 500ms')
}, 500);

// commonjs.js
const { count } = require('./counter')
setTimeout(function () {
  console.log('read count after 1000ms in commonjs is', count);
}, 1000);

//es6.js
import { count } from './counter';
setTimeout(function () {
  console.log('read count after 1000ms in es6 is', count);
}, 1000);
```

## JQ2JS

### Query Selector

```js
// 选择器
$('selector');
document.querySelectorAll('selector');

// class 查询
$('.class');
document.querySelectorAll('.class');
document.getElementsByClassName('class');

// id 查询
$('#id');
document.querySelector('#id');
document.getElementById('id');

// 属性查询
$('a[target=_blank]');
document.querySelectorAll('a[target=_blank]');

// 后代查询
$el.find('li');
el.querySelectorAll('li');

// 兄弟元素
$el.siblings();
Array.from(el.parentNode.children).filter((child) => {
  return child !== el;
});

// 上一个元素
$el.prev();
el.previousElementSibling;

// 下一个元素
$el.next();
el.nextElementSibling;

// Input/Textarea 的值
$('#my-input').val();
document.querySelector('#my-input').value;

// 获取 e.currentTarget 在 .radio 中的数组索引
$('.radio').index(e.currentTarget);
Array.prototype.indexOf.call(document.querySelectorAll('.radio'), e.currentTarget);

// Iframe contents
$iframe.contents();
iframe.contentDocument;

// 获取属性
$el.attr('foo');
el.getAttribute('foo');

// 设置属性
$el.attr('foo', 'bar');
el.setAttribute('foo', 'bar');

// 获取 data- 属性
$el.data('foo');
el.getAttribute('data-foo');
```

### CSS & Style

```js
// Get style
$el.css("color");
// 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题
const win = el.ownerDocument.defaultView;
// null 的意思是不返回伪类元素
win.getComputedStyle(el, null).color;

// Set style
$el.css({ color: "#ff0011" });
el.style.color = '#ff0011';

// Add class
$el.addClass(className);
el.classList.add(className);

// Remove class
$el.removeClass(className);
el.classList.remove(className);

// has class
$el.hasClass(className);
el.classList.contains(className);

// Toggle class
$el.toggleClass(className);
el.classList.toggle(className);

// Window height
$(window).height();
// 含 scrollbar
window.document.documentElement.clientHeight;
// 不含 scrollbar，与 jQuery 行为一致
window.innerHeight;

// Document height
$(document).height();
const body = document.body;
const html = document.documentElement;
const height = Math.max(
  body.offsetHeight,
  body.scrollHeight,
  html.clientHeight,
  html.offsetHeight,
  html.scrollHeight
);

// Element height
$el.height();
function getHeight(el) {
  const styles = this.getComputedStyle(el);
  const height = el.offsetHeight;
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderBottomWidth = parseFloat(styles.borderBottomWidth);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}
// 精确到整数（border-box 时为 height - border 值，content-box 时为 height + padding 值）
el.clientHeight;
// 精确到小数（border-box 时为 height 值，content-box 时为 height + padding + border 值）
el.getBoundingClientRect().height;

// 获得匹配元素相对父元素的偏移
$el.position();
{ left: el.offsetLeft, top: el.offsetTop }

// 获得匹配元素相对文档的偏移
$el.offset();
function getOffset (el) {
  const box = el.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

// 获取元素滚动条垂直位置
$(window).scrollTop();
(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
```

### DOM 操作

```js
// 移除元素
$el.remove();
el.parentNode.removeChild(el);

// 返回指定元素及其后代的文本内容
$el.text();
el.textContent;

// 设置元素的文本内容
$el.text(string);
el.textContent = string;

// Get HTML
$el.html();
el.innerHTML;

// Set HTML
$el.html(htmlString);
el.innerHTML = htmlString;

// Append 插入到子节点的末尾
$el.append("<div id='container'>hello</div>");
el.insertAdjacentHTML('beforeend', '<div id="container">Hello World</div>');
el.appendChild(newEl);

// Prepend 插入到子节点的开头
$el.prepend("<div id='container'>hello</div>");
el.insertAdjacentHTML('afterbegin', '<div id="container">Hello World</div>');
el.insertBefore(newEl, el.firstChild);

// 在选中元素前插入新节点
$newEl.insertBefore(queryString);
el.insertAdjacentHTML('beforebegin ', '<div id="container">Hello World</div>');
const el = document.querySelector(selector);
if (el.parentNode) {
  el.parentNode.insertBefore(newEl, el);
}

// 在选中元素后插入新节点
$newEl.insertAfter(queryString);
el.insertAdjacentHTML('afterend', '<div id="container">Hello World</div>');
const el = document.querySelector(selector);
if (el.parentNode) {
  el.parentNode.insertBefore(newEl, el.nextSibling);
}

// 如果匹配给定的选择器，返回 true
$el.is(selector);
el.matches(selector);

// 深拷贝被选元素
$el.clone();
el.cloneNode(true);

// 移除所有子节点
$el.empty();
el.innerHTML = '';

// 解析 HTML/SVG/XML 字符串
$(`<ol>
  <li>a</li>
  <li>b</li>
</ol>
<ol>
  <li>c</li>
  <li>d</li>
</ol>`);
range = document.createRange();
parse = range.createContextualFragment.bind(range);
parse(`<ol>
  <li>a</li>
  <li>b</li>
</ol>
<ol>
  <li>c</li>
  <li>d</li>
</ol>`);

// 检测 DOM 元素是不是其他 DOM 元素的后代
$.contains(el, child);
el !== child && el.contains(child);
```

### Events

```js
// Document ready
$(document).ready(eventHandler);
if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}

// 绑定事件
$el.on(eventName, eventHandler);
el.addEventListener(eventName, eventHandler);

// 解绑事件
$el.off(eventName, eventHandler);
el.removeEventListener(eventName, eventHandler);

// 自定义事件
$(el).trigger('custom-event', {key1: 'data'});
if (window.CustomEvent) {
  const event = new CustomEvent('custom-event', {detail: {key1: 'data'}});
} else {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent('custom-event', true, true, {key1: 'data'});
}
el.dispatchEvent(event);
```

## pushState、hashchange 前端路由

两种实现前端路由的方式

- HTML5 History：history.pushState 和 history.replaceState，两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新
- Hash：就是 url 中看到 #，需要一个根据监听哈希变化触发的事件(hashchange) 事件。我们需要用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容

### hash

```js
class RouterClass {
  constructor() {
    this.isBack = false
    this.routes = {}        // 记录路径标识符对应的cb
    this.currentUrl = ''    // 记录hash只为方便执行cb
    this.historyStack = []  // hash栈
    window.addEventListener('load', () => this.render())
    window.addEventListener('hashchange', () => this.render())
  }
  
  /**
   * 初始化
   */
  static init() {
    window.Router = new RouterClass()
  }
  
  /**
   * 记录path对应cb
   * @param path
   * @param cb 回调
   */
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  
  /**
   * 入栈当前hash，执行cb
   */
  render() {
    if (this.isBack) {      // 如果是由backoff进入，则置false之后return
      this.isBack = false   // 其他操作在backoff方法中已经做了
      return
    }
    this.currentUrl = location.hash.slice(1) || '/'
    this.historyStack.push(this.currentUrl)
    this.routes[this.currentUrl]()
    // console.log('refresh事件   Stack：', this.historyStack, '   currentUrl:', this.currentUrl)
  }
  
  /**
   * 路由后退
   */
  back() {
    this.isBack = true
    this.historyStack.pop()                   // 移除当前hash，回退到上一个
    const { length } = this.historyStack
    if (!length) return
    let prev = this.historyStack[length - 1]  // 拿到要回退到的目标hash
    location.hash = `#${ prev }`
    this.currentUrl = prev
    this.routes[prev]()                       // 执行对应cb
    // console.log('点击后退，当前stack：', this.historyStack, '   currentUrl:', this.currentUrl)
  }
}


RouterClass.init()
const BtnDom = document.querySelector('button')
const ContentDom = document.querySelector('.content-div')
const changeContent = content => ContentDom.innerHTML = content

Router.route('/', () => changeContent('默认页面'))
Router.route('/page1', () => changeContent('page1页面'))
Router.route('/page2', () => changeContent('page2页面'))

BtnDom.addEventListener('click', Router.back.bind(Router), false)
```

### history

```js
class RouterClass {
  constructor(path) {
    this.routes = {}        // 记录路径标识符对应的cb
    history.replaceState({ path }, null, path)
    this.routes[path] && this.routes[path]()
    window.addEventListener('popstate', e => {
      console.log(e, ' --- e')
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    })
  }
  
  /**
   * 初始化
   */
  static init() {
    window.Router = new RouterClass(location.pathname)
  }
  
  /**
   * 记录path对应cb
   * @param path 路径
   * @param cb 回调
   */
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  
  /**
   * 触发路由对应回调
   * @param path
   */
  go(path) {
    history.pushState({ path }, null, path)
    this.routes[path] && this.routes[path]()
  }
}


RouterClass.init()
const ul = document.querySelector('ul')
const ContentDom = document.querySelector('.content-div')
const changeContent = content => ContentDom.innerHTML = content

Router.route('/', () => changeContent('默认页面'))
Router.route('/page1', () => changeContent('page1页面'))
Router.route('/page2', () => changeContent('page2页面'))

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault()
    Router.go(e.target.getAttribute('href'))
  }
})
```

## Cookie、localStorage、sessionStorage

- Local Storage、Session Storage 和 Cookie 都遵循同源策略
- 但 Session Storage 特别的一点在于，即便是相同域名下的两个页面，只要它们不在同一个浏览器窗口中打开，那么它们的 Session Storage 内容便无法共享
- localStorage 拥有事件

```js
window.addEventListener('storage', function (event) {
// key localStroage 中被影响的键
// newValue 为这个键所赋的新值
// oldValue 这个键修改前的值
// url 当前发生改变的页面 URL
})
```

## Web Workers 单独运行线程

### 基本概念

- 在与主线程分离的后台线程中运行一个脚本操作
- 构造函数接受一个 JS 文件 URL，这个文件包含了将在 worker 线程中运行的代码
- 主线程和 worker 线程之间都使用 `postMessage()` 方法来发送信息, 并且通过 `onmessage` 这个 event handler 来接收信息（传递的信息包含在 Message 这个事件的 data 属性内) 
- 数据的交互是通过传递副本，而不是直接共享数据

### Workers 类型

- Web Worker（专用 Worker）
- Shared Workers：可被不同的窗体的多个脚本运行，例如 iFrames 等，只要这些 workers 处于同一主域
- Service Workers：作为 web 应用程序、浏览器和网络（如果可用）之间的代理服务，旨在创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源
- 音频 Workers：在网络 worker 上下文中直接完成脚本化音频处理

### Service Worker

- 本质上充当 Web 应用程序与浏览器之间的代理服务器
- 能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作
- Service worker 运行在 worker 上下文，因此它不能访问 DOM
- 它设计为完全异步，同步API（如 XHR 和 localStorage）不能在 service worker 中使用
- 使用 `ServiceWorkerContainer.register()` 方法首次注册 service worker

# JSDoc

```js
/**
 * 定义对象格式
 * 
 * @namespace
 * @property {object}  defaults               - The default values for parties.
 * @property {number}  defaults.players       - The default number of players.
 * @property {string}  defaults.level         - The default level for the party.
 * @property {object}  defaults.treasure      - The default treasure.
 * @property {number}  defaults.treasure.gold - How much gold the party starts with.
 */
var config = {
    defaults: {
        players: 1,
        level:   'beginner',
        treasure: {
            gold: 0
        }
    }
};

/**
 * 
 * 定义参数格式
 * 
 * @typedef {Object} User
 * @property {string} email
 * @property {string} [nickName]
 * 
 * @param {User} user
 */
function getUserInfo(user) {
  // pass
}

/**
 * 返回 Promise
 * 
 * @return {Promise<Number>} time
 */
function getTime() {
  return new Promise (resolve => {
    // pass
  })
}
```

# 实践

## 版本比较

```js
/**
 * @description 比较传入的两个版本号的大小
 * @param v1 版本号1
 * @param v2 要比较的另一个版本号2
 * @returns 比较结果
 * 如果版本号1比版本号2大，返回1
 * 如果版本号1比版本号2小，返回-1
 * 否则返回0
 */
export function verCompare(v1: string, v2: string) {
  if (v1 === v2) return 0;
  const a1 = String(v1).split('.');
  const a2 = String(v2).split('.');
  const len = Math.max(a1.length, a2.length);
  let arr = [a1, a2];
  // 长度不足的往后补0
  arr = arr.map((v) => {
    let s = len - v.length;
    if (s > 0) {
      for (; v.length < len; s++) {
        v.push('0');
      }
    }
    return v;
  });
  if (arr[0].join('.') === arr[1].join('.')) return 0;
  // 逐位转换成数字比对
  for (let i = 0; i < len; i++) {
    if (parseInt(arr[0][i], 10) > parseInt(arr[1][i], 10)) {
      return 1;
    } else if (parseInt(arr[0][i], 10) < parseInt(arr[1][i], 10)) {
      return -1;
    }
  }
}
```

## video 自动播放

### Chrome 策略

- 静音播放永远支持
- 有用户的行为事件（click、tap）
- 根据 `chrome://media-engagement` 评分
- top frames 可以把有声音的自动播放的权限委托给他们的 iframes

### 不能正常播放的异常捕获

```js
var promise = document.querySelector('video').play();

if (promise !== undefined) {  
    promise.catch(error => {
        // Auto-play was prevented
        // Show a UI element to let the user manually start playback
    }).then(() => {
        // Auto-play started
    });
}
```

### 客户端配置

```js
// Android
webView.getSettings().setMediaPlaybackRequiresUserGesture(false);

// iOS
var mediaTypesRequiringUserActionForPlayback: WKAudiovisualMediaTypes
```

### 微信、QQ、QQ 浏览器

- 加载 jsbridge
- 调用 jsbridge 的回调中调用 video 的 play（一般是用查询网络环境的接口）

```js
  lib.wx.initWXConf().done(() => {
    if (typeof window.WeixinJSBridge === 'undefined') {
      console.log('no WeixinJSBridge');
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
        document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
      }
    } else {
      window.WeixinJSBridge.invoke('getNetworkType', {}, wxReadyFunc);
    }
  });
```

## 下载视频

```js
const url =
  'https://v.weishi.qq.com/v.weishi.qq.com/shg_0_1047_rsueafabs5qbbmcagbagbedvrxzwb6a264n6bibaqaafaiga.f0.mp4?dis_k=bb034e72483b875b70fad5feb12c63f0&dis_t=1563845358&guid=0508AFC000E081E13F01036CF26192E5&fromtag=0&personid=1535252226705971';

const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'blob';

xhr.onprogress = function(pe) {
  console.log('progress');
  if (pe.lengthComputable) {
    console.log((pe.loaded / pe.total) * 100);
  }
};

xhr.onload = function(e) {
  if (this.status == 200) {
    window.open(
        window.URL.createObjectURL(
            new Blob([this.response], { type: 'application/video' })
        )
    );
  }
};

xhr.send();
```

## 日期格式化

```js
const dateFormatter = (formatter, date) => {
  date = date ? new Date(date) : new Date();
  const Y = date.getFullYear() + '';
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const H = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return formatter
      .replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.substr(2, 2))
      .replace(/MM/g, (M < 10 ? '0' : '') + M)
      .replace(/DD/g, (D < 10 ? '0' : '') + D)
      .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
      .replace(/mm/g, (m < 10 ? '0' : '') + m)
      .replace(/ss/g, (s < 10 ? '0' : '') + s);
};

dateFormatter('YYYY-MM-DD HH:mm', '1995/02/15 13:55'); // 1995-02-15 13:55
```

## 实现 Canvas 缩放的方法

- 直接调整 canvas 或者 image 样式宽高
- 使用 `transform:scale`
- 使用 canvas context 的 `scale`、`transform` 方法

## Canvas Retina 适配

- `500px * 500px` 的原图画到 `250px * 250px` 的画布上会变模糊
- 罪魁祸首：设备像素比 window.devicePixelRatio
- 解决方案：画在 `500px * 500px` 的 Canvas 上再 `scale(0.5)`

```js
const canvas = opts.canvas,
  context = canvas.getContext('2d'),
  oldWidth = canvas.width,
  oldHeight = canvas.height,
  ratio = window.devicePixelRatio || 1

canvas.width = oldWidth * ratio
canvas.height = oldHeight * ratio

canvas.style.width = oldWidth + 'px'
canvas.style.height = oldHeight + 'px'

context.scale(ratio, ratio)

context.drawImage()
```

## rem 适配移动端屏幕

```js
function setRem() {
  // 自适应屏幕改变html的font-size大小
  (function (doc, win) {
    const docEl = doc.documentElement;
    const resizeEvt = 'orientationchange' in window ?
      'orientationchange' :
      'resize';
    const recalc = function () {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) { return; }
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
    };
    if (!doc.addEventListener) { return; }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
}
```

## 元素拖拽

```js
function drag(id){
  var obj = document.getElementById(id)
  var disX = 0
  var disY = 0
  obj.onmousedown = function(ev){
    disX = ev.pageX - obj.offsetLeft
    disY = ev.pageY - obj.offsetTop
    document.onmousemove = function(ev){
      obj.style.left = ev.pageX - disX + 'px'
      obj.style.top = ev.pageY - disY + 'px'
    }
    document.onmouseup = function(){
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  return false
}
```

## 移动端模拟 hover 效果

```js
addTouchEffect(selector) {
  const $btn = document.querySelector(selector)
  $btn.ontouchstart = () => {
    this.className = "btn-blue btn-blue-on"
  }
  $btn.ontouchend = () => {
    this.className = "btn-blue"
  }
}
```

## 横屏竖屏切换监听

```js
const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
window.addEventListener(evt, function () {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const print = $('#print');
  if (width > height) {
    print.width(width);
    print.height(height);
    print.css('top', 0);
    print.css('left', 0);
    print.css('transform', 'none');
    print.css('transform-origin', '50% 50%');
  } else {
    print.width(height);
    print.height(width);
    print.css('top', (height - width) / 2);
    print.css('left', 0 - (height - width) / 2);
    print.css('transform', 'rotate(90deg)');
    print.css('transform-origin', '50% 50%');
  }
}, false);
```

## switch 使用区间

```js
function getWaterState(tempInCelsius) {
  let state;
  
  switch (true) {
    case (tempInCelsius <= 0): 
      state = 'Solid';
      break;
    case (tempInCelsius > 0 && tempInCelsius < 100): 
      state = 'Liquid';
      break;
    default: 
      state = 'Gas';
  }
  return state;
}
```

## setTimeout 消除递归堆栈溢出

- 堆栈溢出之所以会被消除，是因为事件循环操纵了递归，而不是调用堆栈
- 当 `nextListItem` 运行时，如果 `item` 不为空，timeout 函数会把 `nextListItem` 推到事件队列，该函数退出，因此清空了调用栈
- 当事件队列运行其 timeout 事件，而且进行到下一个 `item` 时，定时器被设置为再次调用 `nextListItem`
- 此该方法从头到尾都没有直接的递归调用，所以无论迭代多少次，调用堆栈保持清空的状态

```js
// 源代码
let list = readHugeList()
let nextListItem = function () {
  let item = list.pop()

  if (item) {
    // process the list item...
    nextListItem()
  }
}

// 改进代码
let list = readHugeList();
let nextListItem = function () {
  let item = list.pop()

  if (item) {
    // process the list item...
    setTimeout(nextListItem, 0)
  }
}
```

## 前端动态生成屏幕快照

主要用到三个库：

- qrcodejs：<https://github.com/davidshimjs/qrcodejs>
- html2canvas：<https://github.com/niklasvh/html2canvas>
- canvas2image：<https://github.com/hongru/canvas2image>

步骤：

- 拼接 url，使用 qrcodejs 动态生成一个二维码
- 编写 html 和 css，将样式转成 canvas
- canvas 是不支持用户长按保存到相册的，这时候需要将 canvas 转成页面上的一个图片，用户长按就可以保存到相册了

## 跳出 forEach 遍历

forEach 是跳不出去的，可以用 `Array.prototype.some` 来进行跳出

```js
const ary = ['JavaScript', 'Java', 'CoffeeScript', 'TypeScript'];

ary.some(function (value, index, _ary) {
  console.log(index + ': ' + value);
  return value === 'CoffeeScript';
});
```

## 移动端虚拟键盘弹出输入框上移

```js
const inputSearch = document.querySelector('#input-search');

inputSearch.addEventListener('focus', () => {
  const inputTextBox = document.querySelector('.search-form-wrap');
  document.body.scrollTop = inputTextBox.getBoundingClientRect().top;
});
```

## HTML 转义与还原

```js
function escapeHTML(target) {
  return target
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function unescapeHTML(target) {
  return String(target)
    .replace(/&#39;/, '\'')
    .replace(/&quot;/, '"')
    .replace(/&lt;/, '<')
    .replace(/&gt;/, '>')
    .replace(/&amp;/, '&')
}
```

## 判断元素是否在视窗内

https://imweb.io/topic/5c7bc84ebaf81d7952094978

### 作用

- 图片的懒加载
- 列表的无限滚动
- 计算广告元素的曝光情况
- 可点击链接的预加载，[quicklink](https://github.com/GoogleChromeLabs/quicklink)

### el.getBoundingClientRect() 手动计算

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

- top 大于等于 0
- left 大于等于 0
- bottom 小于等于视窗高度
- right 小于等于视窗宽度

![05.png](https://qiniu.chenng.cn/2018-11-04-21-49-20.png)

```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}

// usage
console.log(isInViewPort(document.querySelector('.target'))); // true or false
```

<iframe height="265" style="width: 100%;" scrolling="no" title="性能不好的全屏滚动" src="//codepen.io/ringcrl/embed/QPzmqj/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/QPzmqj/'>性能不好的全屏滚动</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Intersection Observer 注册回调

https://github.com/w3c/IntersectionObserver/tree/master/polyfill

- Intersection Observer 即重叠观察者，它用于判断两个元素是否重叠
- 使用需要两步：`创建观察者` 和 `传入被观察者`

```js
// 创建观察者
const options = {
  // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
  // 1 表示完全被包含
  threshold: 1.0, 
};

const callback = (entries, observer) => {
  // ...
}

const observer = new IntersectionObserver(callback, options);
```

```js
// 传入被观察者
const target = document.querySelector('.target');
observer.observe(target);

// 上段代码中被省略的 callback
const callback = function (entries, observer) {
  entries.forEach(entry => {
    entry.time;               // 触发的时间
    entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
    entry.boundingClientRect; // 被观察者的位置举行
    entry.intersectionRect;   // 重叠区域的位置矩形
    entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
    entry.target;             // 被观察者
  });
};
```

<iframe height="265" style="width: 100%;" scrolling="no" title="IntersectionObserver 的滚动" src="//codepen.io/ringcrl/embed/NmeYwP/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/NmeYwP/'>IntersectionObserver 的滚动</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## H5软键盘兼容方案

https://segmentfault.com/a/1190000018959389#articleHeader9

## URL Query 转对象

```js
Object.fromEntries(new URLSearchParams(location.search));
```

## 注入 JS

```js
export function insertJs(src) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-var
    var tag = document.createElement('script'); // 此处打包没有改成ES5-语法，手动替换下

    tag.type = 'text/javascript';
    tag.src = src;
    const s = document.getElementsByTagName('head')[0];

    s.appendChild(tag);
    tag.addEventListener('load', resolve);
  });
}
```

## 元素是否可滚动

```js
const isScrollable = function(ele) {
    // Compare the height to see if the element has scrollable content
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

    // It's not enough because the element's `overflow-y` style can be set as
    // * `hidden`
    // * `hidden !important`
    // In those cases, the scrollbar isn't shown
    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
};
```

## 限制键盘输入

```js
const ele = document.getElementById('input');

ele.addEventListener('keypress', function(e) {
    // Get the code of pressed key
    const key = e.which || e.keyCode;

    // 0, 1, ..., 9 have key code of 48, 49, ..., 57, respectively
    // Space has key code of 32
    if (key != 32 && (key < 48 || key > 57)) {
        // Prevent the default action
        e.preventDefault();
    }
});

// Track the current cursor's position
const selection = {};

ele.addEventListener('keydown', function(e) {
    const target = e.target;
    selection = {
        selectionStart: target.selectionStart,
        selectionEnd: target.selectionEnd,
    };
});

ele.addEventListener('input', function(e) {
    const target = e.target;

    if (/^[0-9s]*$/.test(target.value)) {
        currentValue = target.value;
    } else {
        // Users enter the not supported characters
        // Restore the value and selection
        target.value = currentValue;
        target.setSelectionRange(
            selection.selectionStart,
            selection.selectionEnd
        );
    }
});
```

## 计算元素位置

### 视口位置

![05.png](https://qiniu.chenng.cn/2018-11-04-21-49-20.png)

```js
// 单位为像素
// 除了 width 和 height 外的属性都是相对于视口的左上角位置而言的
DOMRect = object.getBoundingClientRect();
```

### 整个网页左上角定位

给 top、left 属性值加上当前的滚动位置，这样就可以获取与当前的滚动位置无关的值。

```js
function get_page_offset() {
  const html = document.documentElement || document.body.parentNode;
  const scrollX = typeof html.scrollLeft == 'number' ?
    html.scrollLeft :
    document.body.scrollLeft;
  const scrollY = typeof html.scrollTop == 'number' ?
    html.scrollTop :
    document.body.scrollTop;
  return {
    scrollX,
    scrollY,
  };
}
```

## g 标签的宽高

```js
document.getElementById("g1").getBBox();

document.getElementById("g1").getBoundingClientRect();
```

## 访问 DOM 树的所有元素

### 遍历法

```js
function Traverse(element, cb) {
  cb(element);
  const list = element.children;
  for (let i = 0; i < list.length; i++) {
    Traverse(list[i], cb); // recursive call
  }
}
```

### API 法

```js
function findAllTags() {
  const allTags = document.querySelectorAll('*');
  const tagsMap = {};

  for (let i = 0; i < allTags.length; i++) {
    const tag = allTags[i];
    if (!tagsMap[tag.nodeName]) {
      tagsMap[tag.nodeName] = 1;
    } else {
      tagsMap[tag.nodeName] += 1;
    }
  }

  return tagsMap;
}
```

## 获取 document 宽高

```js
// Full height, including the scroll part
const fullHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

// Full width, including the scroll part
const fullWidth = Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
);
```

## 计算图片宽高

```js
const calculateSize = function (url) {
  return new Promise(((resolve, reject) => {
    const image = document.createElement('img');
    image.addEventListener('load', (e) => {
      resolve({
        width: e.target.width,
        height: e.target.height,
      });
    });

    image.addEventListener('error', () => {
      reject();
    });

    image.src = url;
  }));
};

calculateSize('/path/to/image.png').then((data) => {
  const { width, height } = data;
});
```

## 键盘密码可见切换

```html
<input type="password" id="password" />

<button id="toggle">Toggle</button>
```

```js
// Query the elements
const passwordEle = document.getElementById('password');
const toggleEle = document.getElementById('toggle');

toggleEle.addEventListener('click', function() {
    const type = passwordEle.getAttribute('type');
    
    passwordEle.setAttribute(
        'type',
        // Switch it to a text field if it's a password field
        // currently, and vice versa
        type === 'password' ? 'text' : 'password'
    );
});
```

## 聚焦后全选

```js
ele.addEventListener('focus', function(e) {
    // Select the text
    e.target.select();
});
```

## 滚动到某个元素

```js
ele.scrollIntoView({ behavior: 'smooth' });
```

# 新特性

## Function.toString 返回精确字符串

- Function.prototype.toString() 现在返回精确字符，包括空格和注释

```js
function /* a comment */ foo () {}
foo.toString(); // 'function /* comment */ foo () {}'
```

## Array.flat([flat]) 数组拍平

- 递归地将数组展平到指定的深度，默认为 1

```js
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

## Object.fromEntries 组成对象

```js
const obj = { x: 42, y: 50 };
const tuple = Object.entries(obj); // [['x', 42], ['y', 50]]
const reObj = Object.fromEntries(tuple); // { x: 42, y: 50 }
```

## WebAssembly

- WebAssembly 是一种新的字节码格式，主流浏览器都已经支持 WebAssembly
- WebAssembly 字节码和底层机器码很相似可快速装载运行，因此性能相对于 JS 解释执行大大提升

### 基础概念

- WebAssembly 并不是一门编程语言，而是一份字节码标准，需要用高级编程语言编译出字节码放到 WebAssembly 虚拟机中才能运行
- 浏览器厂商需要做的就是根据 WebAssembly 规范实现虚拟机
- WebAssembly 字节码不能直接在任何一种 CPU 架构上运行， 但由于非常接近机器码，可以非常快的被翻译为对应架构的机器码，因此 WebAssembly 运行速度和机器码接近

### 优点

- 体积小：由于浏览器运行时只加载编译成的字节码，一样的逻辑比用字符串描述的 JS 文件体积要小很多
- 加载快：由于文件体积小，再加上无需解释执行，WebAssembly 能更快的加载并实例化，减少运行前的等待时间
- 兼容性问题少：WebAssembly 是非常底层的字节码规范，制订好后很少变动，就算以后发生变化，也只需在从高级语言编译成字节码过程中做兼容

### AssemblyScript

[AssemblyScript](https://github.com/AssemblyScript/assemblyscript) 语法和 TypeScript 一致，对前端来说学习成本低，为前端编写 WebAssembly 最佳选择。

- 比 TypeScript 多了很多更细致的内置类型，以优化性能和内存占用，详情[文档](https://github.com/AssemblyScript/assemblyscript/wiki/Types);
- 不能使用 any 和 undefined 类型，以及枚举类型；
- 可空类型的变量必须是引用类型，而不能是基本数据类型如 string、number、boolean；
- 函数中的可选参数必须提供默认值，函数必须有返回类型，无返回值的函数返回类型需要是 void；
- 不能使用 JS 环境中的内置函数，只能使用 [AssemblyScript 提供的内置函数](https://github.com/AssemblyScript/assemblyscript/wiki/Built-in-functions)。

### 编写 WebAssembly

#### DEMO

https://github.com/ringcrl/WebAssembly-DEMO

#### 编写 TS

```ts
export function f(x: i32): i32 {
  if (x === 1 || x === 2) {
    return 1;
  }
  return f(x - 1) + f(x - 2)
}
```

#### 生成 wasm 文件

```sh
asc AssemblyScript/f.ts -o dist/f.wasm
```

#### html 运行

```ts
fetch('dist/f.wasm') // 从网络加载 f.wasm 文件
  .then(res => res.arrayBuffer()) // 转成 ArrayBuffer
  .then(WebAssembly.instantiate) // 编译为当前 CPU 架构的机器码 + 实例化
  .then(mod => {
    // 调用模块实例上的 f 函数计算
    console.log(mod.instance.exports.f(40));
  });
```

#### Webpack 构建

package.json

```json
{
  "devDependencies": {
    "assemblyscript": "github:AssemblyScript/assemblyscript",
    "assemblyscript-typescript-loader": "^1.3.2",
    "typescript": "^2.8.1",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.10.1"
  }
}
```

webpack.config.js

```js
module.exports = {
  entry: `${__dirname}/AssemblyScript/f.ts`,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'assemblyscript-typescript-loader',
        options: {
          sourceMap: true,
        }
      }
    ]
  },
};
```

tsconfig.json

```json
{
  "extends": "./node_modules/assemblyscript/std/portable.json",
  "include": [
    "./**/*.ts"
  ]
}
```

# 原理

## var 重复声明原理

- 编译器负责词法分析、语法分析、代码生成
    - 遇到 `var a` 会询问作用域是否存在 a
        - 不存在让作用域声明新的变量 a
        - 存在则忽略 `var` 继续向下执行
- 引擎负责整个代码的编译以及运行
    - 遇到 `a = 2` 会询问作用域是否存在 a
        - 若存在则将 a 赋值为 2，因为编译器忽略了 `var`、并且作用域已经有 `a`
        - 若不存在则让作用域声明一个变量 a 并赋值为 2
        - `a = 2` 中 `a` 会被声明为全局变量其中涉及到 `LHS` 查询方式
- 作用域负责维护所有标识符（变量）
- JS 中的 LHS 查询和 RHS 查询

## typeof 原理

JS 底层存储变量，会在变量机器码低位 1-3 位存储类型信息

- 000 对象
- 010 浮点数
- 100 字符串
- 110 布尔
- 1 整数
- 0 null
- -2^30 undefined

## WebGL 与 Canvas

- Canvas 是浏览器封装好的一个绘图环境，在实际进行绘图操作时，浏览器仍然需要调用 OpenGL API
- WebGL API 几乎就是 OpenGL API 未经封装，直接套了一层壳
    - 在 WebGL 中，开发者是通过着色器来完成上述变换的。着色器是运行在显卡中的程序，以 GLSL 语言编写
    - 绘制纹理的基本原理是，为每个顶点指定一个纹理坐标(在(0,0)与(1,1,)的正方形中)，然后传入纹理对象

## 浏览器架构

- 用户界面
- 主进程
- 内核
    - 渲染引擎
    - JS 引擎
        - 执行栈
    - 事件触发线程
        - 消息队列
            - 微任务
            - 宏任务
    - 网络异步线程
    - 定时器线程