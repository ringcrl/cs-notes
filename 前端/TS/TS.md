# 项目配置

## 与 npm 一起工作

- 在 `tsconfig.json` 文件中，配置 `declaration: true`，这样每次 Typescript 编译时都会自动生成声明文件
- 在 package.json，中配置 `prepublishOnly` script 每次执行 `npm publish` 时编译 Typescript 代码
- 调整 `package.json` 中的 `main`、`types` 字段指向最终代码路径

```json
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true // 自动生成声明文件 d.ts
  }
}

// package.json
{
  "name": "@scope/awesome-typescript-package",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts", // 模块 types 路径
  "scripts": {
    "tsc": "tsc -p ./tsconfig.json",
    "prepublishOnly": "npm run tsc" // 每次执行 npm publish 之前，编译代码
  }
}
```


## tsconfig.json

### 指定 config

- `tsc` 默认读取 `tsconfig.json`
- `tsc -p tsconfig-custom.json` 使用自定义的配置文件

### 编译选项

- `"target": "es5"`：只是语法层面上 target 到 es5, 但是相应的库和方法不一定有，你自己 polyfill
- `"lib": ["es2017.object"]`：支持使用 `Object.entries` 不报错，这只是类型上支持，代码上支持需要 pollyfill

```js

你可以通过 compilerOptions 来定制你的编译选项：

{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ESNEXT'...
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "skipLibCheck": true,                  // 跳过子模块类型检查
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录，如果配置了打包出来【绝对路径】，不配置打包出来是【相对路径】
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* SourceMap 选项 */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true,         // 为装饰器提供元数据的支持
  },
  /* 文件范围 */
  "include": [
    "src"
  ],
  "exclude": [
    "libs",
    "node_modules"
  ],
}
```

### lib

- JavaScript 功能
    - es5
    - es6
    - es2015
    - es7
    - es2016
    - es2017
    - esnext
- 运行环境
    dom
    dom.iterable
    webworker
    scripthost
- ESNext 功能选项
    es2015.core
    es2015.collection
    es2015.generator
    es2015.iterable
    es2015.promise
    es2015.proxy
    es2015.reflect
    es2015.symbol
    es2015.symbol.wellknown
    es2016.array.include
    es2017.object
    es2017.sharedmemory
    esnext.asynciterable

## 声明空间

### 类型声明空间

```js
class Foo {}
interface Bar {}
type Bas = {};
```

### 变量声明空间

Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间。

```js
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```

## 模块

### 全局模块

```js
// foo.ts
const foo = 123;

// bar.ts
const bar = foo; // 允许，foo 变成全局变量
```

### 文件模块

如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，它会在这个文件中创建一个本地的作用域。

### 模块路径

moduleResolution: node 选项决定模块路径的处理方式，当导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略。

如果你使用了 module: commonjs 选项， moduleResolution: node 将会默认开启。

- ./node_modules/foo
- ../node_modules/foo
- ../../node_modules/foo
- 直到系统的根目录

### place

- place 表示一个文件，如：foo.ts
- place 是一个文件夹，并且存在一个文件 foo/index.ts
- place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在
- place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在

### 重写动态查找

- 可以通过 `declare module 'somePath'` 声明一个全局模块

```js
// globals.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
```

## 命名空间

- 当使用基于文件模块时，变量不会泄漏至全局变量中
- 还可以通过命名空间管理

```js
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```

```js
// 转成 ES5
(function (Utility) {
  // 添加属性至 Utility
})(Utility || Utility = {});
```

## 动态导入

```js
import(/* webpackChunkName: "momentjs" */ 'moment')
  .then(moment => {
    // 懒加载的模块拥有所有的类型，并且能够按期工作
    // 类型检查会工作，代码引用也会工作
    const time = moment().format();
    console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
    console.log(time);
  })
  .catch(err => {
    console.log('Failed to load moment', err);
  });
```


```js
{
  "compilerOptions": {
    "target": "es5",
    // 为 Webpack Code Splitting 生成 import() 语句
    "module": "esnext"
  }
}
```

https://blog.josequinto.com/2017/06/29/dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4/

## TSLint

参考：https://tech.meituan.com/2019/01/17/exploring-the-tslint-static-checking-tool-on-the-react-native-project.html

### 规则包

| 规则包                      | 内容                     |
| --------------------------- | ------------------------ |
| tslint                      | 官方标准包               |
| tslint-react                | 官方 React 包            |
| tslint-consistent-codestyle | 统一代码风格             |
| tslint-config-airbnb        | 严格的风格               |
| tslint-eslint-rules         | 补充 TSLint 中缺失的部分 |

