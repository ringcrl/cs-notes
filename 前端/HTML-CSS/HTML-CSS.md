# HTML

## HTML 模板

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 文档使用的字符编码 -->
    <meta charset="utf-8" />
    <!-- 添加到主屏幕时隐藏地址栏和状态栏（即全屏）-->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- 添加到主屏幕的 Web App 标题 -->
    <meta name="apple-mobile-web-app-title" content="Web App 名称" />
    <!--
    通知搜索引擎文档是否需要被索引
      - all（默认值，索引当前页并跟踪链接，相当于：index, follow
      - none（忽略当前页，相当于：noindex, nofollow）
      - index（索引当前页）
      - noindex（不索引当前页）
      - follow（跟踪当前页链接，不论当前页是否被索引）
      - nofollow（不跟踪当前页链接，不论当前页是否被索引）
  -->
    <meta name="robots" content="index" />
    <!-- 搜索引擎抓取间隔 -->
    <meta name="revisit-after" content="10 days" />
    <!-- 文档描述 -->
    <meta name="description" content="这是一份 meta 列表" />
    <!-- 文档关键字 -->
    <meta name="keywords" content="CSS, HTML, JavaScript, 前端" />
    <!-- 作者信息 -->
    <meta name="author" content="chenng, ringcrl@foxmail.com" />
    <!-- 页面是否缓存 -->
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <!-- 指定页面的过期时间，一旦网页过期，从服务器上重新请求，其中时间必须使用 GMT 格式，或者直接是 0（即不缓存） -->
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT" />
    <!-- 页面自刷新或自跳转 -->
    <meta http-equiv="refresh" content="10" />
    <meta http-equiv="refresh" content="10; url=https://www.chenng.cn" />
    <!-- 禁止缩放 -->
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1, user-scalable=no"
    />
    <!-- X5 浏览器强制竖屏显示 -->
    <meta name="x5-orientation" content="portrait" />
    <!-- X5 浏览器全屏显示 -->
    <meta name="x5-fullscreen" content="true" />
    <!-- UC 浏览器强制竖屏显示 -->
    <meta name="screen-orientation" content="portrait" />
    <!-- UC 浏览器全屏显示 -->
    <meta name="full-screen" content="yes" />
    <!-- 
    禁止电话号码和邮箱的识别
      - 电话：<a href="tel:13333333333">拨打电话13333333333</a>
      - 邮件：<a href="mailto:ringcrl@foxmail.com">发送邮件</a>
  -->
    <!-- telephone=no, -->
    <meta name="format-detection" content="telephone=yes" />
    <!-- 在 Safari 中添加 APP 标识 -->
    <!-- <meta name="apple-itunes-app" content="app-id=637381980"> -->
    <title>index.html</title>
  </head>
</html>
```

## 语义化

- abbr：缩写
  - `<abbr title="World Wide Web">WWW</abbr>.`
- blockquote, q, cite：引用
  - `<cite>"What is the difference between the Web and the Internet?"</cite>.`
- pre, samp, code：表示这部分内容是预先排版过的，不需要浏览器进行排版

## 元素类型

### 行内元素

a b span img input select strong...

- 和相邻的内联元素在同一行
- 宽度(width)、高度(height)、内边距的 padding-top/padding-bottom 和外边距的 margin-top/margin-bottom 都不可改变

### 块级元素

div ul ol li dl dt dd h1 p...

- 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示
- 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制

### 内联块级元素

input img button texterea label...

- 拥有内在尺寸，可设置高宽， 但不会自动换行

### 空元素

br hr link meta

### 替换元素

凡是替换型元素，都是使用 src 属性来引用文件的

- script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素
- img、video、audio 替换型媒体标签
- style 标签并非替换型元素，不能使用 src 属性，这样，我们用 link 标签引入 CSS 文件，就是用 href 属性

## 渲染机制

### DOCTYPE

- DOCTYPE 是用来声明文档类型和 DTD 规范的，一个主要的用途便是文件合法性验证。如果文件不合法，那么浏览器解析时便会出一些差错
- DTD（document type definition，文档类型定义）是一些列的语法规则，用来定义 XML 的文件类型。浏览器会使用它来判断文档类型，决定使用何种协议来解析以及切换浏览器模式

### 浏览器渲染流程

- 基于 DOM 和 CSSOM 执行脚本（Scripts）
- 合并 DOM 和 CSSOM 形成渲染树（Render Tree）
- 使用渲染树布局（Layout）所有元素
- 渲染（Paint）所有元素

### 触发重排 Reflow

- 增删改 DOM 节点
- 移动 DOM 的位置，搞个动画
- 修改 CSS 的动作类样式
- Resize 窗口的时候
- 修改网页默认字体的时候

### 触发重绘 Repaint

- 颜色改动
- visibility: hidden;

### 回流与重绘

- 当 Render Tree 中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。
- 每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。
- 当 Render Tree 中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如 background-color。则就叫称为重绘。
- 回流必将引起重绘，而重绘不一定会引起回流。

### 回流的导火索

#### 改变 DOM 元素的几何属性

- 当一个 DOM 元素的几何属性发生变化时，所有和它相关的节点（比如父子节点、兄弟节点等）的几何属性都需要进行重新计算，它会带来巨大的计算量。
- 常见的几何属性有 width、height、padding、margin、left、top、border 等等。

#### 改变 DOM 树的结构

- 节点的增减、移动等操作。浏览器引擎布局的过程，顺序上可以类比于树的前序遍历——它是一个从上到下、从左到右的过程。

#### 获取一些特定属性的值

- 当你要用到像这样的属性：offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 时，你就要注意了！
- “像这样”的属性，到底是像什么样？——这些值有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流。
- 除此之外，当我们调用了 getComputedStyle 方法，或者 IE 里的 currentStyle 时，也会触发回流。原理是一样的，都为求一个“即时性”和“准确性”。

### 规避回流与重绘

#### 将导火索缓存起来

```js
// 缓存 offsetLeft 与 offsetTop 的值
const el = document.getElementById('el');
let offLeft = el.offsetLeft,
  offTop = el.offsetTop;

// 在 JS 层面进行计算
for (let i = 0; i < 10; i++) {
  offLeft += 10;
  offTop += 10;
}

// 一次性将计算结果应用到 DOM 上
el.style.left = offLeft + 'px';
el.style.top = offTop + 'px';
```

#### 使用类名去合并样式

```js
// bad
const container = document.getElementById('container');
container.style.width = '100px';
container.style.height = '200px';
container.style.border = '10px solid red';
container.style.color = 'red';

