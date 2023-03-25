const fs = require('fs')
const path = require('path')

const jimp = require('jimp')
const pixelmatch = require('pixelmatch')

const IMG_PATH = path.resolve(__dirname, './imgs')

const snapshotPic1Path = path.join(IMG_PATH, 'pixi02-SimHei_0_0.png')
const snapshotPic2Path = path.join(IMG_PATH, 'pixi02-SimHei_1_0.png')
const diffPicPath = path.join(IMG_PATH, 'diff.png');

(async () => {
  const expectDiffRate = 0.001
  const actual = (await jimp.read(fs.readFileSync(snapshotPic1Path))).bitmap
  const expected = (await jimp.read(fs.readFileSync(snapshotPic2Path))).bitmap
  const diff = actual
  const { width, height } = actual
  const failPixel = pixelmatch(expected.data, actual.data, diff.data, width, height, {
    diffMask: true
  })

  const failRate = failPixel / (width * height)

  if (failRate >= expectDiffRate) {
    (await jimp.read(diff)).scale(1).quality(100).write(diffPicPath)
    console.log(`create diff image at: ${diffPicPath}`)
  } else {
    console.log('pass')
  }
})()