```sh
yarn add tslint tslint-config-airbnb tslint-react -D
```

```js
// tslint.json
{
  "extends": [
    "tslint-config-airbnb",
    "tslint-react"
  ],
  "rules": {
    "no-increment-decrement": false
  }
}
```

### 禁用 TS Lint

```js
/* tslint:disable */
eval(code);
/* tslint:enable */

// tslint:disable-next-line
eval(code);

eval(code); // tslint:disable-line
```

### 自定义规则

#### 需求

- 团队中的个性化需求难以满足。例如，saga中的异步函数需要在最外层加try-catch，且catch块中需要加异常上报
- 官方规则的开启与配置不符合当前团队情况

#### 步骤

- 编写规则信息
    - 文件命名
        - 驼峰命名
        - 以 Rule 为后缀
    - 类命名
        - 继承自 `Lint.Rules.AbstractRule`
    - 填写 metadata 信息
        - ruleName 是规则名，使用烤串命名法，一般是将类名转为烤串命名格式
        - description 一个简短的规则说明
        - descriptionDetails 详细的规则说明
        - rationale 理论基础
        - options 配置参数形式，如果没有可以配置为 null
        - optionExamples 参数范例 ，如没有参数无需配置
        - typescriptOnly true/false 是否只适用于 TypeScript
        - hasFix true/false 是否带有修复方式
        - requiresTypeInfo 是否需要类型信息
        - optionsDescrition options 的介绍
        - type 规则的类型
        - functionality ： 针对于语句问题以及功能问题。
        - maintainability：主要以代码简洁、可读、可维护为目标的规则。
        - style：以维护代码风格基本统一的规则。
        - typescript：针对于TypeScript进行提示。
    - 定义错误提示信息
        - `public static FAILURE_STRING = 'Class name must be in pascal case'`
- 编写检查逻辑
    - 实现 apply 方法
        - 返回 `applyWithFunction`、`applyWithWalker`，区别在于可以通过 IWalker 实现一个自定义的 IWalker 类
    - 语法树解析
        - AST Explorer：https://github.com/fkling/astexplorer
        - TypeScript AST Viewer：https://github.com/dsherret/ts-ast-viewer
    - 检查规则代码编写
- 规则配置使用

参考：https://github.com/palantir/tslint/blob/master/src/rules/classNameRule.ts

# 类型系统

## 原始类型

```ts
// 布尔值
let isDone:boolean = false;

// 数值
let decLiteral:number = 6;
let notANumber:number = NaN;
let infinityNumber:number = Infinity;

// 字符串
let myName:string = 'Tom';
let sentence:string = `Hello, my name is ${myName}.
    I'll be ${myAge + 1} years old next month.`;

// 空值
function alertName():void {
  // JavaScript 没有空值（Void）的概念
  // 在 TypeScirpt 中，可以用 void 表示没有任何返回值的函数
  alert('My name is Tom');
}

// Null 和 Undefined
let u:undefined = undefined;
let n:null = null;
// undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
let num:number = undefined;
```

## 任意类型

- 允许被赋值为任意类型
- 访问任何属性都是允许的
- 允许调用任何方法
- 返回的内容的类型都是任意值
- 声明的时候，未指定其类型，那么它会被识别为任意值类型

```js
let myFavoriteNumber:any = 'seven';
myFavoriteNumber = 7;

let anyThing:any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');

let something;
// 上下等价
let something:any;
```

## unknown 未知类型

`any` 增加了运行时出错的风险，表示不知道什么类型的场景使用 `unknown`

```js
let bar: unknown

bar.toFixed(1) // Error

if (typeof bar === 'number') {
  bar.toFixed(1) // OK
}
```

## 类型推论

- 设置为声明时候的数据类型

```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

## 联合类型

- 取值可以为多种类型中的一种
- 当 TS 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
- 可以辨析联合类型

### 基本使用

```ts
let myFavoriteNumber:string|number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 辨析类型

```ts
interface Square {
  kind: 'square';
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type Shape = Square | Rectangle | Circle;

function area(s:Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck:never = s;
  }
}
```

## 类型别名

使用 type 来给一个类型起个新名字。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  }
  else {
    return n();
  }
}
```

## 泛型

- 许多算法和数据结构并不会依赖于对象的实际类型
- 不预先指定具体的类型，而在使用的时候再指定类型
- 定义在函数、接口或类