// good
const container = document.getElementById('container');
container.classList.add('basic_style');
```

#### 将 DOM 离线

```js
let container = document.getElementById('container');
container.style.display = 'none';
container.style.width = '100px';
container.style.height = '200px';
container.style.border = '10px solid red';
container.style.color = 'red';
// ...（省略了许多类似的后续操作）
container.style.display = 'block';
```

## 微信可视区域

iphone4

- 屏幕总宽度: 320px
- 屏幕总高度: 480px
- 微信网页可视高度: 416px

iphone 5 / 5c / 5s /se

- 屏幕总宽度: 320px
- 屏幕总高度: 568px
- 微信网页可视高度: 504px

iphone6 / iphone 7

- 屏幕总宽度: 375px
- 屏幕总高度: 667px
- 微信内网页可视高度: 603px

iphone6 plus / iphone 7 plus

- 屏幕总宽度: 414px
- 屏幕总高度: 736px
- 微信网页可视高度: 672px

## script 标签

![09.png](./imgs/09.png)

- html 静态 `<script>` 引入，JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情
- js 动态插入 `<script>`
- `<script defer>`: 异步加载，需要在 DOMContentLoaded 事件之前执行
- `<script async>`: 异步加载，脚本文件一旦加载完成，会立即执行，执行时会阻塞元素渲染

### crossOrigin

在 HTML5 中，一些 HTML 元素提供了对 CORS 的支持， 例如 `<img>` 和 `<video>`、`<script>` 均有一个跨域属性 (crossOrigin property)，它允许你配置元素获取数据的 CORS 请求。 这些属性是枚举的，并具有以下可能的值：

- anonymous: 对此元素的 CORS 请求将不设置凭据标志
- use-credentials: 对此元素的 CORS 请求将设置凭证标志，这意味着请求将提供凭据

```js
// 执行来自 https://example.com/example-framework.js 的脚本而不发送用户凭据。
<script src="https://example.com/example-framework.js" crossorigin="anonymous"></script>
```

- crossorigin 会让浏览器启用 CORS 访问检查，检查 http 相应的 Access-Control-Allow-Origin
- 对于传统 script 需要跨域获取的 js 资源，控制暴露出其报错的详细信息
- 对于跨域 JS 来说，只会给出很少的报错信息：'error: script error'，通过使用 crossorigin 属性可以使跨域 JS 暴露出跟同域 JS 同样的报错信息。
- 资源服务器必须返回一个 `Access-Control-Allow-Origin 的 header`，否则资源无法访问

## DOMContentLoaded、Load

- DOMContentLoaded 是 HTML 文档被加载和解析完成后触发
- Load 是页面所有资源（包括图片，音频等）加载完后触发

## Meta viewport

- width：将布局视口设置为固定的值，比如 375px 或者 device-width（设备宽度）
- initial-scale：设置页面的初始缩放
  - width 与 initial-scale 都会初始化布局视口，但浏览器会取其最大值
- minimum-scale：设置最小的缩小程度
- maximum-scale：设置最大的放大程度
- user-scalable：设置为 no 时禁用缩放

# CSS

## position

### sticky

- 当元素在屏幕内，表现为 relative，就要滚出显示器屏幕的时候，表现为 fixed
- 特别适合导航的跟随定位效果
- sticky 元素效果完全受制于父级元素们
  - 父级元素不能有任何 `overflow:visible` 以外的 `overflow` 设置，否则没有粘滞效果
  - 父级元素设置和粘性定位元素等高的固定的 height 高度值，或者高度计算值和粘性定位元素高度一样，也没有粘滞效果
- sticky 定位，不仅可以设置 top，基于滚动容器上边缘定位；还可以设置 bottom，也就是相对底部粘滞。如果是水平滚动，也可以设置 left 和 right 值

```css
nav {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
```

## 选择器

- 拿到 DOM 构造好的元素，去检查它匹配到了哪些规则，再根据规则的优先级，做覆盖和调整
- 所谓的选择器，应该被理解成“匹配器”才更合适

- 空格: 后代，选中它的子节点和所有子节点的后代节点
- < : 子代，选中它的子节点
- +：直接后继选择器，选中它的下一个相邻节点，它只对唯一一个元素生效
- ~：后继，选中它之后所有的相邻节点，后继选择器只作用于一层，所以不包括后继节点的字节点
- ||：列，选中表格中的一列

## @ 规则

- @charset ： https://www.w3.org/TR/css-syntax-3/

  - charset 用于提示 CSS 文件使用的字符编码方式，`@charset "utf-8";`

- @import ：https://www.w3.org/TR/css-cascade-4/

  - @import 用于引入一个 CSS 文件，`@import "mystyle.css";` 或 `@import url("mystyle.css");`

- @media ：https://www.w3.org/TR/css3-conditional/

  - 媒体查询：`@media print { body { font-size: 10pt } }`

- @page ： https://www.w3.org/TR/css-page-3/

  - page 用于分页媒体访问网页时的表现设置

- @counter-style ：https://www.w3.org/TR/css-counter-styles-3

  - counter-style 产生一种数据，用于定义列表项的表现

- @keyframes ：https://www.w3.org/TR/css-animations-1/

  - keyframes 产生一种数据，用于定义动画关键帧

- @fontface ：https://www.w3.org/TR/css-fonts-3/

  - fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的

- @supports ：https://www.w3.org/TR/css3-conditional/

  - support 检查环境的特性，它与 media 比较类似

- @namespace ：https://www.w3.org/TR/css-namespaces-3/
  - 用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间

## @import 和 link 的理解

- @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性
- link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载
- 可以通过 JS 操作 DOM，插入 link 标签来改变样式；无法使用 @import 的方式插入样式
- 虽然 link 先于 @import 加载，却会在加载完毕后置于样式表顶部，最终渲染时会被下面的同名样式层叠

## 隐藏页面元素的四种方法

- opacity 设为 0
- visibility 设为 hidden
- display 设为 none
- position 设为 absolute 并移到无限远

## 像素

- 设备像素
  - 设备像素也可以叫物理像素，由设备的屏幕决定，其实就是屏幕中控制显示的最小单位
- 设备独立像素
  - 设备独立像素是一种可以被程序所控制的虚拟像素，在 Web 开发中对应 CSS 像素
- DPR（设备像素比）
  - 设备像素比 = 设备像素 / 设备独立像素

## IFC

Inline Formatting Contexts（行内级格式化上下文），IFC 只有在一个块级元素中仅包含内联级别元素时才会生成。

### 作用

- 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过设置父容器 text-align:center 则可以使其水平居中
- 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中

## BFC

- BFC(Block formatting context)直译为"块级格式化上下文"，是边距重叠解决方案。
- 一个创建了新的 BFC 的盒子是独立布局的，盒子内元素的布局不会影响盒子外面的元素。

### 渲染规则

- 属于同一个 BFC 的两个相邻 Box 垂直排列
- 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- BFC 中子元素不会超出他的包含块
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

### 触发条件

- 根元素
- overflow 不为 visible
- float 元素
- position: absolute / fixed
- display: inline-block / table-cell / flex / inline-flex

### 使用场景

- 阻止 margin 重叠
- 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 div 都位于同一个 BFC 区域之中)
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖

案例 1：创建 BFC 以显示子元素超出了父元素部分的 margin 值

```html
<style>
  #sec {
    background: red;
    overfloat: hidden;
  }
  .child {
    height: 100px;
    margin-top: 10px;
    background: yellow;
  }
</style>

<section id="sec">
  <article class="child"></article>
</section>
```

案例 2：解决 float 布局右侧元素侵染问题，只需往右侧元素创建一个 BFC

```html
<style>
  #layout {
    background: red;
  }
  #layout .left {
    float: left;
    width: 100px;
    height: 100px;
    background: pink;
  }
  #layout .right {
    height: 110px;
    background: #ccc;
    overfloat: auto;
  }
</style>

<section id="layout">
  <div class="left"></div>
  <div class="right"></div>
</section>
```

案例 3：清除浮动，为外层元素增加 BFC

```html
<style>
  #float {
    background: red;
    overfloat: auto;
  }
  .float {
    float: left;
    background: #ccc;
  }
</style>

<section id="float">
  <div class="float">我是浮动元素</div>
