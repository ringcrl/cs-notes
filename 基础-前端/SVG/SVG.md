[《SVG 精髓实例》](https://github.com/oreillymedia/svg-essentials-examples)

# 坐标系统

## viewBox

viewBox 代表想要叠加在视口上的用户坐标系统：

- 最小 x 坐标
- 最小 y 坐标
- 宽度
- 高度

## translate变换

看个栗子：<http://oreillymedia.github.io/svg-essentials-examples/ch06/translate.html>

translate 声明会获取整个网格，然后把它移动到画布的新位置，而不是移动正方形。就正方形而言，它仍然绘制在左上角 (0, 0) 处。乍看之下，使用 translate 似乎荒谬且低效，如同通过移动整个起居室、墙壁以及所有东西到新的位置，从而让沙发远离房子的外墙。事实上，如果 translation 是唯一可用的变 换，那么移动整个坐标系统将是一种浪费。但是，我们很快会看到，如果要对整个坐标系统应用其他的变换或者一系列变换的组合，那么从数学和概念上讲，这样做会更方便。

## scale变换

网格并没有被移动，坐标系统的点 (0, 0) 仍然在相同的位置，但是每个用户坐标都变成原 来的两倍了。从网格线上可以看到，矩形的左上角在更大的新网格中仍然在 (10, 10) 位置， 因为对象并没有移动。这也解释了为什么较大正方形的轮廓线更粗了。stroke-width 仍然 是一个用户单位，但是这个单位已经是原来的两倍了，因此其笔画变粗了。

```html
<svg width="200px" height="200px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <g id="square">
  <rect x="10" y="10" width="20" height="20" style="fill: none; stroke: black;"/> </g>
  <use xlink:href="#square" transform="scale(2)"/>
</svg>
```

缩放变换永远不会改变图形对象的网格坐标或者它的笔画宽度，但是，它会改变对应画布上的坐标系统(网格)的大小。

![02.png](https://qiniu.chenng.cn/2019-02-07-23-52-59.png)

# 基本形状

- `<svg>` 包裹并定义整个矢量图
- `<line>` 创建一条直线
- `<polyline>` 创建折线，非闭合
- `<polygon>` 创建多边形，闭合
- `<rect>` 创建矩形
- `<ellipse>` 创建圆和椭圆
- `<path>` 通过指定点以及点和点之间的线来创建任意形状
- `<defs>` 定义一个可复用的图形，初始情况下 `<defs>` 里面的内容是不可见的
- `<g>` 将多种形状组合起来。将组合后的形状置于 `<defs>` 中可以让它能够被复用
- `<symbol>` 类似于一个组合，但是拥有一些额外的特性。通常被置于 `<defs>` 标签中便于复用
- `<use>` 获取在 `<defs>` 中定义的复用对象并在 SVG 中显示出来

## 形状

| 形状     | 描述                                         |
| -------- | -------------------------------------------- |
| line     | 直线：x1、y1、x2、y2                         |
| rect     | 矩形：x、y、width、height                    |
| circle   | 圆形：cx、cy、r                              |
| ellipse  | 椭圆：cx、cy、rx(x 方向半径)、ry(y 方向半径) |
| polygon  | 封闭图形：points(一系列 x/y 坐标)            |
| polyline | 相连折线段：points(一些列 x/y 坐标)          |

## 画笔特性

| 属性              | 值                                                    |
| ----------------- | ----------------------------------------------------- |
| stroke            | 画笔颜色，默认为 none                                 |
| stroke-width      | 画笔宽度，默认为 1                                    |
| stroke-opacity    | 0.0 完全透明，1.0 完全不透明（默认）                  |
| stroke-dasharray  | 虚线间距，默认为 none                                 |
| stroke-linecap    | 线头尾形状，butt（默认）、round、square               |
| stroke-linejoin   | 圆形的棱角，miter（尖的，默认）、round、bevel（平的） |
| stroke-miterlimit | 相交处显示宽度与线宽最大比例，默认为 4                |

### stroke-dasharray

- 绘制点线或虚线
- 值由一系列数字构成，代表线的长度和空隙的长度，数字之间用空格分割
- 数字的个数应为偶数，如果是奇数，SVG 会重复一次使得总个数为偶数

```xml
<!-- 5 个像素虚线，3 个像素空隙，9 个像素虚线，2 个像素空隙 -->
<line x1="10" y1="20" x2="100" y2="20"
  stroke-dasharray="5 3 9 2"
  stroke="black"
  stroke-width="2"
/>
```

## 填充特性

| 属性         | 值                                   |
| ------------ | ------------------------------------ |
| fill         | 默认为 black                         |
| fill-opacity | 0.0 完全透明，1.0 完全不透明（默认） |
| fill-rule    | nonzero（默认值）、evenodd           |

## 椭圆弧

![01.png](https://qiniu.chenng.cn/2019-02-07-23-39-37.png)

以 A（绝对坐标）或 a（相对坐标）开始，后面接 7 个参数：

- 点所在椭圆的 x 半径和 y 半径
- 椭圆的 x 轴旋转角度 x-axis-rotation
- large-arc-flag，如果需要圆弧角度小于 180 度则为 0，需要大于等于 180 度则为 1
- sweep-flag，需要以负角度绘制为 0，以正角度绘制为 1
- 终点的 x 坐标和 y 坐标

```html
<path d="M 125,75 A100,50 0 0,0 225,125"/> <!-- b -->
<path d="M 125,75 A100,50 0 0,1 225,125"/> <!-- c -->
<path d="M 125,75 A100,50 0 1,0 225,125"/> <!-- d -->
<path d="M 125,75 A100,50 0 1,1 225,125"/> <!-- e -->
```

## 文本

```html
<g style="font-size: 14pt;">
  <path d="M 100 10 100 100" style="stroke: gray; fill: none;"/>
  <text x="100" y="30" style="text-anchor: start">Start</text>
  <text x="100" y="60" style="text-anchor: middle">Middle</text>
  <text x="100" y="90" style="text-anchor: end">End</text>
</g>
```

![03.png](https://qiniu.chenng.cn/2019-02-07-23-55-37.png)

### `<tspan>`元素

`<tspan>` 元素可以嵌套在文本内容中， 并可以改变其中文本的样式。

```html
<text x="10" y="30" style="font-size:12pt;">
  Switch among
  <tspan style="font-style:italic">italic</tspan>
  , normal, and
  <tspan style="font-weight:bold">bold</tspan>
  text.
</text>
```

### image

设置 image 的 xlink:href 属性的时候，要指定 namespace：

```js
svg_image_element.setAttributeNS(
  'http://www.w3.org/1999/xlink',
  'xlink:href',
  image_src,
);
```

# filter

## 原理

- 使用了 filter 的 svg们不会将图案直接渲染为最终图形，会渲染图案的像素到临时位图中
- 由 filter 指定的操作会被应用到该临时区域，其结果会被渲染为最终图形
- filter 标记之间就是执行我们想要操作的滤镜基元，每个基元有一个或多个输入，但只有一个输出
- 基元的输入可以是原始图形(SourceGraphic)、图形的不透明度通道(SourceAlpha)、前一个滤镜基元的输出，只有对图形的形状感兴趣而不管颜色时，不透明度通道是有用的，不透明度通道会和颜色相互作用

```html
<filter id="drop-shadow">
  <!-- 这里是滤镜操作 -->
</filter>
<g id="spring-flower" style="url(#drop-shadow);">
  <!-- 这里绘制图形 -->
</g>
```

## 滤镜边界

- 描述该滤镜的剪裁区域
- 默认值 `x="-10%" y="-10%" width="120%" height="120%"`，为滤镜提供了额外的空间，这样造成的投影，产生的输出就会比输入大
- 这些属性是按照滤镜对象的边界框来计算的，即 filterUnits 的 默认值是 objectBoundingBox
- 可以用 primitiveUnits 属性为用于滤镜基元中的单元指定单位，默认值是 userSpaceOnUse，如果设置为 objectBoundingBox，就可以按照图形尺寸的百分比来表示单位

## feGaussianBlur

- in 指定输入源，`SourceAlpha` 指的是原图
- `stdDeviation` 指定模糊度，数值越大越模糊，如果提供两个由空格分割的数字，则分别代表 x 方向、y 方向的模糊度

```xml
<defs>
  <filter id="drop-shadow">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2">
  </filter>
</defs>
<g id="flower" filter="url(#drop-shadow)">
  <!-- 这里绘制花朵 -->
</g>
```

## 存储、连接、合并滤镜

- result 属性指定当前基元的结果，稍后可以通过 `blur` 引用，给定的名称是一个局部名称，只在包含该基元的 `<filter>` 中有效
- `feOffset` 基元接受它的输入，这里就是 Gaussian blur 的返回结果 blur，它的偏移由 dx 和 dy 值指定，将结果位图存储在 `offsetBlur` 名字下面
- `<feMerge>` 基元包裹一个 `<feMergeNode>` 元素列表，其中每个元素都指定一个输入，这些输入按照出现的顺序一个堆叠在另一个上面，这里我们希望 offsetBlur 在原始值 SourceGraphic 下面

```html
<filter id="drop-shadow">
  <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
  <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>
  <feMerge>
    <feMergeNode in="offsetBlur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

## feColorMatrix

- 允许修改任意像素点的颜色或者阿尔法值
- type 属性为 matrix 的时候，values 4 行 5 列，表四行代表计算 R、G、B、A
- 每行中的数字分别乘以输入像素的 R、G、B、A和常量 1（按照列的顺序），得到输出值
- 若不指定 result，表示用作下一个基元的隐形输入

```html
<filter id="glow">
  <feColorMatrix type="matrix"
    values=
        "0 0 0 0   0
          0 0 0 0.9 0 
          0 0 0 0.9 0 
          0 0 0 1   0"/>
  <feGaussianBlur stdDeviation="2.5"
    result="coloredBlur"/>
  <feMerge>
    <feMergeNode in="coloredBlur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

![04.png](https://qiniu.chenng.cn/2019-04-28-16-45-19.png)

## feComponentTransfer

- 提供一种更方便、更灵活的方式来单独操作每个颜色分量
    - 可以让蓝色更亮，也可以通过增加绿色和红色级别让它没那么强烈
- 通过内置 feFuncR、 feFuncG、feFuncB、feFuncA 调整红绿蓝和阿尔法的级别
    - 每个元素可以指定一个 type 说明如何修改该通道，所有结果大于 1.0 被减少为 1.0，小于 0 被调整为 0
        - linear：把当前颜色值分量放到公式 `slope * C + intercept` 中，intercept 为结果提供一个基准值，slope 是一个简单的比例因子。`<feFuncB type="linear" slope="3" intercept="0.2">`
        - table：将颜色值划分为一系列相等的间隔，每个间隙中的值都相应地扩大，类似于最小的四分之一颜色范围的值加倍，下一个四分之一都塞入一个十分之一的范围，保持第三个四分之一的范围不变，最后一个四分之一的值塞入剩下的 15% 的颜色范围中 `<feFuncG type="table" tableValues="0.0, 0.5, 0.6, 0.85, 1.0" />`

## feComposite

- 接受两个输入源，分别指定在 in 和 in2 属性中
- operator 属性用于设置如何合并这两个输入源
    - over：`<feComposite operator="over" in="A" in2="B" />` 生成的结果 A 层叠在 B 上面，`<feMergeNode>` 仅仅是制定 over 操作的 `feComposite` 元素的一种便利的快捷方式
    - in：`<feComposite operator="in" in="A" in2="B" />` 结果是 A 的一部分重叠在 B 的不透明区域，类似于蒙版效果，但这个蒙版仅仅基于 B 的阿尔法通道，而不是它的颜色亮度
    - out：`<feComposite operator="out" in="A" in2="B" />`，结果是 A 的一部分位于 B 的不透明区域的外部
    - atop：`feComposite operator="atop" in="A" in2="B" />`，结果是 A 的一部分位于 B 里面，B 的一部分在 A 外面
    - xor：`<feComposite operator="xor" in="A" in2="B" />`，结果包含位于 B 的外面的 A 的部分和位于 A 的外面的 B 的部分

## feBlend

- 接受两个输入源，分别指定在 in 和 in2 属性中
- mode 属性用于设置如何混合输入源
    - normal：只有 B
    - multiply：对于每个颜色通道，将 A 的值和 B 的值想成，由于颜色值在 0~1 之间，相乘会让它们更小，这会加深颜色，如果某个颜色是白色则没有效果
    - screen：把每个通道的颜色值加载一起，然后减去它们乘积，明亮颜色或者浅色往往回避暗色占优势，但相似亮度的颜色会被合并
    - darken：取 A 和 B 的每个通道的最小值，颜色较暗
    - lighten：提取 A 和 B 的每个通道的最大值，颜色较亮

## feFlood 和 feTile

- feFlood 提供一个纯色区域用于组合或者合并，提供 flood-color 和 flood-opacity 属性
- feTile 提取输入信息作为团，然后横向和纵向平铺填充滤镜指定的区域

## filter 动画

- 通过 attributeName 指定变化的属性，from、to、begin、dur 指定变化的值

```html
<feGaussianBlur result="outShadowAnimate" in="outColor" stdDeviation="3">
  <animate id="increase" attributeType="XML" attributeName="stdDeviation" from="3" to="10" begin="0s;decrease.end" dur="0.4s" />
  <animate id="decrease" attributeType="XML" attributeName="stdDeviation" from="10" to="3" begin="increase.end" dur="0.4s" />
</feGaussianBlur>
```

# 动画

## animate 基础

- attributeName：动画中应该持续改变的值，例子中是 width
- attributeType：width 属性是一个 XML 属性，另一个常用的 attributeType 值是 CSS，表示想要改变的属性是一个 CSS 属性，如果忽略这个属性，默认值是 auto，先搜索 CSS 才到 XML
- from、to：起始与结束值
- begin、dur：开始时间与持续时间，单位是 s
- fill：动画结束后的表现，`freeze` 是冻结为 to 值，告诉动画引擎如何填补剩下的时间，默认值是 `remove`，回到初始值

```xml
<?xml version="1.0"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
    "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">

<svg width="250" height="50">
<title>Shrinking Rectangle</title>
<desc>Animating the width attribute of a rectangle</desc>

<rect x="10" y="10" width="200" height="20" stroke="black" fill="none">
  <animate id="animation"
    attributeName="width"
    attributeType="XML"
    from="200" to="20"
    begin="0s" dur="5s"
    fill="freeze" />
</rect>

</svg>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="animate" src="//codepen.io/ringcrl/embed/PgLWXL/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/PgLWXL/'>animate</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 同步并列动画

- begin 可以使用 `id.end` 的形式，在某一个动画结束的时候开启

```xml
<svg width="200" height="200">
<circle cx="60" cy="60" r="30" style="fill: #f9f; stroke: gray;">
  <animate id="c1" attributeName="r" attributeType="XML"
    begin="0s" dur="4s" from="30" to="10" fill="freeze"/>
</circle>

<circle cx="120" cy="60" r="10" style="fill: #9f9; stroke: gray;">
  <animate attributeName="r" attributeType="XML"
    begin="c1.end + 2s" dur="4s" from="10" to="30" fill="freeze"/>
</circle>
</svg>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="同步并列动画" src="//codepen.io/ringcrl/embed/OGqpJe/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/OGqpJe/'>同步并列动画</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 重复循环

- repeatCount 整型值，指定动画重复多少次
- repeatDur 指定重复执行的时长
- 如果要无限循环，里面的值设为 indefinite

```xml
<svg width="350" height="120">
  <circle cx="60" cy="60" r="30" style="fill: none; stroke: red;">
    <animate attributeName="cx" attributeType="XML"
      begin="0s" dur="5s" repeatCount="2"
      from="60" to="260" fill="freeze"/>
  </circle>

  <circle cx="260" cy="90" r="30" style="fill: #ccf; stroke: black;">
    <animate attributeName="cx" attributeType="XML"
      begin="0s" dur="5s" repeatDur="8s"
      from="260" to="60" fill="freeze"/>
  </circle>
</svg>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="循环动画" src="//codepen.io/ringcrl/embed/ROdpad/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ringcrl/pen/ROdpad/'>循环动画</a> by ringcrl
  (<a href='https://codepen.io/ringcrl'>@ringcrl</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

# 实践

## fill 与 fill-opacity

- 不要直接使用 `fill: rgba`，会导致一些 SVG 库表现异常
- 使用 `fill-opacity` 设置透明度

## SVG 雪碧图

利用 SVG 的 symbol 以及 use：

首先将所有的图标汇集在同一个 svg 文件里面，内容格式如下

```html
<symbol xmlns="http://www.w3.org/2000/svg" id="new_tap" viewBox="0 0 24 24">
    <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z"/>
        <path fill="#FFF" fill-rule="nonzero" d="M12 12.866V ..."/>
    </g>
</symbol>
<symbol xmlns="http://www.w3.org/2000/svg" id="new_start" viewBox="0 0 24 24">
    <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z"/>
        <path fill="#FFF" fill-rule="nonzero" d="M6.375 18C4.5..."/>
    </g>
</symbol>
```

每一个图标由一层 symbol 包着，并赋予相应的 id。以后由新的图标就以同样的方式加进这个文件内

构建 FieldIcon 时使用 use 标签而不是 image 标签

```html
<!-- 原来 -->
<image height="36px" width="36px" class="blocklyTypeIcon" xlink:href="https://static.codemao.cn/kitten/blocks/new_start.svg"></image>

<!-- SVG 雪碧图版本 -->
<use height="36px" width="36px" class="blocklyTypeIcon" xlink:href="#new_start"></use>
```

## 半包围高亮

```css
stroke-dasharray: 107;
stroke-dashoffset: -34;
stroke-linecap: round;
```