### 比作方法

可以把泛型比喻成“方法”，“方法”可以传参，可以有多个参数，可以有默认值

```ts
type Foo<T, U = string> = { // 多参数、默认值
  foo: Array<T> // 可以传递
  bar: U
}

type A = Foo<number> // type A = { foo: number[]; bar: string; }
type B = Foo<number, number> // type B = { foo: number[]; bar: number; }
```

### 函数、类、方法

```ts
// filter 方法
decleare function filter<T>(
  array: T[],
  fn: (item: unknown) => boolean
): T[];

filter([1, 2, 3], () => true)
filter(['1', '2', '3'], () => true)
```

```ts
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

reverse<string>(['a', 'b', 'c']);
```

```ts
// 创建一个泛型类
class Queue<T> {
  private data = [];
  push = (item: T) => this.data.push(item);
  pop = (): T => this.data.shift();
}
// 简单的使用
const queue = new Queue<number>();
queue.push(0);
queue.push('1'); // Error：不能推入一个 `string`，只有 number 类型被允许
```

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
    const toreturn = [];
    for (let i = items.length; i >= 0; i--) {
      toreturn.push(items[i]);
    }
    return toreturn;
  }
}

const util = new Utility();
util.reverse<string>(['a', 'b', 'c']);
```

### 多个类型参数

```ts
function swap<T, U>(tuple:[T, U]) : [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, 'seven']);
// ['seven', 7]
```

### 泛型约束

- 事先不知道泛型类型，不能随意的操作它的属性或方法
- 可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
// 泛型 T 不一定包含属性 length，所以编译的时候报错了

interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg:T) : T {
  console.log(arg.length);
  return arg;
}
```

### 配合 axios

- 通常情况下，我们会把后端返回数据格式单独放入一个 interface 里

```ts
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 数据
   * @type { T }
   */
  result: T;

  /**
   * 消息
   * @type { string }
   */
  message: string;
}

// 在 axios.ts 文件中对 axios 进行了处理，例如添加通用配置、拦截器等
import Ax from './axios';
import { ResponseData } from './interface.ts';
export function getUser<T>() {
  return Ax.get<ResponseData<T>>('/somepath')
    .then(res => res.data)
    .catch(err => console.error(err));
}
```

## 交叉类型

- 可以从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能

```ts
function extend<T, U>(first:T, second:U) : T & U {
  const result = <T & U>{};
  for (const id in first) {
    (<T>result)[id] = first[id];
  }
  for (const id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }
  return result;
}
const x = extend({ a: 'hello' }, { b: 42 });
// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
```

## 接口类型

- 接口是对行为的抽象
- 具体如何行动需要由类（class）去实现（implement）

```ts
interface Name {
  first: string;
  second: string;
}
```

### 可选属性

```ts
interface Person {
  name:string;
  age?:number;
}
```

### 任意属性

- 一旦定义了任意属性，那么 `确定属性` 和 `可选属性` 都必须是它的 `子属性`

```ts
interface Person {
  name:string;
  age?:number;
  [propName:string]:any;
}

let tom:Person = {
  name: 'Tom',
  gender: 'male'
};
```

### 只读属性

- 对象中的一些字段只能在创建的时候被赋值
- 与 React 的 state、props 完美结合

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom:Person = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
};
tom.id = 9527;
// Cannot assign to 'id' because it is a constant or a read-only property
```

```ts
interface Props {
  readonly foo:number;
}
interface State {
  readonly bar:number;
}
export class Something extends React.Component<Props, State> {
  someMethod() {
    this.props.foo = 123; // Error: props 是不可变的
    this.state.baz = 456; // Error: 你应该使用 this.setState()
  }
}
```

## 数组类型

### [] 表示



```ts
// 单个类型
let fibonacci:number[] = [1, 1, 2, 3, 5];

// 多个类型
let typesArr:[string, string][] = ['a', 'b']
let typesArr:([string, string]|[string, string, any])[]
```

### Array 表示

```ts
let fibonacci:Array<number> = [1, 1, 2, 3, 5];
```

### 接口表示

```ts
interface NumberArray {
  [index:number]: number;
}
let fibonacci:NumberArray = [1, 1, 2, 3, 5];