</section>
```

## CSS 盒模型

box-sizing 属性可以为三个值之一

- content-box，默认值，border 和 padding 不计算入 width 之内
- border-box，border 和 padding 计算入 width 之内
- padding-box，padding 计算入 width 内

### content-box

Width = width + padding-left + padding-right + border-left + border-right

### border-box

Width = width(包含 padding-left + padding-right + border-left + border-right)

应用场景：设置 padding 或者 border 时，可能会撑破元素的尺寸，这时我就需要使用 box-sizing: border-box 来将 border 包含进元素的尺寸中，这样更简单的把控布局，例如 50% 的宽度就是 50%，你在里面怎么折腾都行

## CSS 优先级

- 100: id
- 10: class、属性、伪类选择器的
- 1: 标签选择器
- 权值相同的，后定义的优先级较高

## L-V-H-A

被点击访问过的超链接样式不在具有 hover 和 active 了,解决方法是改变 CSS 属性的排列顺序

```
L-V-H-A(link,visited,hover,active)
```

## rgba 和 opacity

rgba()和 opacity 都能实现透明效果，但最大的不同是 opacity 作用于元素，以及元素内的 所有内容的透明度，而 rgba()只作用于元素的颜色或其背景色。(设置 rgba 透明的元素的子元素不会继承透明效果)。

## Flex

### 速记图

![01.jpg](./imgs/01.jpg)
![02.jpg](./imgs/02.jpg)
![03.jpg](./imgs/03.jpg)
![04.jpg](./imgs/04.jpg)
![05.jpg](./imgs/05.jpg)

[flex.css](https://github.com/lzxb/flex.css)

对 flex 布局完美封装，兼容 PC、微信、UC、各种 webview，让你不用写 CSS 代码。

### 容器属性

#### display

- 两个 Flexbox 相关的属性，分别是 `display: flex` 和 `display: inline-flex`
- 对于容器内部的项目来说，效果是一样的
- 区别在于容器自身应该以块元素还是行内元素存在

#### flex-direction

- 它是水平的还是垂直的
- 它在水平或垂直维度上是从左到右还是从右到左

```css
.container {
  flex-direction: row(default) | row-reverse | column | column-reverse;
}
```

#### flex-wrap

- 当容器中的项目一行放不下的时候，是挤一挤还是换行
- 如果需要换行就会形成多行，多行是从上到下排列还是从下到上排列
- flex-direction 反转的是主轴的方向，flex-wrap 反转的交叉轴的方向

```css
.container {
  flex-wrap: nowrap(default) | wrap | wrap-reverse;
}
```

#### justify-content

- 每行内的项目如何水平对齐
- `space-between` 表示两头的项目对齐容器壁，项目与项目之间的空隙平均分配。所谓的 `between` 指的就是项目之间
- `space-around` 表示两头的项目与容器壁保留一个单位的空隙，项目与项目之间保持两个单位的空隙
- `space-evenly` 表示两头的项目与容器壁之间的空隙和项目与项目之间的空隙都保持一个单位

```css
.container {
  justify-content: flex-start(default) | flex-end | center | space-between | space-around | space-evenly;
}
```

#### align-items

- 每行内的项目如何垂直对齐

```css
.container {
  align-items: stretch(default) | flex-start | flex-end | center | baseline;
}
```

#### align-content

- 这个属性将容器的一行视为最小单位，它声明的是如果容器的交叉轴方向有富余空间，每行应该如何垂直对齐
- 弹性项目显式的声明了高度，那 stretch 将不再起作用

```css
.container {
  align-content: stretch(default) | flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

### 项目属性

#### order

- 声明的是弹性项目自身的次序
- 只要显式声明了不是默认值 0 的整数，项目显示的次序将会不同于源代码定义的次序

```css
.item {
  order: <integer>; /* default is 0 */
}
```

#### flex-grow

- 弹性项目是否要瓜分行内的富余空间
- 属性值只允许正整数
- 只有当行内有富余空间时，flex-grow 属性才会生效

```css
.item {
  flex-grow: <number>; /* default is 0 */
}
```

#### flex-shrink

- 弹性项目是否要瓜分行内的负债空间
- 属性值只允许正整数

```css
.item {
  flex-shrink: <number>; /* default is 1 */
}
```

#### flex-basis

- 预先分配给弹性项目的长度，它是 width 属性的替代品，优先级比 width 高

#### align-self

- align-self 的属性值和 align-items 的属性值是一样的，效果也一样
- align-self 声明弹性项目自身在行内的垂直对齐方式

#### margin

用于控制剩余空间如何占用

- `margin: auto;`
- `margin-left: auto;`
- `margin-right: auto;`

## Gird

http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

https://cssgridgarden.com/#zh-cn

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。

### 基本概念

#### 容器和项目

```html
<div>
  <div><p>1</p></div>
  <div><p>2</p></div>
  <div><p>3</p></div>
</div>
```

- 最外层的 `<div>` 元素就是容器
- 内层的三个 `<div>` 元素就是项目
- `<p>` 元素不是项目，Grid 布局只对项目生效

#### 行和列

- 容器里面的水平区域称为"行"（row）
- 容器里面的垂直区域称为"列"（column）

#### 单元格

- 行和列的交叉区域，称为"单元格"（cell）
- n 行和 m 列会产生 n \* m 个单元格。比如，3 行 3 列会产生 9 个单元格

#### 网格线

- 划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列
- n 行有 n + 1 根水平网格线
- m 列有 m + 1 根垂直网格线

### 容器属性

#### dispaly

- `display: grid` 指定一个容器采用网格布局
- `display: inline-grid` 指定 div 是一个行内元素，该元素内部采用网格布局
- 设为网格布局以后，容器的 `float`、`display: inline-block`、`display: table-cell`、`vertical-align` 和 `column-*` 等设置都将失效

#### grid-template-columns & grid-template-rows

- `grid-template-columns` 属性定义每一列的列宽
- `grid-template-rows` 属性定义每一行的行高
- 可以使用 px、百分比、repeat() 函数定义

##### px 与百分比

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

```css
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

##### repeat

```css
/* 第一个参数是重复的次数，第二个参数是所要重复的值 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}

/* 项目平均分配空间 */
/* 表示比例关系，如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍 */
grid-template-columns: repeat(12, 1fr);
```

##### auto-fill

- 有时单元格的大小是固定的，但是容器的大小不确定
- 如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 auto-fill 关键字表示自动填充

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

##### fr

- 表示比例关系
- 如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

#### grid-row-gap & grid-column-gap & grid-gap

- grid-row-gap 属性设置行与行的间隔（行间距）
- grid-column-gap 属性设置列与列的间隔（列间距）
- grid-gap 属性是 grid-column-gap 和 grid-row-gap 的合并简写形式

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

.container {
  grid-gap: 20px 20px;
}
```

#### grid-auto-flow

- 默认容器排列是先行后列的顺序
- 设置为 `grid-auto-flow: column;` 变成先列后行

```
123
456
789

147
258
369
```

#### justify-items & align-items & place-items

- `justify-items` 属性设置单元格内容的水平位置（左中右）
- `align-item` 属性设置单元格内容的垂直位置（上中下）
- `place-items` 属性是 `align-items` 属性和 `justify-items` 属性的合并简写形式

取值：

- start：对齐单元格的起始边缘
- end：对齐单元格的结束边缘
- center：单元格内部居中
- stretch：拉伸，占满单元格的整个宽度（默认值）

#### justify-content & align-content & place-content

- justify-content 属性是整个内容区域在容器里面的水平位置（左中右）
- align-content 属性是整个内容区域的垂直位置（上中下）
- place-conten 属性是 align-content 属性和 justify-content 属性的合并简写形式

取值：

- start - 对齐容器的起始边框
- end - 对齐容器的结束边框
- center - 容器内部居中
- stretch - 项目大小没有指定时，拉伸占据整个网格容器
- space-around - 每个项目两侧的间隔相等，项目之间的间隔比项目与容器边框的间隔大一倍
- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔
- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔

### 项目属性

#### grid-column & grid-row

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线
- grid-column 属性是 grid-column-start 和 grid-column-end 的合并简写形式
- grid-row 属性是 grid-row-start 属性和 grid-row-end 的合并简写形式

```css
/* 1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线 */
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

#### justify-self & align-self & place-self

- justify-self 属性设置单元格内容的水平位置（左中右），跟 justify-items 属性的用法完全一致，但只作用于单个项目
- align-self 属性设置单元格内容的垂直位置（上中下），跟 align-items 属性的用法完全一致，也是只作用于单个项目
- place-self 属性是 align-self 属性和 justify-self 属性的合并简写形式

取值：

- start：对齐单元格的起始边缘
- end：对齐单元格的结束边缘
- center：单元格内部居中
- stretch：拉伸，占满单元格的整个宽度（默认值）

## CSS3 动画

### 理论知识

- 移动端过度时长通常是 300ms
- 幅度大、复杂的、全屏过度动画可达 375ms
- 元素进入屏幕需要时长为 225ms
- 元素离开屏幕需要时长为 195ms
- 超过 400ms 的过度动画会让人感觉太慢
- 平板要比手机多 30% 的时间

### transition

CSS 的 transition 允许 CSS 的属性值在一定的时间区间内平滑地过渡。

- transition-property: 属性
- transition-duration: 间隔
- transition-timing-function: 曲线
- transition-delay: 延迟
- 常用钩子: transitionend

#### transition-property（样式名）

- none：没有属性改变，transition 马上停止执行
- all：所有属性改变，任何属性值变化都执行 transition 效果
- indent：元素属性名

#### transition-duration（持续时间）

单位可以是 s，也可以是 ms。可以连续写两个持续时间，对应两个不同的样式的变换。

```css
transition-duration: 120ms;
transition-duration: 1s, 15s;
```

#### transition-timing-funciton（缓动公式）

根据时间的推进去改变属性值的变换速率，有 6 个可能的值。

- ease：逐渐变慢
- linear：匀速
- ease-in：加速
- ease-out：减速
- ease-in-out：先加速然后减速
- cubic-bezier：自定义时间曲线，特定的 cubic-bezier 曲线，(x1, y1, x2, y2) 四个值特定于曲线上的点 P1 和点 P2，所有值需要在 [0, 1] 区间内，否则无效。

#### transition-delay（延迟多长时间才触发）

可选单位有 s 与 ms。

#### 使用与清除

使用：

它必须放在基于某些延迟触发的伪类或者后来才添加到元素上的类名才有效。

```css
.turner_left:hover,
.turner_right:hover {
  background: rgb(255, 244, 213);
  transition-property: background;
  transition-duration: 100ms;
  transition-timing-funciton: linear;
}
```

清除

```js
const $el = $('test');
['', '-moz-', '-o-', '-webkit-'].forEach((prefix) => {
  $el.style.removeProperty(prefix + 'transition');
});
```

缺陷：想要清除，必须它是写在标签上的，因此可控度太差。

### animation

#### 使用方法

```css
.shining {
  animation-name: shining;
  animation-duration: 1000ms;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
}
@keyframes shining {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(55, 102, 182, 0.1);
  }

  100% {
    background-color: transparent;
  }
}
```

引入了 Flash 的关键帧概念，细分为 8 个更细的规则。

- animation-name: 动画名称，对应@keyframes
- animation-duration: 间隔
- animation-timing-function: 曲线
- animation-delay: 延迟
- animation-iteration-count: 次数
  - infinite: 循环动画
- animation-direction: 方向
  - alternate: 反向播放
- animation-fill-mode: 静止模式
  - forwards: 停止时，保留最后一帧
  - backwards: 停止时，回到第一帧
  - both: 同时运用 forwards / backwards
- 常用钩子: animationend

#### animation-name（关键帧样式规则的名字）

关键帧样式规则的名字，关键帧样式规则即以 @keyframes 开头的样式规则，animation-name 可以对应多个关键帧样式规则名。

#### animation-duration（动画持续时间）

单位是 s 或者 ms。

#### animation-timing-function（缓动公式）

根据时间的推进去改变属性值的变换速率，有 6 个可能的值。

- ease：逐渐变慢
- linear：匀速
- ease-in：加速
- ease-out：减速
- ease-in-out：先加速然后减速
- cubic-bezier：自定义时间曲线，特定的 cubic-bezier 曲线，(x1, y1, x2, y2) 四个值特定于曲线上的点 P1 和点 P2，所有值需要在 [0, 1] 区间内，否则无效。

#### animation-delay（延迟多久才开始）

此时间不计入 animation-duration。

#### animation-iteration-count（动画播放次数）

可以是正整数或者 infinite，默认只执行一次。

#### animation-direction（动画执行的方向）

有四个值：

- normal：从第一帧开始
- alternate：animation-iteration-cout 大于 1 的时候生效，像摆钟一样从 0% ~ 100%，下次用 100% ~ 0%
- reverse：每次都是用 100% 开始
- alternate-reverse：animation-iteration-cout 大于 1 的时候生效，像摆钟一样从 100% ~ 0%，下次用 0% ~ 100%

#### animation-fill-mode（执行后状态）

- backwards: 此前的状态
- forwards: 保持动画前的状态

#### animation-play-state（暂停或继续动画）

## 水平垂直居中的 10 种方式

居中元素定宽高：

- absolute + 负 margin
- absolute + margin auto
- absolute + calc

居中元素不定宽高：

- absolute + transform
- lineheight
- writing-mode
- table
- css-table
- flex
- grid

## translateZ 硬件加速原理

使用 transform 和 opacity 做 CSS 动画的时候，会将元素提升为一个复合层；而使用 JS 操作 CSS 属性做动画时，必须使用 translateZ 或 will-change 才能将元素强行提升至一个复合层。

https://segmentfault.com/q/1010000007962353/a-1020000007986863

## 滚动条样式

- ::-webkit-scrollbar — 整个滚动条
- ::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头)
- ::-webkit-scrollbar-thumb — 滚动条上的滚动滑块.
- ::-webkit-scrollbar-track — 滚动条轨道
- ::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分
- ::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分
- ::-webkit-resizer — 某些元素的 corner 部分的部分样式(例:textarea 的可拖动按钮)

```css
.custom-scrollbar {
  height: 70px;
  overflow-y: scroll;
}
/* 整个滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
/* 滚动条的轨道 */
.custom-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条的滑块 */
.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
```

## 响应式设计

- 图片宽度
  - `width: 100%` 在屏幕过宽的时候很难看
  - `max-width: 100%` 在宽屏环境下最大只会到达图片自身宽度的 100%。
- 媒体查询
  - 根据屏幕宽度来写不同的 CSS 代码：`@media (min-width: 50rem) {}`

### 媒体查询

#### 控制属性

```css
.CardLink:before {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

@media (min-width: 300px) {
  .CardLink:before {
    display: block;
  }
}
```

#### html 条件判断

```html
<link rel="stylesheet" media="(min-width: 300px)" href="w300.css" />
<link rel="stylesheet" media="(min-width: 600px)" href="w600.css" />
<link rel="stylesheet" media="(min-width: 900px)" href="w900.css" />
```

## 命名冲突的解决

- Scss
- React CSS Module，自动加 hash

## CSS 3D

参考地址：[WebGL 入门与实践](https://juejin.im/book/5baaf635f265da0ab915cc9f/section/5c0944f05188254446129f1c#heading-0)

### 3D 属性

- transform：对 DOM 进行变换，相当于 WebGL 中对模型进行的变换
- transform-origin：设置变换的中心点
- perspective-origin：视点，相当于 WebGL 中摄像机的 X、Y 轴坐标
- perspective：视距，启用该属性相当于在 WebGL 中设置摄像机和 DOM 元素之间在 Z 轴方向上的距离，设置该属性不等于 0 时会自动启用透视投影效果
- transform-style：是否启用 3D 变换
- backface-visibility：背面是否可见

### transform

经常使用它进行

- 实现一像素的边框
- 容器或者内容的水平、垂直居中
- 现强制 GPU 渲染，提升动画性能

基本属性

- translate
- rotate
- skew
- scale

3D 变化属性

- translate3d
- rotate3d
- scale3d

#### translate

```css
/* 分别沿 X 轴和 Y 轴平移 30 px。*/
transform: translate(30px, 30px);
/* 分别沿 X 轴、 Y 轴、Z 轴平移 30 px。*/
transform: translate3d(30px, 30px, 30px);
/* 沿 X 轴平移 30 px。*/
transform: translateX(30px);
/* 沿 Y 轴平移 30 px。*/
transform: translateY(30px);
/* 沿 Z 轴平移 30 px。*/
transform: translateZ(30px);
```

#### rotate3d

```css
/*绕 X 轴旋转 45 deg。*/
transform: rotate(45deg);
/* 将第一个参数设置为 1， 代表绕 X 轴旋转 45 deg。*/
transform: rotate3d(1, 0, 0, 45deg);
/* 将第二个参数设置为 1， 代表绕 Y 轴旋转 45 deg。*/
transform: rotate3d(0, 1, 0, 45deg);
/* 将第三个参数设置为 1， 代表绕 Y 轴旋转 45 deg。*/
transform: rotate3d(0, 0, 1, 45deg);
/* 将三个参数都设置为 1， 代表绕 Y 轴旋转 45 deg。*/
transform: rotateZ(45deg);
```

```css
.box {
  animation: rotate 3s infinite linear;
}
@keyframes rotate {
  0% {
    transform: rotate3d(1, 1, 1, 0deg);
  }
  100% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
}
```

#### transform-origin

- 默认的旋转是绕着模型的中心位置进行的，这个位置是浏览器默认的
- CSS 提供了对变换中心的设置功能，通过设置 transform-origin 来实现

```css
/*
我们让一个 DOM 元素沿着上边沿进行进行旋转
只需要将 transform-origin 的 Y 轴分量设置为 0% 或者 0 即可
*/
transform-origin: 50% 0%;
transform: rotateX(90deg);
```

#### scale3d

```css
/* 沿 X 轴和 Y 轴 放大两倍。*/
transform: scale(2);
/* 沿 X 轴方向当大 3 倍，沿 Y 轴方向放大 2 倍。*/
transform: scale(3, 2);
/* 分别在 X 、Y、 Z 轴方向放大 2倍、3倍、4倍。*/
transform: scale3d(2, 3, 4);
/* 在 X 轴方向放大两倍。*/
transform: scaleX(2);
/* 在 Y 轴方向放大两倍。*/
transform: scaleY(2);
```

#### 组合变换

- transform 后的多个变换要用空格分开
- 一个变换都是基于前一个变换后的新坐标系进行，也称动态坐标系变换

```css
transform: rotateX(60deg) rotateY(60deg);
```

### perspective

- transform-style：子元素变换的表现形式
  - 默认是 2D 平面展示
  - transform-style 属性设置为 preserve-3d 为 3D
  - 这个属性设立在元素所在的舞台上：`.img-wrapper{}`
- perspective：视距
  - perspective 用来设置观察点在 Z 轴方向的位置，默认时观察点在元素中心，即 z = 0 位置
  - 改变了观察点距离元素的 Z 轴距离
  - 使得子元素的 3D 变换产生透视效果
  - perspective 这个属性也是在舞台上设置的
- perspective-origin：视点位置
  - 设置观察点在 X、Y 轴的偏移，即屏幕的左右、上下方向
  - 该属性的默认值是 （50%，50%），在舞台 DOM 的中心位置
- backface-visibility：背面是否可见

## 径向渐变

### 容器宽高椭圆渐变

```css
.radial-gradient {
  width: 400px;
  height: 200px;
  background: radial-gradient(yellow, red);
}
```

### 圆形渐变

```css
/* 圆心是渐变起点，按照中心点到最远边角作为渐变半径 */
.radial-gradient {
  width: 400px;
  height: 200px;
  background: radial-gradient(circle, yellow, red);
}

/* 指定渐变圆心 */
.radial-gradient {
  width: 400px;
  height: 200px;
  background: radial-gradient(circle at 12.5% 25%, yellow, red);
}

/* 指定渐变终止点位置 */
/* closest-side	渐变中心距离容器最近的边作为终止位置。 */
/* closest-corner	渐变中心距离容器最近的角作为终止位置。 */
/* farthest-side	渐变中心距离容器最远的边作为终止位置。 */
/* farthest-corner	渐变中心距离容器最远的角作为终止位置。默认 */
.radial-gradient {
  width: 400px;
  height: 200px;
  background: radial-gradient(closest-side circle at 50px 50px, yellow, red);
}
```

# CSS 小抄

## 视频全屏播放

- 一般来 H5 视频内容比例是 16：9 那么针对其他比例的手机,就需要根据屏幕宽度高度计算，以最大边撑满，然后再另一方向上居中
- 使用 Html5 video 标签 css 样式 `object-fit:cover` 也可以做到按视频比例撑满全屏幕的效果

## 光标颜色

```css
input {
  color: #fff;
  caret-color: red;
}
```

## 让 HTML 识别 string 里的 '\n' 并换行

```css
body {
  white-space: pre-line;
}
```

## 改变鼠标样式

<iframe height="265" style="width: 100%;" scrolling="no" title="鼠标样式" src="//codepen.io/ringcrl/embed/VOLNXJ/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/VOLNXJ/'>鼠标样式</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 输入框的选中颜色

```css
::selection {
  background-color: rgba(77, 151, 255, 0.25);
}
```

## 为链接添加图标

### Icon Font

```css
/* 为外部链接添加图标指示 */
.external::after {
  /* 在 content 中设置图标字符 */
  /* ！需根据使用的 Icon Font 设置为相应的字符 */
  content: 'open_in_new';
  /* 设置 Icon Font 字体 */
  /* ！需根据使用的 Icon Font 设置为相应的字体 */
  font-family: 'Material Icons';
  /* 为图标设置合适的对齐方式 */
  vertical-align: text-bottom;
  /* 为图标设置合适的字体大小 */
  font-size: 14px;
  /* ... 更多设置 ... */
  /* 拷贝 Icon Font 附带的样式中的更多设置 */
}

/* 为 PDF 链接添加图标指示 */
a.external[href$='.pdf']::after,
a.external[href$='.PDF']::after,
a.external[href*='.pdf?']::after,
a.external[href*='.PDF?']::after,
a.external[href*='.pdf#']::after,
a.external[href$='.PDF#']::after {
  content: 'picture_as_pdf';
}
```

### 图片

```css
/* 为外部链接添加图标指示 */
.external {
  /* 小图标的 url */
  background: url(/url/to/icon.png) center right no-repeat;
  /* 空出小图标的宽度 */
  padding-right: 14px;
}

/* 为 PDF 链接添加图标指示 */
a.external[href$='.pdf'],
a.external[href$='.PDF'],
a.external[href*='.pdf?'],
a.external[href*='.PDF?'],
a.external[href*='.pdf#'],
a.external[href$='.PDF#'] {
  /* 小图标的 url */
  background: url(/url/to/icon.png) center right no-repeat;
  /* 空出小图标的宽度 */
  padding-right: 14px;
}
```

## CSS 的布局模型

- Flow Model：流动模型
  - 块状元素、内联元素以及父子元素的默认展示形式
- Float Model：浮动模型
  - 父元素的高度无法自适应，因为浮动子元素脱离了文档流
- Layer Model：层模型
  - 层模型有 3 中形式，absolute、fixed 可以使元素脱离文档流

## 开启硬件加速

```css
-webkit-transform: translate3d(0, 0, 0);
-moz-transform: translate3d(0, 0, 0);
-ms-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);
```

## 禁止输入框填充颜色

```css
box-shadow: 0 0 0 1000px #fff inset;
-webkit-box-shadow: 0 0 0px 1000px #fff inset;
```

## placeholder 字体大小

```css
::-webkit-input-placeholder {
  font-size: 10pt;
}
```

## iOS 取消图片 3D touch

```css
img {
  -webkit-touch-callout: none;
}
```

## 禁止文本缩放

```css
-webkit-text-size-adjust: 100%;
```

## 清除输入框内阴影

```css
-webkit-appearance: none;
```

## 禁止用户选择

```css
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

