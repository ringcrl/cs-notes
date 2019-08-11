# React

## 核心流程

- reconciliation (调度算法）
    - 更新 state 与 props
    - 调用生命周期钩子
    - 生成 virtual dom（称为 Fiber Tree 更为符合）
    - 通过新旧 vdom 进行 diff 算法，获取 vdom change
    - 确定是否需要重新渲染
- commit
    - 如需要，则操作 dom 节点更新

## Fiber

### 解决的问题

- 同步阻塞：React 需要实例化每个类组件，生成一颗组件树，使用 **同步递归** 的方式进行遍历渲染，而这个过程最大的问题就是无法 **暂停和恢复**
- 解决同步阻塞的三个解决思路
    - 任务分割（Fiber 使用的思想）
    - 异步调用
    - 缓存策略

### 实现原理

- 在 React V16 将调度算法进行了重构， 将之前的 stack reconciler 重构成新版的 fiber reconciler
- 具有链表和指针的 **单链表树遍历算法**。通过指针映射，每个单元都记录着遍历当下的上一步与下一步，从而使遍历变得可以被暂停和重启

```js
class Fiber {
  constructor(instance) {
    this.instance = instance;
    // 指向第一个 child 节点
    this.child = child;
    // 指向父节点
    this.return = parent;
    // 指向第一个兄弟节点
    this.sibling = previous;
  }
}
```

### 单链表树遍历算法

- 首先通过不断遍历子节点，到树末尾
- 开始通过 sibling 遍历兄弟节点
- return 返回父节点，继续执行上一步
- 直到 root 节点后，跳出遍历

### 任务分割

- reconciliation 阶段: vdom 的数据对比，是个适合拆分的阶段，比如对比一部分树后，先暂停执行个动画调用，待完成后再回来继续比对
- Commit 阶段: 将 change list 更新到 dom 上，并不适合拆分，才能保持数据与 UI 的同步。否则可能由于阻塞 UI 更新，而导致数据更新和 UI 不一致的情况

### 分散执行

任务分割后，就可以把小任务单元分散到浏览器的空闲期间去排队执行，而实现的关键是两个 API

- requestIdleCallback
    - 低优先级的任务交给 requestIdleCallback 处理，这是个浏览器提供的事件循环空闲期的回调函数，需要 pollyfill，而且拥有 deadline 参数，限制执行事件，以继续切分任务
- requestAnimationFrame
    - 高优先级的任务交给 requestAnimationFrame 处理

### 优先级策略

文本框输入 > 本次调度结束需完成的任务 > 动画过渡 > 交互反馈 > 数据更新 > 不会显示但以防将来会显示的任务

## 性能优化

### Chrome 性能表

- 打开你的应用程序并附加查询参数：`react_perf`。例如：`http://localhost:3000?react_perf`
- 打开 Chrome DevTools Performance 选项卡，然后按 Record

### why-did-you-update

- 检测到潜在不必要的组件渲染
- 检测组件 props 没有改变的 render 调用

```sh
yarn add -D why-did-you-update
```

```js
import React from 'react'
if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}
```

![01.png](https://qiniu.chenng.cn/2019-01-19-11-21-57.png)

## Hooks

### 简介

- Hooks 是一个 React 函数组件内一类特殊的函数（通常以 "use" 开头，比如 "useState"）
- 开发者能够在函数组件（非 class 组件）里使用 state 和 life-cycles
- 可以使用 custom hooks 复用业务逻辑

```js
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 解决的问题

- 很难在组件之间重用状态逻辑
    - React 没有提供一种将可重用行为附加到组件的方法(例如，将它连接到 store)
    - 以前使用高阶组件来解决问题，要求你重新构造组件，会造成“包裹地狱”的现象
    - React 需要更好的原生共享状态逻辑，Hooks 从组件中提取有状态逻辑，以便可以独立测试和重用它
    - Hooks 允许您重用状态逻辑，而不改变组件层次结构
- 一些组件很容易变得无法复用
    - `componentDidMount` 的时候执行了一些数据获取
    - `componentDidMount` 的时候执行了一些事件监听
    - Hooks 允许你在如设置订阅或者获取数据的部分将一个组件拆成更小的函数，而不是根据生命周期强制拆分
- Class 难以理解
    - 必须了解 this 如何工作
    - 必须记住事件绑定程序

### 三种 Hooks

- State hooks （在 function component 中使用 state）
- Effect hooks （在 function component 中使用生命周期和 side effect）
- Custom hooks （自定义 hooks 用来复用组件逻辑，第一个动机中阐述的问题）

#### State hooks

```js
// 单个 useState
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// 多个 useState
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

#### Effect hooks

- useEffect 类似 redux 中的 subscribe
- 每当 React 因为 state 或是 props 而重新 render 的之后，就会触发 useEffect 里的这个 callback listener
- 我们通常在生命周期内做的操作很多都会产生一些副作用的操作：更新 DOM、fetch 数据，所以叫 useEffect

```js
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### Custom hooks

- useContext：替代了 `<Context.Consumer>` 使用 render props 的写法，使组件树更加简洁
- useReducer：相当于组件自带的 redux reducer，负责接收 dispatch 分发的 action 并更新 state

### 例子

#### fetchData

- useEffect 的第二个参数必须传空数组，这样它就等价于只在 componentDidMount 的时候执行
- 如果不传第二个参数的话，它就等价于 componentDidMount 和 componentDidUpdate

```js
import React, { useEffect } from 'react'

export function BusinessComponent() {
  const initData = async () => {
    // 发起请求并执行初始化操作
  }
  // 执行初始化操作
  // 需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。
  useEffect(() => {
    initData();
  }, []);

  return (<div></div>);
}
```

#### 事件清理

- 使用 useEffect 第一个参数的返回值作事件清理，等价于在 componentWillUnmount 的时候去执行清理操作
- 传入了第二个参数，那么只有在第二个参数的值发生变化(以及首次渲染)的时候，才会触发 effects

```js
import React, { useEffect } from 'react'

export function QRCode(url, userId) {
  // 根据 userId 查询扫描状态
  const pollingQueryingStatus = async () => {
  }
  // 取消轮询
  const stopPollingQueryStatus = async() => {
  }

  useEffect(() => {
    pollingQueryingStatus();

    return stopPollingQueryStatus;
  }, []);

  // 根据url生成二维码
  return (<div></div>)
}
```

```js
import React, { useEffect } from 'react'

export function QRCode(url, userId) {
  // 根据 userId 查询扫描状态
  const pollingQueryingStatus = async () => {
  }

  const stopPollingQueryStatus = async() => {
  }
  // 我们只是将 useEffect 的第二个参数加了个 userId
  // userId 的每一次变化都会先触发 stopPollingQueryStatus，之后再执行 effects
  useEffect(() => {
    pollingQueryingStatus();

    return stopPollingQueryStatus;
  }, [userId]);

  // 根据 url 生成二维码
  return (<div></div>)
}
```

#### useState

- 在 setState 的时候，我们可以只修改 state 中的局部变量 `this.setState({ count: 1 });`
- useState，修改 state 必须将整个修改后的 state 传入

```js
import React, { useState } from 'react';

export function Count() {
  const [data, setData] = useState({
    count: 0,
    name: 'cjg',
    age: 18,
  });
    
  const handleClick = () => {
    const { count } = data;
    // 这里必须将完整的state对象传进去
    setData({
      ...data,
      count: count + 1,
    })
  };

  return (<button onClick={handleClick}></button>)
}
```

#### PureComponent

- React.momo 其实并不是一个hook，它其实等价于 PureComponent

```js
import React, { useState } from 'react';

export const Count = React.memo((props) => {
  const [data, setData] = useState({
    count: 0,
    name: 'cjg',
    age: 18,
  });
  
  const handleClick = () => {
    const { count } = data;
    setData({
      ...data,
      count: count + 1,
    })
  };

  return (<button onClick={handleClick}>count:{data.count}</button>)
});
```

## context

- 可以使用 Context 来实现跨层级的组件数据传递
- 使用 Context，可以跨越组件进行数据传递
- 如果要 Context 发挥作用，需要用到两种组件
    - 一个是 Context 生产者(Provider)，通常是一个父节点
    - 另外是一个 Context 的消费者(Consumer)，通常是一个或者多个子节点
    - Context 的使用基于生产者消费者模式

### 项目

- react-redux的 `<Provider />`，通过 Context 提供一个全局态的 store
- 拖拽组件 react-dnd，通过 Context 在组件中分发 DOM 的 Drag 和 Drop 事件
- 路由组件 react-router 通过 Context 管理路由状态

### 使用

#### 旧版

对于父组件，也就是 Context 生产者

- 通过一个静态属性 childContextTypes 声明提供给子组件的 Context 对象的属性
- 并实现一个实例 getChildContext 方法，返回一个代表 Context 的纯对象

```js
import React from 'react'
import PropTypes from 'prop-types'

class MiddleComponent extends React.Component {
  render () {
    return <ChildComponent />
  }
}

class ParentComponent extends React.Component {
  // 声明 Context 对象属性
  static childContextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func
  }
  
  // 返回 Context 对象，方法名是约定好的
  getChildContext () {
    return {
      propA: 'propA',
      methodA: () => 'methodA'
    }
  }
  
  render () {
    return <MiddleComponent />
  }
}
```

Context 的消费者，通过如下方式访问父组件提供的 Context

- 子组件需要通过一个静态属性 contextTypes 声明后，才能访问父组件 Context 对象的属性
- 否则，即使属性名没写错，拿到的对象也是 undefined

```js
import React from 'react'
import PropTypes from 'prop-types'

class ChildComponent extends React.Component {
  // 声明需要使用的 Context 属性
  static contextTypes = {
    propA: PropTypes.string
  }
  
  render () {
    const {
      propA,
      methodA
    } = this.context
    
    console.log(`context.propA = ${propA}`)  // context.propA = propA
    console.log(`context.methodA = ${methodA}`)  // context.methodA = undefined
    
    return null;
  }
}
```

对于无状态子组件(Stateless Component)，可以通过如下方式访问父组件的 Context

```js
import React from 'react'
import PropTypes from 'prop-types'

const ChildComponent = (props, context) => {
  const {
    propA
  } = context
    
  console.log(`context.propA = ${propA}`)  // context.propA = propA
    
  return ...
}
  
ChildComponent.contextProps = {
  propA: PropTypes.string    
}
```

#### 新版

更加明确了生产者消费者模式的使用方式

- 通过静态方法 React.createContext() 创建一个 Context 对象
- 这个 Context 对象包含两个组件，`<Provider />` 和 `<Consumer />`
- `<Provider />` 的 value 相当于现在的 `getChildContext()`
- `<Consumer />` 的 `children` 必须是一个函数，通过函数的参数获取 `<Provider />` 提供的 Context


```js
class App extends React.Component {
  render () {
    return (
      <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
        <Header />
      </ThemeContext.Provider>
    );
  }
}
```

```js
class Header extends React.Component {
  render () {
    return (
      <Title>Hello React Context API</Title>
    );
  }
}
 
class Title extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{background: context.background, color: context.color}}>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}
```

### 获取 context

- 实例的 context 属性(this.context)
- 构造方法 constructor(props, context)
- 生命周期
    - componentWillReceiveProps(nextProps, nextContext)
    - shouldComponentUpdate(nextProps, nextState, nextContext)
    - componetWillUpdate(nextProps, nextState, nextContext)
- 无状态组件通过函数的参数直接访问组件的 Context

```js
// 构造方法
constructor(props, context)

