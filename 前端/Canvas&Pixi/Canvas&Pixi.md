# Canvas

## 判断点击事件

```js
function getEventPosition(ev) {
  let x, y
  if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX
    y = ev.layerY
  } else if (ev.offsetX || ev.offsetX == 0) {
    x = ev.offsetX
    y = ev.offsetY
  }
  return { x: x, y: y }
}
```

## isPointInPath

isPointInPath() 只能判断事件对象的位置是否在最后一个绘制的图形上，而之前绘制的图形已经无法判断

```js
cvs = document.getElementById('mycanvas');
ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.rect(10, 10, 100, 100);
ctx.stroke();
ctx.isPointInPath(20, 20);     //true
ctx.beginPath();
ctx.rect(110, 110, 100, 100);
ctx.stroke();
ctx.isPointInPath(150, 150);     //true
ctx.isPointInPath(20, 20);     //false
```

## 加载图片

```js
ctx.clearRect(0, 0, canvas.width, canvas.height)
const image = new Image()
image.onload = () => {
  ctx.drawImage(image, left, top, width, height)
}
image.src = src
```

## 计算文字宽度长度

```js
/**
 * Measure some text using a canvas in-memory.
 * Does not exist in Blockly, but needed in scratch-blocks
 * @param {string} fontSize E.g., '10pt'
 * @param {string} fontFamily E.g., 'Arial'
 * @param {string} fontWeight E.g., '600'
 * @param {string} text The actual text to measure
 * @return {number} Width of the text in px.
 * @package
 */
function measureText(fontSize, fontFamily, fontWeight, text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = fontWeight + ' ' + fontSize + ' ' + fontFamily;
  return context.measureText(text).width;
}
```

## 生成 Canvas 指纹

由于 Cookie 被禁用，所以需要通过一些方法来获取浏览器指纹，来标识唯一用户

```js
function getCanvasFinger() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = '18pt Arial'
  ctx.textBaseline = 'top'
  ctx.fillText('canvas-fingerprint', 2, 2)
  return canvas.toDataURL('image/jpeg')
}
```

# Pixi

## Renderer

antialias：默认 false，反锯齿

preserveDrawingBuffer：默认 false，需要 HTMLCanvasElement.toDataURL() 保存图片的时候，使用默认预设会没有画面

backgroundColor：0x000000~0xffffff，背景颜色

transparent：默认 false，背景透明

## Container

```js
const container = new PIXI.Container();

// 属性
container.rotation = 90 * (Math.PI / 180); // 角度转弧度

container.position.x = 0 // 默认左上角 0，0 位置

container.pivot = 1 // 改变 piviot，子 container 的显示位置会改变

// 方法
container.addChild(child); // 插入子 container
container.addChildAt(child, index); // 插入子 container 的时候指定层级

container.getChildAt(index); // 根据 index 取子 container
container.getChildIndex(child); // 根据子 container 获取层级

container.setChildIndex(child, index); // 设置 container 层级
```

### 设置互动

```js
const bunny = PIXI.Sprite.fromImage('assets/basics/bunny.png')
app.stage.addChild(bunny)

bunny.interactive = true // 设置可以互动
bunny.buttonMode = true // 鼠标滑过的时候显示手指
bunny.click = function () {
  alert('click bunny')
}
```

## Graphics

PIXI.Graphics 继承自 PixiJS.Container

```js
const testGraphics = new PIXI.Graphics();

// 方法
testGraphics.moveTo() // 设置起点
testGraphics.lineTo() // 画线
testGraphics.beginFill() // 设置填满的颜色与透明度
testGraphics.endFill() // 取消颜色填充
testGraphics.lineStyle() // 设置线段宽度、颜色、透明度
testGraphics.clear() // 会清除掉 graphicsData，但不会影响本身的 children
testGraphics.clone() // 会复制 graphicsData，但不会包含本身的 children

// 画两个方块
testGraphics.beginFill(0xff0000);
testGraphics.drawRect(0, 0, 100, 100); // 红色方块
testGraphics.endFill();
console.log(testGraphics.graphicsData); // [t]
testGraphics.beginFill(0xff9900);
testGraphics.drawRect(0, 110, 100, 100); // 另一个红色方块
testGraphics.endFill();
console.log(testGraphics.graphicsData); // [t, t]

// 预置形状
testGraphics.drawCircle()
testGraphics.drawEllipse()
testGraphics.drawPolygon()
testGraphics.drawRect()
testGraphics.drawRoundedRect()
testGraphics.drawShape()
```

## Ticker

```js
const ticker = PIXI.Ticker.shared;

// 属性
ticker.started = false // ticker 是否开启
ticker.speed = 2; // 大约 120 FPS

// 方法
ticker.add()
ticker.addOnce()
ticker.start()
ticker.stop()
```