## 去除点击样式闪动

```css
-webkit-tap-highlight-color: rgba (255, 255, 255, 0);
-webkit-tap-highlight-color: transparent;
```

## 去除图片底部空白

1. 把图片设为块级元素

```
如：img{display:block;}
```

2. 设置图片的垂直对齐方式

```
如：img{vertical-align:top;}(vartical-align的值可选，text-top，bottom，text-bottom等，视情况而定。)
```

3. 设置父对象的文字大小为 0px

```
如：img 的父对象是 imgClass ，那么只需给 imgClass 加上一个属性 font-size:0px 即可。但是这个会使父对象里的文字无法正常显示。就算文字部分被子对像括起来，设置子对像文字大小依然可以显示，但在CSS效验的时候会提示文字过小的错误。
```

4. 改变父对象的属性

```
如果父对象的高宽固定，图片大小随父对象而定，则可以设置父对象：overflow:hidden;
```

5. 设置图片的浮动属性

```
如：img{float:left;}
```

## 边框阴影

```css
.radius-wrapper {
  border-radius: 4px;
  box-shadow: 1px 1px 1px #dfe2e4;
  border: 1px solid #dfe2e4;
}
```

## 移动端 1px 像素线

```scss
.mod_grid_bottom {
  position: relative;
  border-bottom: none !important;
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    pointer-events: none;
    background-color: #ddd;
    height: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
      -webkit-transform: scaleY(0.5);
      -webkit-transform-origin: 50% 0%;
    }
  }
}
```

