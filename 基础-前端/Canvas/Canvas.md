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