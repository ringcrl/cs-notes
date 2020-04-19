<!--jest-cheat-sheet-->

Jest 小抄。

<!--more-->

# 基础

## 四个单词

- describe：定义一个测试套件
- it：定义一个测试用例
- expect：断言的判断条件
- toEqual：断言的比较结果

## 配置

https://jestjs.io/docs/en/configuration

```js
// jest.config.js

module.exports = {
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '.(css|less)$': '<rootDir>/__test__/NullModule.js',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/src/',
  coveragePathIgnorePatterns: ['<rootDir>/__test__/'],
  coverageReporters: ['text'],
};
```

将原本在 webpack 中对样式文件的引用指向了一个空模块，从而跳过了这一对测试无伤大雅的环节

```js
// NullModule.js

module.exports = {};
```

## 测试结构

```js
describe('makePoniesPink', () => {
  beforeAll(() => {
    /* 在所有 test 之前执行 */
  })
  afterAll(() => {
    /* 在所有 test 完成后执行 */
  })
  beforeEach(() => {
    /* 在每个 test 之前执行 */
  })
  afterEach(() => {
    /* 在每个 test 之后执行 */
  })

  test('make each pony pink', () => {
    const actual = fn(['Alice', 'Bob', 'Eve'])
    expect(actual).toEqual(
      ['Pink Alice', 'Pink Bob', 'Pink Eve']
    )
  })
})
```

# 使用