## 使用 box-shadow 实现边框样式

```css
.border {
  box-shadow: 0px 0px 0px 3px #4b98eb;
}
.border-inset {
  box-shadow: inset 0px 0px 0px 3px #4b98eb;
}
```

## 自定义滚动条

```css
@mixin scrollbarStyle($width) {
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: $width;
  }
  ::-webkit-scrollbar-track:vertical {
    background-color: #fff;
    &:hover {
      background-color: #e6e7e6;
      -webkit-transition: background-color 1000ms linear;
      -ms-transition: background-color 1000ms linear;
      transition: background-color 1000ms linear;
    }
  }
  /* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb:vertical {
    background-color: #dcdcdc;
    &:hover {
      background-color: #b4b4b4;
      -webkit-transition: background-color 1000ms linear;
      -ms-transition: background-color 1000ms linear;
      transition: background-color 1000ms linear;
    }
  }
  /* 滑块颜色 */
  ::-webkit-scrollbar-button:vertical {
    background-color: #fff;
  }
  /* 滑轨两头的监听按钮颜色 */
  ::-webkit-scrollbar-corner:vertical {
    background-color: #fff;
  }
  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
}
```

<iframe height="265" style="width: 100%;" scrolling="no" title="Scrollbar Padding Right" src="//codepen.io/ringcrl/embed/GLeoNV/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/GLeoNV/'>Scrollbar Padding Right</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## CSS 文字两端对齐