// 自定义类型
export interface FieldDropdownOption {
  [0]:FieldDropdownName;
  [1]:FieldDropdownId;
  [2]?:FieldDropdownIcon|undefined;
  [3]?:FieldDropdownTriggleEvent|undefined;
  [4]?:FieldDropdownLabel|undefined;
}
```

### 类数组

- 常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等

```ts
function sum() {
  let args:IArguments = arguments;
}
```

## 函数类型

- 一个函数需要把输入和输出都考虑到

### 函数声明

```ts
function sum(x:number, y:number) : number {
  return x + y;
}
```

### 函数表达式

```ts
let mySum : (x:number, y:number) => number;
mySum = function(x:number, y:number) : number {
  return x + y;
};
```

### 可选参数

- 选参数必须接在必需参数后面
- 换句话说，可选参数后面不允许再出现必须参数了

```ts
function buildName(firstName:string, lastName?:string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
```

### 默认参数

```ts
function buildName(firstName:string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
```

### 剩余参数

- `...rest` 表示剩余参数，其中 `rest` 是数组

```ts
function push(array: any[], ...items:any[]) {
  items.forEach((item) => {
    array.push(item);
  });
}
```

## 类型声明

### 第三方声明

<http://microsoft.github.io/TypeSearch/>

```sh
yarn add @types/jquery -D
```

### 声明语句

```ts
declare type JQeury = any;
declare var $:JQuery;
```

### 声明模块

```ts
declare module 'react-native-image-sequence' {
  import * as React from 'react';
  import { ImageRequireSource, StyleProp, ViewStyle } from 'react-native';
  interface ImageSequenceProps {
    images:ImageRequireSource[];
    loop?:boolean;
    startFrameIndex?:number;
    framesPerSecond?:number;
    style?:StyleProp<ViewStyle>;
  }
  const ImageSequence:(props:ImageSequenceProps) => React.Component<ImageSequenceProps>;
  export default ImageSequence;
}
```

## 内置对象类型

### ES

- Boolean、Error、Date、RegExp 等

```ts
let b:Boolean = new Boolean(1);
let e:Error = new Error('Error occurred');
let d:Date = new Date();
let r:RegExp = /[a-z]/;
```

### DOM 和 BOM

- Document、HTMLElement、Event、NodeList 等

```ts
let body:HTMLElement = document.body;
let allDiv:NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});

const inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
```

### Node.js

- Node.js 不是内置对象的一部分，需要引入第三方声明文件

```ts
yarn add @types/node -D
```

## 元组类型

- 元组可以包含任意数量的成员

```ts
let nameNumber: [string, number];
nameNumber = ['Jenny', 221345];

// 与解构结合
const [name, num] = nameNumber;
```

## 枚举类型

- 枚举类型用于取值被限定在一定范围内的场景

### 数字类型

```ts
enum Color {
  Red, // 0
  Green, // 1
  Blue // 2
}

enum Color {
  DarkRed = 3, // 3
  DarkGreen, // 4
  DarkBlue // 5
}
```

### 字符串类型

```ts
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card'
}
```

### 转换过程

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days['Sun'] === 0); // true
console.log(Days['Mon'] === 1); // true
console.log(Days['Tue'] === 2); // true
console.log(Days['Sat'] === 6); // true

console.log(Days[0] === 'Sun'); // true
console.log(Days[1] === 'Mon'); // true
console.log(Days[2] === 'Tue'); // true
console.log(Days[6] === 'Sat'); // true

// 上面的例子会被编译为
var Days;
(function (Days) {
  Days[Days["Sun"] = 0] = "Sun";
  Days[Days["Mon"] = 1] = "Mon";
  Days[Days["Tue"] = 2] = "Tue";
  Days[Days["Wed"] = 3] = "Wed";
  Days[Days["Thu"] = 4] = "Thu";
  Days[Days["Fri"] = 5] = "Fri";
  Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

## 索引类型

- TypeScript 的索引签名必须是 string、number、symbols
- 使用 keyof 获取对象索引

```ts
// T[K]，索引访问操作符
function pluck<T, K extends keyof T>(o:T, names:K[]) : T[K][] {
  return names.map((n) => o[n]);
}