// 生命周期
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componetWillUpdate(nextProps, nextState, nextContext)

// 无状态组件参数
const StatelessComponent = (props, context) => (
)
```

### 理解

- 由于组件的 Context 由其父节点链上所有组件通过 getChildContext() 返回的 Context 对象组合而成，组件通过 Context 是可以访问到其父组件链上所有节点组件提供的 Context 的属性
    - 父组件提供 Context 需要通过 childContextTypes 进行“声明”
    - 子组件使用父组件的 Context 属性需要通过 contextTypes 进行“申请”
    - 可以在一定程度上确保组件所提供的 Context 的可控性和影响范围
    - 通过 Context 暴露数据或者 API 不是一种优雅的实践方案
- 不优先使用
    - 尽管不建议在 App 中使用 Context，但对于组件而言，由于影响范围小于 App，如果可以做到高内聚，不破坏组件树的依赖关系，那么还是可以考虑使用 Context 的
    - 对于组件之间的数据通信或者状态管理，优先考虑用 props 或者 state 解决，然后再考虑用其他第三方成熟库解决的，以上方法都不是最佳选择的时候，那么再考虑使用 Context

### redux 使用 context

- App 的根组件用 `<Provider />` 组件包裹后，本质上就为 App 提供了一个全局的属性 `store`
- `<Provider />` 组件也可以包裹在其他组件中，在组件级的全局范围内共享 `store`

```js
export function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }

    // ......

    Provider.propTypes = {
        store: storeShape.isRequired,
        children: PropTypes.element.isRequired,
    }
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}