```html
<style>
  div {
    margin: 10px 0;
    width: 100px;
    border: 1px solid red;
    text-align-last: justify;
  }
</style>

<div>姓名</div>
<div>手机号码</div>
<div>验证码</div>
<div>账号</div>
<div>密码</div>
```

## 利用 content 属性 attr 抓取内容

```html
<style>
  div {
    width: 100px;
    border: 1px solid red;
    position: relative;
  }
  div:hover:after {
    content: attr(data-msg);
    position: absolute;
    font-size: 12px;
    width: 200%;
    line-height: 30px;
    text-align: center;
    left: 0;
    top: 25px;
    border: 1px solid green;
  }
</style>

<div data-msg="Open this file in Github Desktop">
  hover
</div>
```

## 边框中部三角形

三角形生成器：http://apps.eky.hk/css-triangle-generator/zh-hant

```scss
.left-side-triangle {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -16px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 15px 15px 0;
    border-color: transparent #efefef transparent transparent;
  }
  &::after {
    content: '';
    position: absolute;
    left: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 15px 15px 0;
    border-color: transparent #fff transparent transparent;
  }
}
```

## 横向带惯性滚动

```scss
.scroll-horizontally-wrap {
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  .container-wrap {
    .container {
      display: inline-block;
      width: 100px;
      .report-cover-wrap {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
```

## 避免横屏切换对字体的调整

```scss
.size-adjust {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
```

## 清除浮动

```scss
.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}
.clearfix::after {
  clear: both;
}
```

## 文字超出省略号

```scss
.overfloat-ellipsis {
  width: 520px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 多行文字超出省略号

```scss
.wrap {
  width: 100%;
  overflow: hidden;
  display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示  *必须结合的属性*
  -webkit-box-orient: vertical; // 设置伸缩盒对象的子元素的排列方式  *必须结合的属性*
  -webkit-line-clamp: 3; // 用来限制在一个块元素中显示的文本的行数
  word-break: break-all; // 让浏览器实现在任意位置的换行 *break-all为允许在单词内换行*
}
```

## 去掉自动填充时候的背景色

```scss
.reset-autofill {
  a,
  input,
  button {
    -webkit-tap-highlight-color: transparent;
  }
  input {
    outline: none;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: 0 0 0px 1000px white inset;
    }
    &:focus {
      outline: none;
    }
  }
}
```

## reset CSS

```sh
yarn add normalize.css

yarn add minireset.css
```

## table 水平垂直居中

```html
<div class="container">
  <div class="center"><span>Centered content</span></div>
</div>
```

```css
.container {
  border: 1px solid #333;
  height: 250px;
  width: 250px;
}
.center {
  display: table;
  height: 100%;
  width: 100%;
}
.center > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

## 长英文单词强制换行

```css
.break-word {
  word-wrap: break-word;
}
```

## 内容为空时候不显示元素

```css
.thing {
  padding: 1rem;
  background-color: violet;
}

.thing:empty {
  display: none;
}
```