interface Person {
    name:string;
    age:number;
}
let person:Person = {
    name: 'Jarid',
    age: 35,
};
// 索引类型查询操作符
// let personProps:keyof Person; // 'name' | 'age'
let strings:string[] = pluck(person, ['name']); // ok, string[]
```

## 类型映射

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// Readonly可以把每个属性都变成只读
type A01 = { a: number, b: string }
type A011 = Readonly<A01> // {readonly a: number;readonly b: string;}
// Readonly 实现
type Readonly<T> = {
  readonly [U in keyof T]: T[U];
};

// Partial<T>, 让属性都变成可选的
type A02 = { a: number, b: string }
type A021 = Partial<A02> // { a?: number; b?: string;}
// Partial 实现
type Partial<T> = {
  [U in keyof T]?: T[U];
};

// Required<T>, 让属性都变成必选
type A03 = { a?: number, b?: string }
type A031 = Required<A03> // { a: number; b: string;}
// Required 实现
type Required<T> = {
  [U in keyof T]-?: T[U];
};

// Pick<T,K>, 只保留自己选择的属性, U代表属性集合
type A04 = { a: number, b: string }
type A041 = Pick<A04, 'a'> //  {a:number}
// Pick 实现
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit<T,K> 实现排除已选的属性
type A05 = { a: number, b: string }
type A051 = Omit<A05, 'a'> // {b:string}
// Omit 实现
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Record<K,T>, 创建一个类型,T代表键值的类型, U代表值的类型
type A06 = Record<string, string> // 等价{[k:string]:string}

// Exclude<T,U>, 过滤T中和U相同(或兼容)的类型
type A07 = { a: number, b: string }
type A071 = Exclude<number | string, string | number[]> // number
type A072 = Exclude<number | string, any | number[]> // never , 因为any兼容number, 所以number被过滤掉
// Exclude 实现
type Exclude<T, U> = T extends U ? never : T;

// Extract<T,U>, 提取T中和U相同(或兼容)的类型
type A08 = { a: number, b: string }
type A081 = Extract<number | string, string | number[]> // string

// NonNullable, 剔除T中的undefined和null
type A09 = NonNullable<number | string | null | undefined> // number|string

// ReturnType, 获取T的返回值的类型
type A10 = ReturnType<() => number> // number
// ReturnType 实现
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;

// Parameters 获取函数参数类型
interface A11 {
  (a: number, b: string): string[];
}
type A1 = Parameters<A11> // [number, string]
```

## 类型保护

### 自定义类型保护

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
```

### typeof 类型保护

```ts
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

### instanceof 类型保护

- 此构造函数的 prototype 属性的类型，如果它的类型不为 any的话
- 构造签名所返回的类型的联合

### 声明

```ts
const foo: {
  [index:string]:{ message: string };
} = {};
```

### 有限字面量

```ts
type Index = 'a'|'b'|'c';
type FromIndex = { [k in Index]?: number };
const good:FromIndex = { b: 1, c: 2 };
```

### 多类型索引

```ts
interface ArrStr {
  [key:string]:string|number; // 必须包括所用成员类型
  [index:number]:string; // 字符串索引类型的子级

  // example
  length:number;
}
```

## import 类型

TS2.9 支持使用 `import()` 语法将类型导入到全局模块中。

![02.png](https://qiniu.chenng.cn/2019-01-19-08-52-50.png)

```ts
declare namespace Express {
  interface Request {
    user: import('./user').User;
  }
}
```

# 实用技巧

## 对象惰性初始化

```ts
interface Foo {
  bar: number;
  bas: string;
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = 'Hello World';
```

## 脚本、模块模式

- 脚本模式所有变量定义、类型声明是全局的，多个文件定义同一个变量会报错，同名 interface 会进行合并
- 模块模式所有定义的声明都是模块内有效，模块模式 ts 文件内存在 `export` 关键词

```ts
// 脚本模式
GlobalStore.foo = "foo";
GlobalStore.bar = "bar"; // Error

declare var GlobalStore: {
  foo: string;
};
```

```ts
// 模块模式
GlobalStore.foo = "foo";
GlobalStore.bar = "bar";

declare global {
  var GlobalStore: {
    foo: string;
    bar: string;
  };
}

export {}; // export 关键字改变文件的模式
```

## extends 的多种用途

```ts
// 表示类型扩展
interface A {
  a: string
}

interface B extends A { // { a: string, b: string }
  b: string
}

// 条件类型中起到三目运算符功能
type Bar<T> = T extends string ? 'string' : never
type C = Bar<number> // never
type D = Bar<string> // string
type E = Bar<'fooo'> // string

// 起到类型限制的作用
type Foo<T extends object> = T
type F = Foo<number> // 类型“number”不满足约束“object”。
type G = Foo<string> // 类型“string”不满足约束“object”。
type H = Foo<{}> // OK

// 类继承
class I {}
class J extends I {}
```