export default createProvider()
```

## VNode

- 一切都是 trade off
- React.js 厉害的地方并不是说它比 DOM 快（这句话本来就是错的），而是说不管你数据怎么变化，我都可以以最小的代价来更新 DOM
- 假设数据变化对应的手动 DOM 操作都是尽可能一一对应的（最小化 DOM 操作），那么 React.js 对比我们手动操作 DOM 来说毫无性能可言，因为在得到最小化的 DOM 操作结果之前你还有一个 diff 算法
- 虽然说 diff 算法号称算法复杂度 O(n) 可以得到最小操作结果，但实际上 DOM 树很大的时候，遍历两棵树进行各种对比还是有性能损耗的，特别是我在顶层 setState 一个简单的数据，你就要整棵树 walk 一遍，而真实中我可以一句 jQuery 就搞定
- 列表对比最优算法是 Levenshtein distance，所以在某些情况下即使带了 `key`，也可能带上了不必要的元素移动操作（对比最优算法而言）

## key 的作用

一棵树转换为另一棵树的最小操作数算法问题的通用方案，树中元素个数为n，时间复杂度为O(n的3次方)。React 基于两点假设，实现了一个启发的O(n)算法：

- 两个不同类型的元素将产生不同的树
    - 每当根元素有不同类型，React 将卸载旧树并重新构建新树
- 通过渲染器附带 key 属性，开发者可以示意哪些子元素可能是稳定的
    - 子节点有 key 时，React 使用 key 来匹配原本树的子节点和新树的子节点

## super(props)

- 在构造函数中使用 this，必须先调用 super
- 即便在调用 super() 时没有传入 props 参数，你依然能够在 render 和其它方法中访问 this.props，但是你不能在 constructor 中使用 this.props

```js
// React 内部
// 在调用你的构造函数之后，马上又给实例设置了一遍 props
const instance = new YourComponent(props);
instance.props = props;

