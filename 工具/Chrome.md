# 常用操作

## 审查元素加伪元素

点击 `.cls` 旁边的加号，手打 `::after`。

## logpoint

chrome://flags/#enable-devtools-experiments

https://www.google.com/chrome/canary/

支持像打断点一样增加 log：`add logpoint...`

## DOM 全局变量

在 DOM 元素上面右键，`Store DOM nodes as global variables`，可以把 DOM 存储为全局变量。

## monitorEvents

可以在 console 中监听某个元素的所有事件

```js
// 监听
monitorEvents(el);

// 取消监听
unmonitorEvents(el);

// 监听特定的事件
monitorEvents(el, ['mouse', 'focus']);
```

## monitor

监听对象

```js
class Person {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  greet() {
    return this.getMessage('greeting');
  }
  getMessage(type) {
    if (type === 'greeting') {
      return `Hello, I'm ${this.name}!`;
    }
  }
}

john = new Person('John');
monitor(john.getMessage);
```

## copy

在 console 通过 `copy(var)` 复制对象

## Stack trace

对着报错信息 `save as` 就可以保存所有的堆栈信息

## $ 和 $$

- `$` 代码 document.querySelector
- `$$` 代表 document.QuerySelectorAll，返回的是数组不是 Node List

## $i

https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related

```js
$i('lodash')
```

## promise 处理

```js
console.log(await navigator.getBattery()) // 直接打印出 promise 结果
```

## JSON.stringify 格式化

```js
var a = {a: 1, b: 2, c: {d: 3}}
JSON.stringify(a, null, 2)

// "{
//   "a": 1,
//   "b": 2,
//   "c": {
//     "d": 3
//   }
// }"
```

## console.assert

- 当我们传入的第一个参数为 假 时，console.assert 打印跟在这个参数后面的值
- 类似于条件断点，可以不打印出大量的 console，可以不用写 if 语句

```js
var val = null;
console.assert(val, val 为 假值);
```

## console.log 阅读体验

```js
const myName = 'Tomek';
const pencilsCount = 7;
const timestampNow = +new Date();
const id = 5;

console.log({myName, pencilsCount, timestampNow, id});
console.table({myName, pencilsCount, timestampNow, id}); // 更好的阅读体验
```

## console.table 打印数组

```js
console.table($$('div'));
```

## console.dir 打印 DOM 对象

```js
console.dir($('li'));
```

## Shadow editor 阴影编辑器

box-shadow CSS 属性前面的按钮可以直接调整

## Cubic bezier 贝塞尔编辑器

同上，点击图标即可调整贝塞尔曲线

# 快捷键

- `cmd + shift + d` 切换 devtools 位置
- `cmd + [` 或 `cmd + ]` 切换 devtools 标签
- `h` 快速隐藏 DOM 元素

# Debug

## 参考地址

https://juejin.im/post/5c6b6d3be51d454cff27982b
https://juejin.im/post/5c6b6dcfe51d45529d331ab4
https://juejin.im/post/5c6b6defe51d45798b51e4b2

## 事件 Debug

- Event Listener Breakpoints

## 检查变量值

- Scope 显示局部与全局变量，双击变量值可以修改
- Watch 可以写表达式

## 控制台运用

- 除了 `console.log`，还可以尝试潜在的解决方案

## 修改 JS

### 临时修改

- 在 debug 的过程中可以直接修改当前 JS 文件，`cmd + s` 保存后即可运行

### 本地 Override

- 点击 Page 右边的 `>>`，选择 `Overrides`，新建一个空文件夹
- 修改原来的 JS，就会永久保存在本地
- 查看 diff：右上角三个点 => more tools => Changes

## 函数断点

```js
function sum(a, b) {
  let result = a + b; // 会断在函数首行
  return result;
}
debug(sum); // 传入函数对象，而不是字符串
sum();
```

```js
// 在所有 console.log 的时候 debug
debug(console.log);
```

## 调试 Hover 样式

- `:hover` 直接 Element `force state`
- `Mouse inner` 事件触发，`右键 -> Break on -> subtree modifications` 进入断点，然后跳过断点
- `Mouse outer` 事件触发，同上

## Map Local

- 使用 Charles 的 Map Local 映射到本地文件
- 线上不存在 sourceMap 启用本地 sourceMap