## 图片居中

```css
.center-image {
  background: #4a4a4a;
  width: 100px;
  height: 200px;
  border-radius: 4px;
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}
```

## flex-right

```css
.flex-right {
  flex-grow: 1;
  justify-content: flex-end;
}
```

# CSS 参考

## CSS-Inspiration

https://chokcoco.github.io/CSS-Inspiration/#/./init

## CSS-Tricks

https://qishaoxuan.github.io/css_tricks/

## 手写常用动画

https://segmentfault.com/a/1190000010640099

# 综合应用

## SVG 文字动效

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SVG</title>
  </head>

  <body>
    <svg version="1.1" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
      <symbol id="text">
        <text x="10%" y="60%" class="text">腾讯学院</text>
      </symbol>
      <g>
        <use xlink:href="#text" class="use-text"></use>
        <use xlink:href="#text" class="use-text"></use>
        <use xlink:href="#text" class="use-text"></use>
        <use xlink:href="#text" class="use-text"></use>
        <use xlink:href="#text" class="use-text"></use>
      </g>
    </svg>
  </body>
</html>
```

```css
body,
html {
  margin: 0;
  padding: 0;
}

.text {
  font-size: 200px;
  font-family: cursive;
}

svg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.use-text {
  fill: none;
  stroke: white;
  stroke-dashoffset: 35%;
  stroke-dasharray: 0 87.5%;

  stroke-width: 2px;
}

.use-text:nth-child(1) {
  stroke: #360745;
  animation: animation1 8s infinite ease-in-out forwards;
}
.use-text:nth-child(2) {
  stroke: #d61c59;
  animation: animation2 8s infinite ease-in-out forwards;
}
.use-text:nth-child(3) {
  stroke: #e7d84b;
  animation: animation3 8s infinite ease-in-out forwards;
}
.use-text:nth-child(4) {
  stroke: #efeac5;
  animation: animation4 8s infinite ease-in-out forwards;
}
.use-text:nth-child(5) {
  stroke: #1b8798;
  animation: animation5 8s infinite ease-in-out forwards;
}

@keyframes animation1 {
  50% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 7%;
  }
  70% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 7%;
  }
}
@keyframes animation2 {
  50% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 14%;
  }
  70% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 14%;
  }
}
@keyframes animation3 {
  50% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 21%;
  }
  70% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 21%;
  }
}
@keyframes animation4 {
  50% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 28%;
  }
  70% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 28%;
  }
}
@keyframes animation5 {
  50% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 35%;
  }
  70% {
    stroke-dasharray: 7% 28%;
    stroke-dashoffset: 35%;
  }
}
```

## 浮层设计

需求：

- 上下左右居中
- 浮层显示时页面不可滚动
- 浏览器窗口缩小，浮层缩小，最小为 320px；浏览器窗口放大，浮层放大，最大为 650px

技术实现：

- flex、justify-content 左右方向对齐，align-items 垂直方向对齐
- 浮层显示时 body 设置 `overflow: hidden`，浮层关闭时去掉
- 设置宽度 100% 可以根据视窗自动调整，设置 max-width 和 min-width 可以控制最大最小宽度

## 60 帧的动画

渲染和处理 HTML 的时候，有一个关键渲染路径：

样式 => 布局 => 渲染 => 合成

现代浏览器能够通过使用 transform 和 opacity 完美运行 4 种样式。

位置  — transform: translateX(n) translateY(n) translateZ(n);
缩放  — transform: scale(n);
旋转  — transform: rotate(n deg);
透明  — opacity: n;

流畅渲染的核心是：避免在 transitions 中使用 left、top、right、bottom 属性

更多的详细信息：<https://mp.weixin.qq.com/s/rxxZutGCoKnofUTa4WwS5g>

## 两栏布局

左边固定 100px，右边自适应

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .left {
    float: left;
    width: 100px;
    background: red;
  }
  .right {
    margin-left: 100px;
    background: blue;
  }
</style>

<section class="layout">
  <article>
    <div class="left"></div>
    <div class="right"></div>
  </article>
</section>
```

## 三栏布局

其中左栏、右栏宽度各位 300px，中间自适应。浮动、绝对定位、flex、table、网格布局（grid）

各自的优缺点：

- 浮动：兼容性好，但需要注意清除浮动
- 绝对定位：快速，但是已经脱离了文档流，它后面的元素也要跟着绝对定位
- flex：解决上述两个方案的缺陷所出现的，比较好
- table：兼容性非常好，兼容 IE8、邮件等，某个单元格高度超出的时候，会影响到周围的单元格
- 网格布局：标准化之前的各种 hack 方案，就是为了解决这类布局而生的

如果去掉了高度已知，哪个方案还能适用？不能适用的时候怎么改进？

```
1.flex 和 table 还能适用
2.为浮动布局创建 BFC
```

1.浮动

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .layout article > div {
    min-height: 100px;
  }
  .layout.float .left {
    float: left;
    width: 300px;
    background: red;
  }
  .layout.float .right {
    float: right;
    width: 300px;
    background: blue;
  }
  .layout.float .center {
    background: yellow;
  }
</style>

<section class="layout float">
  <article>
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">浮动解决方案</div>
  </article>
</section>
```

2.绝对定位

```html
<style>
  .layout.absolute article > div {
    position: absolute;
  }
  .layout.absolute .left {
    left: 0;
    width: 300px;
    background: red;
  }
  .layout.absolute .center {
    left: 300px;
    right: 300px;
    background: yellow;
  }
  .layout.absolute .right {
    right: 0;
    width: 300px;
    background: blue;
  }
</style>

<section class="layout absolute">
  <article>
    <div class="left"></div>
    <div class="center">绝对定位解决方案</div>
    <div class="right"></div>
  </article>
</section>
```

3.flexbox

```html
<style>
  .layout.flexbox article {
    display: flex;
  }
  .layout.flexbox .left {
    width: 300px;
    background: red;
  }
  .layout.flexbox .center {
    flex: 1;
    background: yellow;
  }
  .layout.flexbox .right {
    width: 300px;
    background: blue;
  }
</style>

<section class="layout flexbox">
  <article>
    <div class="left"></div>
    <div class="center">flexbox</div>
    <div class="right"></div>
  </article>
</section>
```

4.table

```html
<style>
  .layout.table article {
    width: 100%;
    display: table;
    height: 100px;
  }
  .layout.table article > div {
    dispaly: table-cell;
  }
  .layout.table .left {
    width: 300px;
    background: red;
  }
  .layout.table .center {
    background: yellow;
  }
  .layout.table .left {
    width: 300px;
    background: blue;
  }
</style>

<section class="layout table">
  <article>
    <div class="left"></div>
    <div class="center">table</div>
    <div class="right"></div>
  </article>
</section>
```

5.网格布局

```html
<style>
  .layout.grid article {
    display: grid;
    width: 100%;
    grid-template-rows: 100px;
    grid-template-columns: 300px auto 300px;
  }
  .layout.grid .left {
    background: red;
  }
  .layout.grid .center {
    background: yellow;
  }
  .layout.grid .left {
    background: blue;
  }
</style>

<section class="layout grid">
  <article>
    <div class="left"></div>
    <div class="center">网格布局</div>
    <div class="right"></div>
  </article>
