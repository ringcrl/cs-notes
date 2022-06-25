import { loadImage, getImageData, traverse } from './libs/utils.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');

(async function () {
  // 异步加载图片
  const img = await loadImage('assets/02.jpg')
  // 获取图片的 imageData 数据对象
  const imageData = getImageData(img)
  // 遍历 imageData 数据对象
  traverse(imageData, ({
    r, g, b, a
  }) => { // 对每个像素进行灰度化处理
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return [v, v, v, a]
  })
  // 更新canvas内容
  canvas.width = imageData.width
  canvas.height = imageData.height
  context.putImageData(imageData, 0, 0)
}())
