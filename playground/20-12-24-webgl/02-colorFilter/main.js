// 改进 grey.js，更为通用的颜色处理

import { loadImage, getImageData, traverse } from '../libs/utils.js'
import { grayscale, brightness } from '../libs/colorMaps.js'
import { transformColor } from '../libs/colorMatrix.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');

(async function () {
  // 异步加载图片
  const img = await loadImage('../assets/02.jpg')
  // 获取图片的 imageData 数据对象
  const imageData = getImageData(img)
  // 遍历 imageData 数据对象
  traverse(imageData, ({
    r, g, b, a
  }) => transformColor([r, g, b, a], grayscale(1)))
  // 更新canvas内容
  canvas.width = imageData.width
  canvas.height = imageData.height
  context.putImageData(imageData, 0, 0)
}())
