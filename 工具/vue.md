# 实践

## 两种 router

- history
    - 刷新后还是发送原来的页面，后端不作处理就是 404
    - 后端需要定位到同一个 URL
- hash
    - 刷新后还是当前页面

## 添加实例 property

```js
// 实例中使用 this.$http 调用，可以访问到该实例的上下文
Vue.prototype.$http = axios
```

## Vue.directive

### imgLazy

https://juejin.im/post/6857359743817220104?utm_source=gold_browser_extension

```js
// directives/imgLazy.js
import baseImg from '@/assets/logo.png';
// 创建一个监听器
const observer = new IntersectionObserver((entries) => {
  // entries是所有被监听对象的集合
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当被监听元素到临界值且未加载图片时触发。
      !entry.target.isLoaded && showImage(entry.target, entry.target.data_src);
    }
  });
});

function showImage(el, imgSrc) {
  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    el.src = imgSrc;
    el.isLoaded = true;
  };
}
export default {
  // 这里用inserted和bind都行，因为IntersectionObserver时异步的，以防意外还是用inserted好一点
  // inserted和bind的区别在于inserted时元素已经插入页面，能够直接获取到dom元素的位置信息。
  inserted(el, binding) {
    // 初始化时展示默认图片
    el.src = baseImg;
    // 将需要加载的图片地址绑定在dom上
    el.data_src = binding.value;
    observer.observe(el);
  },
  unbind() {
    // 停止监听
    observer.disconnect();
  },
};
```

```js
import imgLazy from '@/directives/imgLazy.js'
Vue.directive('imgLazy', imgLazy)
```

```vue
<template>
    <div class='container'>
        <div v-for="(item,index) in imgSrc" :key="index" >
            <img v-imgLazy="item" >
        </div>
    </div>
</template>
```

# 源码

## _init

- 初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等
- 通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」

## compile

最终需要得到 render function 字符串：

- parse：用正则等方式解析 template 模板中的指令、class、style等数据，形成AST
    - template 采用循环进行字符串匹配的方式，每匹配解析完一段需要将已经匹配掉的去掉，头部的指针指向接下来需要匹配的部分
- optimize：标记 static 静态节点，这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能
- generate：将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串

## 响应式

- getter 函数（template）进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中
- setter 通知之前「依赖收集」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图
    - update：整个树更新
    - patch：新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改

## Virtual DOM

- render function 会被转化成 VNode 节点
- 由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等

## 依赖收集

- 视图中没有用到的 data1，this.data1 改变时不应触发更新
- 多个 Vue 对象用了同一个全局数据，全局数据更新时要触发多个 Vue 对象更新

### Dep 与 Watcher

```js
// 订阅者 Dep
class Dep {
    constructor () {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }

    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }

    /* 通知所有Watcher对象更新视图 */
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
```

```js
// 观察者 Watcher
class Watcher {
    constructor () {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update () {
        console.log("视图更新啦～");
    }
}

Dep.target = null;
```

### 实现流程

- 对象被「读」的时候，会触发 reactiveGetter 函数把当前的 Watcher 对象（存放在 Dep.target 中）收集到 Dep 类中去
- 对象被「写」的时候，则会触发 reactiveSetter 方法，通知 Dep 类调用 notify 来触发所有 Watcher 对象的 update 方法更新对应视图

```js
function defineReactive (obj, key, val) {
    /* 一个Dep类对象 */
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test);
    }
}
```

## VNode

### 概念

- render function 会被转化成 VNode 节点
- 它只是一层对真实 DOM 的抽象，最终可以通过一系列操作使这棵树映射到真实环境上

### 具体实现

```js
class VNode {
    constructor (tag, data, children, text, elm) {
        /*当前节点的标签名*/
        this.tag = tag;
        /*当前节点的一些数据信息，比如props、attrs等数据*/
        this.data = data;
        /*当前节点的子节点，是一个数组*/
        this.children = children;
        /*当前节点的文本*/
        this.text = text;
        /*当前虚拟节点对应的真实dom节点*/
        this.elm = elm;
    }
}
```

### 转换流程

template.vue

```js
<template>
  <span class="demo" v-show="isShow">
    This is a span.
  </span>
</template>
```

render function

```js
function render () {
    return new VNode(
        'span',
        {
            /* 指令集合数组 */
            directives: [
                {
                    /* v-show指令 */
                    rawName: 'v-show',
                    expression: 'isShow',
                    name: 'show',
                    value: true
                }
            ],
            /* 静态class */
            staticClass: 'demo'
        },
        [ new VNode(undefined, undefined, undefined, 'This is a span.') ]
    );
}
```

VNode

```js
{
    tag: 'span',
    data: {
        /* 指令集合数组 */
        directives: [
            {
                /* v-show指令 */
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        /* 静态class */
        staticClass: 'demo'
    },
    text: undefined,
    children: [
        /* 子节点是一个文本VNode节点 */
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        }
    ]
}
```

## nextTick 原理

- 新版本中默认是 mincrotasks, v-on 中会使用 macrotasks
- 修改视图：setter -> Dep -> Watcher -> patch -> 视图
- 触发某个数据的 setter 方法后，对应的 Watcher 对象会被 push 进一个队列 queue 中，在下一个 tick 的时候将这个队列 queue 全部拿出来 run（ Watcher 对象的一个方法，用来触发 patch 操作） 一遍
- 源码中分别用 Promise、setTimeout、setImmediate 等方式在 microtask（或是task）中创建一个事件
- 同一个的 Watcher 在同一个 tick 的时候应该只被执行一次，也就是说队列 queue 中不应该出现重复的 Watcher 对象

### 过滤 Watchers

```js
let has = {};
let queue = [];
let waiting = false;

function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);

        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}
```

## 代理 this.data

实现 this.test 改变而不是 this.data.test 改变触发更新

```js
_proxy(options.data);

function _proxy(data) {
  const that = this;
  Object.keys(data).forEach(key => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return that._data[key];
      },
      set: function proxySetter(val) {
        that._data[key] = val;
      }
    })
  });
}
```

## key 的使用

- 会根据新节点的 key 去对比旧节点数组中的 key，从而找到相应旧节点（这里对应的是一个 key => index 的 map 映射）
- 如果没找到就认为是一个新增节点。而如果没有 key，那么就会采用一种遍历查找的方式去找到对应的旧节点。
- 一种是一个 map 映射，另一种是遍历查找，map映射的速度更快

```js
// vue项目  src/core/vdom/patch.js  -488行
// oldCh 是一个旧虚拟节点数组， 
 if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
```

```js
// 创建 map 函数 - 快
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

```js
// 便利查询 - 慢
// sameVnode 是对比新旧节点是否相同的函数
 function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]
      
      if (isDef(c) && sameVnode(node, c)) return i
    }
  }
```