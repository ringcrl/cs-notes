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

# 测试 JS

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

# 测试 Vue

https://vue-test-utils.vuejs.org/zh/

## html 渲染、点击事件

```js
// counter.js

export default {
  template: `
    <div>
      <span class="count">{{ count }}</span>
      <button @click="increment">Increment</button>
    </div>
  `,

  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count++
    }
  }
}
```


```js
// test.js

// 从测试实用工具集中导入 `mount()` 方法，同时导入你要测试的组件
// shallowMount 方法只挂载一个组件而不渲染其子组件
import { mount } from '@vue/test-utils'
import Counter from './counter'

// 测试 html 渲染
describe('Counter', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Counter)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // 也便于检查已存在的元素
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
  
  it('button click should increment the count', async () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})
```

## $emit 断言


```js
wrapper.vm.$emit('foo')
wrapper.vm.$emit('foo', 123)

/*
`wrapper.emitted()` 返回以下对象：
{
  foo: [[], [123]]
}
*/

// 断言事件已经被触发
expect(wrapper.emitted().foo).toBeTruthy()

// 断言事件的数量
expect(wrapper.emitted().foo.length).toBe(2)

// 断言事件的有效数据
expect(wrapper.emitted().foo[1]).toEqual([123])
```

## 从子组件触发事件


```vue
<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent'

  export default {
    name: 'ParentComponent',
    components: { ChildComponent },
    data() {
      return {
        emitted: false
      }
    },
    methods: {
      onCustom() {
        this.emitted = true
      }
    }
  }
</script>
```


```js
import { mount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent'
import ChildComponent from '@/components/ChildComponent'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = mount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom')
    expect(wrapper.html()).toContain('Emitted!')
  })
})
```

## setData、setProps 操作组件状态


```js
wrapper.setData({ count: 10 })

wrapper.setProps({ foo: 'bar' })
```

## 初始化 Prop


```js
import { mount } from '@vue/test-utils'

mount(Component, {
  propsData: {
    aProp: 'some value'
  }
})
```

## 仿造 Transitions


```vue
<template>
  <div>
    <transition>
      <p v-if="show">Foo</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>
```


```js
const transitionStub = () => ({
  render: function(h) {
    return this.$options._renderChildren
  }
})

test('should render Foo, then hide it', async () => {
  const wrapper = mount(Foo, {
    stubs: {
      transition: transitionStub()
    }
  })
  expect(wrapper.text()).toMatch(/Foo/)

  wrapper.setData({
    show: false
  })
  await wrapper.vm.$nextTick()

  expect(wrapper.text()).not.toMatch(/Foo/)
})
```

## vue-router 使用 createLocalVue 注入


```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(Component, {
  localVue,
  router
})
```

## 伪造 $route 和 $router


```js
import { shallowMount } from '@vue/test-utils'

const $route = {
  path: '/some/path'
}

const wrapper = shallowMount(Component, {
  mocks: {
    $route
  }
})

wrapper.vm.$route.path // /some/path
```

## 测试 Vuex


```vue
<template>
  <div class="text-align-center">
    <input type="text" @input="actionInputIfTrue" />
    <button @click="actionClick()">Click</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions(['actionClick']),
      actionInputIfTrue: function actionInputIfTrue(event) {
        const inputValue = event.target.value
        if (inputValue === 'input') {
          this.$store.dispatch('actionInput', { inputValue })
        }
      }
    }
  }
</script>
```


```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '../../../src/components/Actions'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Actions.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('dispatches "actionInput" when input event value is "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'input'
    input.trigger('input')
    expect(actions.actionInput).toHaveBeenCalled()
  })

  it('does not dispatch "actionInput" when event value is not "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'not input'
    input.trigger('input')
    expect(actions.actionInput).not.toHaveBeenCalled()
  })

  it('calls store action "actionClick" when button is clicked', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    wrapper.find('button').trigger('click')
    expect(actions.actionClick).toHaveBeenCalled()
  })
})
```

## axios 返回测试


```vue
<template>
  <button @click="fetchResults">{{ value }}</button>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        value: null
      }
    },

    methods: {
      async fetchResults() {
        const response = await axios.get('mock/service')
        this.value = response.data
      }
    }
  }
</script>
```


```js
import { shallowMount } from '@vue/test-utils'
// flush-promises 会刷新所有处于 pending 状态或 resolved 状态的 Promise
import flushPromises from 'flush-promises'
import Foo from './Foo'
jest.mock('axios', () => ({
  get: Promise.resolve('value')
}))

it('fetches async when a button is clicked', async () => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  await flushPromises()
  expect(wrapper.text()).toBe('value')
})
```