// 如果没有传 props
class Button extends React.Component {
  constructor(props) {
    super(); // 我们忘了传入 props
    console.log(props);      // {}
    console.log(this.props); // undefined
  }
}
```

## setState

### 作者 Github 回复

https://github.com/facebook/react/issues/11527#issuecomment-360199710

- 现实目的：如果我们在处理浏览器 click 事件，并且 Child 和 Parent 都调用 setState，我们不希望重新渲染 Child 两次，而是更愿意将它们标记为 dirty，并在结束浏览器事件之前一起重新渲染它们
- 保证内部一致性：即使 state 同步更新，props 不是同步的。(在重新渲染父组件之前，你无法知道 props），所以 `this.state` 和 `this.props` 只有在 `reconciliation` 和 `flushing` 之后才会刷新。React 模型并不总是导致最简洁的代码，但是它是内部一致的，并确保状态提升是安全的
- 允许并发更新：React 可以根据 `setState()` 调用的来源为其分配不同的优先级：事件处理程序、网络响应、动画等。例如您正在键入消息，TextBox 组件中的 `setState()` 调用需要立即刷新。但是，如果您在打字时收到新消息，最好将新消息的渲染延迟到某个阈值(例如一秒钟)，而不是因为阻塞线程而让打字变得断断续续。
- 作者说需要说服你，异步才是灵活的。

### 总结

- 在 **合成事件** 和 **生命周期钩子(除 componentDidUpdate)** 中，setState是异步的
    - 原因：因为在 setState 的实现中，有一个判断: 当更新策略正在事务流的执行中时，该组件更新会被推入 dirtyComponents 队列中等待执行；否则，开始执行 batchedUpdates 队列更新
        - 在生命周期钩子调用中，更新策略都处于更新之前，组件仍处于事务流中，而 componentDidUpdate 是在更新之后，此时组件已经不在事务流中了，因此则会同步执行
        - 在合成事件中，React 是基于 **事务流完成的事件委托机制** 实现，也是处于事务流中
    - 问题：无法在 setState 后马上从 this.state 上获取更新后的值
    - 解决：如果需要马上同步去获取新值，setState 其实是可以传入第二个参数的。setState(updater, callback)，在 callback 中即可获取最新值
- 在 **原生事件** 和 **setTimeout** 中，setState 是同步的，可以马上获取更新后的值
    - 原因：原生事件是浏览器本身的实现，与事务流无关，自然是同步
    - 而 setTimeout 是放置于定时器线程中延后执行，此时事务流已结束，因此也是同步
- 函数式：由于 Fiber 及合并的问题，官方推荐使用 `this.setState((state, props) => newState)`
    - 使用函数式，可以用于避免 setState 的批量更新的逻辑，传入的函数将会被 **顺序调用**

### 示例

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 0

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 0

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 2

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 3
    }, 0);
  }

  render() {
    return null;
  }
};
```