[Using matchers](http://jestjs.io/docs/en/using-matchers)

[matchers docs](https://facebook.github.io/jest/docs/expect.html)

## 基础匹配

```js
expect(42).toBe(42) // ===
expect(42).not.toBe(3) // !==
expect([1, 2]).toEqual([1, 2]) // 深度相等
expect({ a: undefined, b: 2 }).toEqual({ b: 2 }) // 深度相等
expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 }) // 严格相等 (Jest 23+)
```

## 真值匹配

```js
// 匹配为 true (非 false, 0, '', null, undefined, NaN)
expect('foo').toBeTruthy()
// 匹配为 false (false, 0, '', null, undefined, NaN)
expect('').toBeFalsy()
// 只匹配 null
expect(null).toBeNull()
// 只匹配 undefined
expect(undefined).toBeUndefined()
// 匹配不是 undefined
expect(7).toBeDefined()
```

## 数字

```js
expect(2).toBeGreaterThan(1)
expect(1).toBeGreaterThanOrEqual(1)
expect(1).toBeLessThan(2)
expect(1).toBeLessThanOrEqual(1)
expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
```

## 字符串

```js
expect('long string').toMatch('str')
expect('coffee').toMatch(/ff/)
expect('pizza').not.toMatch('coffee')
expect(['pizza', 'coffee']).toEqual(
  [
    expect.stringContaining('zz'),
    expect.stringMatching(/ff/)
  ]
)
```

## 数组

```js
expect(['Alice', 'Bob', 'Eve']).toHaveLength(3)
expect(['Alice', 'Bob', 'Eve']).toContain('Alice')
expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 })
expect(['Alice', 'Bob', 'Eve']).toEqual(
  expect.arrayContaining(['Alice', 'Bob'])
)
```

## 对象

```js
expect({ a: 1 }).toHaveProperty('a')
expect({ a: 1 }).toHaveProperty('a', 1)
expect({ a: { b: 1 } }).toHaveProperty('a.b')
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
expect({ a: 1, b: 2 }).toMatchObject({
  a: expect.any(Number),
  b: expect.any(Number)
})
expect([{ a: 1 }, { b: 2 }]).toEqual(
  [
    expect.objectContaining({a: expect.any(Number)}),
    expect.anything()
  ]
)
```

## 异常

```js
// const fn = () => {
//   throw new Error('Out of cheese!')
// }
expect(fn).toThrow()
expect(fn).toThrow('Out of cheese')
expect(fn).toThrowErrorMatchingSnapshot()
```

## 快照

```js
expect(node).toMatchSnapshot()
expect(user).toMatchSnapshot({
  date: expect.any(Date)
})
expect(user).toMatchInlineSnapshot()
```

## 模拟函数

```js
// const fn = jest.fn()
// const fn = jest.fn().mockName('Unicorn')
expect(fn).toBeCalled() // 函数被调用
expect(fn).not.toBeCalled() // 函数没被调用
expect(fn).toHaveBeenCalledTimes(1) // 函数只被调一次
expect(fn).toBeCalledWith(arg1, arg2) // 带参数调用
expect(fn).toHaveBeenLastCalledWith(arg1, arg2) // 最后一次调用的参数
expect(fn).toHaveBeenNthCalledWith(args) // 某次调用使用参数
expect(fn).toHaveReturnedTimes(2) // 调用 2 次没报错
expect(fn).toHaveReturnedWith(value) // 调用返回值
expect(fn).toHaveLastReturnedWith(value) // 最后一次调用返回值
expect(fn).toHaveNthReturnedWith(value) // 某次调用返回值
expect(fn.mock.calls).toEqual([
  ['first', 'call', 'args'],
  ['second', 'call', 'args']
]) // 多次调用
expect(fn.mock.calls[0][0](1)).toBe(2)

expect(new A()).toBeInstanceOf(A)
expect(() => {}).toEqual(expect.any(Function))
```

## 异步

[resolves docs](https://facebook.github.io/jest/docs/en/expect.html#resolves)

### resolve

```js
test('resolve to lemon', () => {
  // 调用了一定数量的断言，确保异步代码调用次数
  expect.assertions(1)

  // 确保要写 return
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon')
  // return expect(Promise.reject('octopus')).rejects.toBeDefined();
})
```

### async/await resolve

```js
test('resolve to lemon', async () => {
  expect.assertions(2)
  await expect(Promise.resolve('lemon')).resolves.toBe('lemon')
  await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus')
})
```

### 预期的断言

[更多的例子](https://facebook.github.io/jest/docs/en/tutorial-async.html)

在异步测试中指定一些预期的断言是一个好习惯，如果根本没有调用断言，测试将失败。

```js
test('async test', () => {
  expect.assertions(3) // 在测试期间调用了三个断言
  // 或者
  expect.hasAssertions() // 在测试期间至少调用一个断言

  // 你的 async tests
})
```

### async/await

```js
test('async test', async () => {
  expect.assertions(1)
  const result = await runAsyncOperation()
  expect(result).toBe(true)
})
```

### Promises

在你的 test 中返回一个 Promise

```js
test('async test', () => {
  expect.assertions(1)
  return runAsyncOperation().then(result => {
    expect(result).toBe(true)
  })
})
```

### done() 回调

将您的断言包装在 `try/catch` 块中，否则 Jest 将忽略失败：

```js
test('async test', done => {
  expect.assertions(1)
  runAsyncOperation()
  setTimeout(() => {
    try {
      const result = getAsyncOperationResult()
      expect(result).toBe(true)
      done()
    } catch (err) {
      done.fail(err)
    }
  })
})
```

## 模拟

### 模拟函数

```js
test('call the callback', () => {
  const callback = jest.fn()
  fn(callback)
  expect(callback).toBeCalled()
  expect(callback.mock.calls[0][1].baz).toBe('pizza') // 第一次调用的第二个参数
})
```

您还可以使用快照：

```js
test('call the callback', () => {
  const callback = jest.fn().mockName('Unicorn')
  fn(callback)
  expect(callback).toMatchSnapshot()
  // ->
  // [MockFunction Unicorn] {
  //   "calls": Array [
  // ...
})
```

并将实现传递给 `jest.fn` 函数：

```js
const callback = jest.fn(() => true)
```

[Mock functions 文档](https://facebook.github.io/jest/docs/mock-function-api.html)

### `jest.mock`模拟模块

```js
jest.mock('lodash/memoize', () => a => a) // 原始的 lodash/memoize 应该存在
jest.mock('lodash/memoize', () => a => a, { virtual: true }) // 原始的 lodash/memoize 不是必需的
```

[jest.mock 文档](https://facebook.github.io/jest/docs/jest-object.html#jestmockmodulename-factory-options)

### 模拟文件模拟模块

- 创建一个文件 `__mocks__/lodash/memoize.js`:

  ```js
  module.exports = a => a
  ```

- 加入你的 test

    ```js
    jest.mock('lodash/memoize')
    ```

[Manual mocks docs](https://facebook.github.io/jest/docs/manual-mocks.html)

## 定时器

为使用本机定时器函数（`setTimeout`，`setInterval`，`clearTimeout`，`clearInterval`）的代码编写同步测试。

```js
// 启用假定时器
jest.useFakeTimers()

test('kill the time', () => {
  const callback = jest.fn()
  // 运行一些使用setTimeout或setInterval的代码
  const actual = someFunctionThatUseTimers(callback)
  // 快进直到所有计时器都被执行
  jest.runAllTimers()
  // 同步检查结果
  expect(callback).toHaveBeenCalledTimes(1)
})
```

[jest.runOnlyPendingTimers() 例子](https://jestjs.io/docs/en/timer-mocks#run-pending-timers)

 [advanceTimersByTime() 例子](https://jestjs.io/docs/en/timer-mocks#advance-timers-by-time)



## 副作用模块

Node.js和Jest将缓存你需要的模块，要测试具有副作用的模块，您需要在测试之后重置模块注册表

```js
const modulePath = '../module-to-test'

afterEach(() => {
  jest.resetModules()
})

test('first test', () => {
  // 准备第一次测试的条件
  const result = require(modulePath)
  expect(result).toMatchSnapshot()
})

test('second text', () => {
  // 准备第二次测试的条件
  const fn = () => require(modulePath)
  expect(fn).toThrow()
})
```

## Babel 和 TypeScript

[babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest)

[ts-jest](https://github.com/kulshekhar/ts-jest)

# 调试

## 使用 Chrome 调试

最近，我们遇到了一个问题，我们在 Jest 的某个测试失败了，但是我们不知道为什么。

我们认为这是我们编写的测试用例的问题。我们试图通过在整个测试过程中 `console.log` 来解决这个问题，但是仍然很难弄清楚到底发生了什么，尤其是在不知道如何深入查看某些对象的属性的情况下。

我们可以使用 Chrome Node DevTools。我们测试是通过 `yarn jest` 命令，yarn 是通过 Node 运行的，这意味着我们可以使用 Chrome Node DevTools 来 debugger 运行中的测试用例。这是非常有用的，因为我们需要的一件事就是能够窥视某些物体，看看它们的样子以及它们是如何失效的。这是一种更快，更有条理的方法来调试此测试。以下是我们采取的步骤：

- 首先，在您认为可能失败并输入的测试中插入一个 `debugger`。这将作为调试器停止的断点。
- 打开Chrome并输入地址栏： `chrome://inspect`
- 点击 `Open dedicated DevTools for Node`
- 使用下面的语句代替 `yarn jest`，最好保存到 `package.json` 中
  ```sh
  node --inspect node_modules/.bin/jest --runInBand
  # --runInBand Jest 命令，仅在当前的进程中连续运行所有测试，而非通过创建的子进程的工作池来运行测试。在调试中很有用处。
  ```
  ```json
  "scripts" : {
    "test:debug": "node --inspect node_modules/.bin/jest --runInBand",
  }
  ```

接下来运行 `yarn test:debug`，您的测试现在应该在 Chrome 调试器中运行。你可以使用方便的控制台来探索各种各样的东西！

## 使用 VSCode 调试

配置 `launch.json`，如果所示

![01.png](https://qiniu.chenng.cn/2018-12-05-12-44-32.png)

配置代码

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "args": [
        "--runInBand"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest"
    }
  ]
}
```

参考链接：[How To Debug Jest Tests](http://artsy.github.io/blog/2018/08/24/How-to-debug-jest-tests/)

# 参考

- [jest-cheat-sheet](https://github.com/sapegin/jest-cheat-sheet)
- [Jest 官网](https://facebook.github.io/jest/)
- [使用Jest和Enzyme测试React组件](http://blog.sapegin.me/all/react-jest)
- [React 测试示例](https://react-testing-examples.com/)
- [测试 React 应用程序](https://youtu.be/59Ndb3YkLKA)
- [有效的快照测试](https://blog.kentcdodds.com/effective-snapshot-testing-e0d1a2c28eca)
- [迁移到 jest](https://medium.com/@kentcdodds/migrating-to-jest-881f75366e7e#.pc4s5ut6z)
- [如何使用 Jest 测试 React 和 MobX](https://semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest)
- [使用 Jest 和 Enzyme 测试 React Intl 组件](https://medium.com/@sapegin/testing-react-intl-components-with-jest-and-enzyme-f9d43d9c923e)
- [用 Jest 测试：15个奇妙的技巧和窍门](https://medium.com/@stipsan/testing-with-jest-15-awesome-tips-and-tricks-42150ec4c262)
- [对 React 组件进行单元测试](https://juejin.im/post/5a71413e5188252edb593020)