</section>
```

## Loading 动画

```html
<style>
  $loader_blue: #5096eb;

  .loader-wrap {
    text-align: center;
    padding: 30px 0;
    .loader {
      position: relative;
      margin: 0 auto;
      width: 50px; // 默认大小，会根据业务需求被组件的 props 覆盖
      &:before {
        content: '';
        display: block;
        padding-top: 100%;
      }
      .circular {
        animation: rotate 2s linear infinite;
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        .path {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
          stroke-linecap: round;
        }
      }
      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
      @keyframes color {
        100%,
        0% {
          stroke: $loader_blue;
        }
        40% {
          stroke: $loader_blue;
        }
        66% {
          stroke: $loader_blue;
        }
        80%,
        90% {
          stroke: $loader_blue;
        }
      }
    }
  }
</style>

<div class="loader-wrap">
  <div class="loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle
        class="path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="8"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
</div>
```

## 全屏居中弹窗

```html
<style>
  .loading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: #fff;
    .pic {
      width: 64px;
      height: 64px;
      border: 1px solid red;
      background: url('images/loading.gif');
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>

<div class="loading">
  <div class="pic"></div>
</div>
```

## 粘附页脚方案

```html
<body>
  <div class="wrapper">
    <header>
      <span>Header</span>
    </header>
    <main>
      <p>我是内容</p>
    </main>
  </div>
  <footer>
    <span>Fotter</span>
  </footer>
</body>
```

```css
* {
  padding: 0;
  margin: 0;
}
header {
  line-height: 80px;
}
header,
footer {
  background-color: #ccc;
  text-align: center;
}
main {
  text-align: center;
  font-size: 30px;
}
```

### 父元素 100% 高

```css
html,
body {
  height: 100%;
}
/*
* 将页面内容最小高度设置为100%，撑满屏幕
* 使用 margin-bottom 负值把页脚吸上来
* 设置底部内边距来填充内容过多时候被遮挡的页脚
*/
.wrapper {
  min-height: 100%;
  height: 100%;
  margin-bottom: -80px;
  padding-bottom: 80px;
  box-sizing: border-box;
}
footer {
  height: 80px;
}
```

### clac 计算

```css
.wrapper {
  min-height: calc(100vh - 80px);
}
footer {
  height: 80px;
}
```

### Flex 粘附页脚

```css
body {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
}
.wrapper {
  flex: 1;
}
```

## iOS 开关

```html
<input type="checkbox" id="toggle" class="offscreen" /> <label for="toggle" class="switch"></label>
```

```css
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
}
.switch::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type='checkbox']:checked + .switch::after {
  transform: translateX(20px);
}
input[type='checkbox']:checked + .switch {
  background-color: #7983ff;
}
.offscreen {
  position: absolute;
  left: -9999px;
}
```

<iframe height="265" style="width: 100%;" scrolling="no" title="iOS 开关效果" src="//codepen.io/ringcrl/embed/oOQaJp/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/oOQaJp/'>iOS 开关效果</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 字跳 CSS 布局

- DIV
  - 垂直居中
  - 距离屏幕左右两边各 10px
  - 高度始终未宽度的 50%
- DIV 中有文本 A
  - fornt-size: 20px
  - 文本水平垂直居中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BOX-A</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        width: 100%;
        height: 100%;
      }

      .box {
        position: relative;
        background: red;
        width: 100%;
        height: 100%;
      }

      .Abox {
        margin-left: 10px;
        width: calc(100vw - 20px);
        height: calc(50vw - 10px);
        position: absolute;
        background: yellow;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <div class="Abox">A</div>
    </div>
  </body>
</html>
```

## Filter 实现局部高斯模糊

```html
<svg>
  <filter id="blur">
    <feGaussianBlur stdDeviation="5" />
  </filter>
</svg>
<a href="#" class="translucent">
  <div class="text">Button</div>
</a>
```

```stylus
body
  background url('http://img.schieb.de/wp-content/uploads/2014/08/osx-yosemite-wallpaper-sunset.jpg') no-repeat 50% 50% fixed
  background-size cover
  font 14px/1.4 Helvetica, Arial, sans-serif
  overflow hidden

.translucent
  position absolute
  display block
  height 100px
  line-height 100px
  top 50%
  left 50%
  text-decoration none
  // 这里继承 body，为了给下面的伪元素使用
  background inherit
  overflow hidden
  &::before
    visibility visible
    content ''
    position absolute
    // 高斯模糊会有周围一圈减弱的效果，要扩大
    width 110%
    height 110%
    top -5%
    bottom -5%
    // 直接继承父元素这一块的位置样式
    background inherit
    filter url('#blur')
  .text
    background rgba(255,255,255, 0.4)
    text-align center
    position relative
    display block
    visibility visible
    color #08c
    font-size 40px
```

<iframe height="265" style="width: 100%;" scrolling="no" title="Filter 实现局部高斯模糊" src="//codepen.io/ringcrl/embed/dLQqgM/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/dLQqgM/'>Filter 实现局部高斯模糊</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

# 总结

## 浏览器渲染过程

- 解析 HTML，构建 DOM Tree
  - Bytes => characters => tokens => nodes => DOM
- 解析 CSS，生成 CSS Tree
  - Bytes => characters => tokens => nodes => CSSOM
- 当遇到 JS 时，DOM 构建过程会被吊起，需要等待 JS 执行完毕，触发 DOMContentLoaded
- 合并 DOM Tree 和 CSS Tree，生成 Render Tree
  - Render Tree 和 DOM Tree 相对应的，但不是严格意义上的一一对应，不可见的 DOM 元素不会插入到 Render Tree 中 `display: none` 等
  - CSS 下载时异步，不会阻塞浏览器构建 DOM 树，但是会阻塞 Render Tree 渲染
  - 对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间
- 回流，负责各元素尺寸、位置的计算
  - 引发回流的原因
    - 页面渲染初始化
    - DOM 结构改变，比如删除了某个节点
    - render 树变化，比如减少了 padding
    - 窗口 resize
    - 获取某些属性
      - offsetTop、offsetLeft、offsetWidth、offsetHeight
      - scrollTop、scrollLeft、scrollWidth、scrollHeight
      - clientTop、clientLeft、clientWidth、clientHeight
      - width、height
      - getComputedStyle()
      - getBoundingClientRect()
  - 减少回流
    - CSS
      - 使用 transform 替代 top
      - 使用 visibility 替换 display: none
      - 避免使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
      - 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上
      - 将频繁重绘或者回流的节点设置为图层，例如 will-change、video、iframe 等
      - CSS3 硬件加速 GPU 加速
    - JS
      - 将样式定义为 class 并一次性更新
      - 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中
      - 避免多次读取 offset 等属性，无法避免则将它们缓存到变量
- 重绘，绘制页面像素信息
  - outline, visibility, color、background-color
- 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上

![06.png](./imgs/06.png)

![07.png](./imgs/07.png)

![08.png](./imgs/08.png)

## 保证可访问性

- 明确需要兼容的版本，对不确定的属性查询 `can i use`
- 有真机使用真机调试，没有的话使用 XCode、Android Studio 下载对应版本调试
- 配置好工程的 CSS、JS 向下兼容：autoprefix、babel

## HTML5 功能

- 传感器功能：deviceorientation、devicemotion
- 音量侦测功能：new AudioContext()

## 了解最新的技术

- 关注图灵社区推送，购买新书
- 关注了 Github 的前端大佬
- Stack Overflow、掘金
- 淘宝 FED、大搜车、美团技术博客

## SPA

- 资源共用
- 局部刷新
- URL 模式
- 用户体验/页面切换快
- 数据传递容易
- 不利于 SEO，可用 SSR 优化
- 初次加载时长
- 路由管理
- 减轻服务器压力
- 前后端职责分离