- 第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0
- 两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1
- setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3

## 多表单 handleChange

```js
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>

handleInputChange(event) {
  const target = event.target
  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = target.name

  this.setState({
    [name]: value
  })
}
```

## 与 DOM 操作结合

```js
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.somePlugin();
  }

  componentWillUnmount() {
    this.$el.somePlugin('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}
```

## render 元素数组

```js
const Fruits = () => [
  <li key="1">Pear</li>,
  <li key="2">Apple</li>,
]
```

## TextOnlyComponent

```js
const Comment = ({ text }) => text.replace(':)', '[smile]')

<Component text="Text only components are awesom :)">
```

## 弹窗组件设计

```js
class Overlay extends Component {
  constructor(props) {
    super(props)

    this.container = document.createElement('div')
    document.body.appendChild(this.container)
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="overlay">
        <span className="overlay__close" onClick={this.props.onClose}>
          &times;
        </span>
        {this.props.children}
      </div>,
      this.container
    )
  }
}

// 需要在使用 Overlay 组件的地方定义开关状态
class App extends Component {
  constructor(props) {
    super(props)

    this.state = { overlayActive: true }
  }

  closeOverlay() {
    this.setState({ overlayActive: false })
  }

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        {this.state.overlayActive && <Overlay onClose={this.closeOverlay.bind(this)}>overlay content</Overlay>}
      </div>
    )
  }
}
```

# Redux

## 解决的问题

- 深层父子组件通信很麻烦
- 将公共数据提取出来，而修改公共数据需要能保证相关组件自动更新
- Action 概念是用来增强应用的可拓展性的
    - 某一次变化以 Action 的形式展示
    - 公共数据监听 Action 决定自己如何变化，使得公共数据可以以业务逻辑进行维度拆分，拆分出来的数据只要监听跟自己业务逻辑相关的 Action 就可以了
  
## combineReducers

```js
import { combineReducers } from 'redux';

import { broadcast_reducer } from './broadcast_panel/reducers';
import { variable_reducer } from './variable_panel/reducers';
import { textinput_reducer } from './textinput_panel/reducers';

export function blockly_dialog() {
  return combineReducers({
    broadcast: broadcast_reducer,
    variable: variable_reducer,
    text_input: textinput_reducer,
  });
}
```

## bindActionCreators

- 当你需要把 action creator 往下传到一个组件上
- 不想让这个组件觉察到 Redux 的存在
- 不希望把 dispatch 或 Redux store 传给它

```js
function map_dispatch_to_props(dispatch:Dispatch<NemoState>) {
  return bindActionCreators(
    {
      action_toggle_add_variable_dialog,
      action_add_variable,
    },
    dispatch,
  );
}
```

## applyMiddleware

```js
const middlewares:any[] = [];
const saga_middleware = createSagaMiddleware();
middlewares.push(saga_middleware);
let _store:Store<NemoState> = createStore<NemoState>(
  root_reducer,
  applyMiddleware(...middlewares)
);
```

## createStore

```js
const middlewares:any[] = [];
const saga_middleware = createSagaMiddleware();
middlewares.push(saga_middleware);
let _store:Store<NemoState> = createStore<NemoState>(
  root_reducer,
  applyMiddleware(...middlewares)
);
```

# React-Redux

react-redux 主要暴露出两个 api

- Provider 组件
- connect 方法
    - mapStateToProps
    - mapDispatchToProps
    - connect(mapStateToProps, mapDispatchToProps)(Component)
        - 高阶函数，用于注入 Props

## connect

```js
export const AddVariableDialog = connect(
  map_state_to_props,
  map_dispatch_to_props,
)(AddVariableDialogComponent);
```

## Dispatch

```js
function map_dispatch_to_props(dispatch:Dispatch<NemoState>) {
  return bindActionCreators(
    {
      action_toggle_add_variable_dialog,
      action_add_variable,
    },
    dispatch,
  );
}
```

# Redux-saga

概念：

- redux-saga 是一个 redux 中间件
    - 将具体业务和底层逻辑解耦的组件
    - redux 中，中间件就是一个函数，对 `store.dispatch` 方法进行了改造，在发出 Action 和执行 Reducer 这之间，添加了其他功能
- 集中处理 redux 副作用问题，被实现为 generator
- 相当于在 Redux 原有数据流中多了一层，对 Action 进行监听，从而捕获到监听的 Action，然后可以【派生】一个新的任务对 state 进行处理
- watch/worker（监听->执行） 的工作形式

优点：

- 声明式 Effects：所有的操作以JavaScript对象的方式被 yield，并被 middleware 执行。使得在 saga 内部测试变得更加容易，可以通过简单地遍历 Generator 并在 yield 后的成功值上面做一个 deepEqual 测试
- 高级的异步控制流以及并发管理：可以使用简单的同步方式描述异步流，并通过 fork 实现并发任务
- 将所有的异步流程控制都移入到了 sagas，UI 组件不用执行业务逻辑，只需 dispatch action 就行，增强组件复用性

![02.png](https://qiniu.chenng.cn/2019-03-25-11-15-24.png)

![03.jpg](https://qiniu.chenng.cn/2019-03-26-10-32-29.jpg)

## Side Effects

- 映射在 Javascript 程序中，Side Effects 主要指的就是：异步网络请求、本地读取 localStorage/Cookie 等外界操作
- 在 Web 应用，侧重点在于 Side Effects 的 **优雅管理（manage）**，而不是 **消除**

## Middleware && __REDUX_DEVTOOLS_EXTENSION__

```js
import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

const middlewares = [];
const saga_middleware = createSagaMiddleware();
middlewares.push(saga_middleware);
const root_reducer = get_root_reducer();
const store = createStore(
  root_reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__(){ trace: true, traceLimit: 25 }),
  // 注入 sagaMiddleware
  // 后每次执行 store.dispatch(action)
  // 数据流都会经过 sagaMiddleware 这一道工序
  // 进行必要的 “加工处理”（比如：发送一个异步请求）
  applyMiddleware(...middlewares)
);
// 启动 saga，也就是执行 rootSaga
// 通常是程序的一些初始化操作（比如：初始化数据、注册 action 监听）
saga_middleware.run(saga_root);

function* saga_root() {
  // ...
}
```

## Effects creators

- Effect 是一个 javascript 对象，里面包含描述副作用的信息，可以通过 yield 传达给 sagaMiddleware 执行
- 所有的 Effect 都必须被 yield 才会执行，所有的 yield 后面也只能跟 Effect，以保证代码的易测性

```js
// 错误用法
yield fetch(UrlMap.fetchData);

// 正确用法
yield call(fetch, UrlMap.fetchData)

// 代码测试
assert.deepEqual(iterator.next().value, call(fetch, UrlMap.fetchData));
```

### put

- 作用和 redux 中的 dispatch 相同

```js
yield put({ type: 'CLICK_BTN' });
```

### select

- 作用和 redux thunk 中的 getState 相同

```js
const id = yield select(state => state.id);
```

### take

- 等待 redux dispatch 匹配某个 pattern 的 action。

```js
// 先等待一个按钮点击的 action，然后执行按钮点击的 saga
while (true) {
  yield take('CLICK_BUTTON');
  yield fork(clickButtonSaga);
}
```

### takeEvery

- 在发起的 action 与 pattern 匹配时派生指定的 saga。
- 每次发起一个 action 到 Store，并且这个 action 与 pattern 相匹配，那么 takeEvery 将会在后台启动一个新的 saga 任务

#### 使用

```js
import { takeEvery } from `redux-saga`

function* fetchUser(action) {
  ...
}

function* watchFetchUser() {
  yield* takeEvery('USER_REQUESTED', fetchUser)
}
```

#### 实现

```js
function* takeEvery(pattern, saga, ...args) {
  while(true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
}
```

### takeLatest

- 在发起的 action 与 pattern 匹配时派生指定的 saga，并且自动取消之前启动的所有 saga 任务（如果在执行中）。

#### 使用

```js
import { takeLatest } from `redux-saga`

function* fetchUser(action) {
  // ...
}

function* watchLastFetchUser() {
  yield* takeLatest('USER_REQUESTED', fetchUser)
}
```

#### 实现

- takeLatest 是一个高阶 API，使用 take 和 fork 构建。

```js
function* takeLatest(pattern, saga, ...args) {
  let lastTask
  while(true) {
    const action = yield take(pattern)
    if(lastTask)
      yield cancel(lastTask) // 如果任务已经终止，取消就是空操作

    lastTask = yield fork(saga, ...args.concat(action))
  }
}
```

### fork

- 无阻塞型调用

```js
// 一个倒数的例子，当接收到 BEGIN_COUNT 的 action，则开始倒数
// 而接收到  STOP_COUNT 的 action，则停止倒数
function* count(number) {
  let currNum = number;

  while (currNum >= 0) {
    console.log(currNum--);
    yield delay(1000);
  }
}

function countSaga* () {
  while (true) {
    const { payload: number } = yield take(BEGIN_COUNT);
    const countTaskId = yield fork(count, number);

    yield take(STOP_TASK);
    yield cancel(countTaskId);
  }
}
```

### call 

- 阻塞地调用 saga 或者返回 promise 的函数

```js
const project = yield call(fetch, { url: UrlMap.fetchProject });
const members = yield call(fetchMembers, project.id);
```

### apply

类似 call([context, fn], ...args)

### cancel

创建一条 Effect 描述信息，指示 middleware 取消之前的 fork 任务。

## Effect combinators

### race

创建一条 Effect 描述信息，指示 middleware 在多个 Effect 之间执行一个 race（类似 Promise.race([...]) 的行为）。

### all

创建一个效果描述，指示中间件并行运行多个效果并等待所有效果完成。这是与标准相当的API `Promise#all`

```js
yield all([
  take(bcm_action_types.RESET_BLOCKLY_DONE),
  take(bcm_action_types.RESET_THEATRE_DONE),
]);
```

## Middleware API

### createSagaMiddleware

创建一个 Redux 中间件，将 Sagas 与 Redux Store 建立连接。

```js
import createSagaMiddleware from 'redux-saga'
import reducer from './path/to/reducer'
import sagas from './path/to/sagas'

export default function configureStore(initialState) {
  // 注意：redux@>=3.1.0 的版本才支持把 middleware 作为 createStore 方法的最后一个参数
  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      /* other middleware, */
      createSagaMiddleware(...sagas)
    ),
  )
}
```

### middleware.run

- 动态执行 saga，用于 applyMiddleware 阶段之后执行 Sagas。
- 在某些场景中，比如在大型应用中使用 code splitting（模块按需从服务器上加载），又或者处于服务端环境中， 在这些情况下，我们可能希望或者需要在 applyMiddleware 阶段完成之后启动 Sagas

```js
import createSagaMiddleware from 'redux-saga'
import startupSagas from './path/to/sagas'

// middleware 实例
const sagaMiddleware = createSagaMiddleware(...startupSagas)
```

## 错误处理

- 假设 saga2 出现代码异常了，且没有进行异常捕获，这样的异常会导致整个 Web App 崩溃

```js
function* saga1 () { /* ... */ }
function* saga2 () { throw new Error('模拟异常'); }
function* saga3 () { /* ... */ }

function* rootSaga() {
  yield fork(saga1);
  yield fork(saga2);
  yield fork(saga3);
}

// 启动 saga
sagaMiddleware.run(rootSaga);
```

- 使用 spawn 替换 fork，它们的区别在于 spawn 返回 isolate task，不存在 父子关系，也就是说，即使 saga2 挂了，rootSaga 也不受影响，saga1 和 saga3 自然更不会受影响，依然可以正常工作
- 如果因为某一次网络原因，导致 saga2 挂了，在不刷新页面的情况下，用户连重试的机会都不给，显然是不合理的

```js
export default function* root() {
  yield spawn(saga1);
  yield spawn(saga2);
  yield spawn(saga3);
}
```

- 在最上层为每一个 childSaga 添加异常捕获，并通过 while(true) {} 循环自动创建新的 childTask 取代 异常 childTask，以保证功能依然可用

```js
function* rootSaga () {
  const sagas = [ saga1, saga2, saga3 ]; 

  yield sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
        } catch (e) {
          console.log(e);
        }
      }
    })
  );
}
```

# redux-actions

## Action

```js
function toggle_add_variable_dialog(
  state:VariableState,
  action:Action<{show_add_variable_dialog:boolean}>,
) {
  if (action.payload === undefined) {
    return state;
  }
  return {
    ...state,
    show_add_variable_dialog: action.payload.show_add_variable_dialog,
  };
}
```

## createAction

```js
export const action_toggle_add_variable_dialog = createAction<ToggleAddVariableDialogPayload>(A.TOGGLE_VARIABLE_DIALOG);
```

## handleActions

```js
export const variable_reducer = handleActions<VariableState, any>(
  {
    [A.TOGGLE_VARIABLE_DIALOG]: toggle_add_variable_dialog,
    [A.ADD_VARIABLE]: add_variable,
  },
  initial_state,
);
```

# SSR

https://juejin.im/post/5c92f499f265da612647b754?utm_source=gold_browser_extension#heading-9
