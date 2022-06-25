// 比对两个视频差异，生成比对文本和比对视频
// node ./video-diff --v1=path_to_video_1 --v2=path_to_video_2

const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const glob = require('glob')
const jimp = require('jimp')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch')
const os = require('os')
const request = require('request')
const isUrl = require('validator/lib/isURL')
const argv = require('minimist')(process.argv.slice(2))

const { v1, v2 } = argv

let exportWidth = 0
let exportHeight = 0

const framesVideo1Dir = path.resolve(__dirname, './cache/framesVideo1')
const framesVideo2Dir = path.resolve(__dirname, './cache/framesVideo2')
const framesDiffDir = path.resolve(__dirname, './cache/framesDiff')
const diffVideoOutputPath = path.resolve(__dirname, './cache/diff.mp4')
const reportTxtPath = path.resolve(__dirname, './cache/report.txt')
const downloadPath = path.resolve(__dirname, './cache/download')

cp.execSync(`rm -rf ${framesVideo1Dir}`)
cp.execSync(`rm -rf ${framesVideo2Dir}`)
cp.execSync(`rm -rf ${framesDiffDir}`)
cp.execSync(`rm -rf ${reportTxtPath}`)
cp.execSync(`rm -rf ${downloadPath}`)
cp.execSync(`mkdir -p ${framesVideo1Dir}`)
cp.execSync(`mkdir -p ${framesVideo2Dir}`)
cp.execSync(`mkdir -p ${framesDiffDir}`)
cp.execSync(`mkdir -p ${downloadPath}`)

async function videoDiff (video1Path, video2Path) {
  console.log('正在处理 uri...')
  video1Path = await handlePath(video1Path)
  video2Path = await handlePath(video2Path)

  console.log('正在对两段视频进行抽帧...')
  const promiseVideo1 = extractFramesFromVideo(video1Path, framesVideo1Dir)
  const promiseVideo2 = extractFramesFromVideo(video2Path, framesVideo2Dir)

  await Promise.all([promiseVideo1, promiseVideo2])
  console.log('两段视频抽帧完成，正在进行逐帧像素比对...')

  await generateDiffFrames(framesVideo1Dir, framesVideo2Dir, framesDiffDir)
  console.log('逐帧像素比完成，正在进行最终视频合成...')

  await combineFramesToVideo(framesDiffDir, diffVideoOutputPath)

  console.log('处理完成，查看 output.mp4')
}

async function handlePath (uri) {
  return new Promise((resolve, reject) => {
    try {
      if (!isUrl(uri)) {
        return resolve(uri)
      }

      const postfix = uri.split('.').pop().toLowerCase()
      const fileName = `${Date.now()}.${postfix}`
      const filePath = path.resolve(downloadPath, fileName)
      const stream = fs.createWriteStream(filePath)
      request(uri).pipe(stream).on('close', () => resolve(filePath)).on('error', (err) => reject(err))
    } catch (err) {
      reject(err)
    }
  })
}

async function extractFramesFromVideo (videoPath, distDir) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .outputOptions(['-r 25', '-q:v 2', '-f image2'])
      .output(`${distDir}/%08d.png`)
      .on('end', () => {
        resolve('Finished processing')
      })
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent}% done`)
      })
      .on('start', (commandLine) => {
        console.log(`Spawned Ffmpeg with command: ${commandLine}`)
      })
      .on('error', (err) => {
        reject(err)
      })
      .run()
  })
}

async function generateDiffFrames (framesVideo1Dir, framesVideo2Dir, framesDiffDir) {
  return new Promise(async (resolve) => {
    const dir1Items = glob.sync(`${framesVideo1Dir}/**`)
    const dir1Files = dir1Items.filter((file) => fs.statSync(file).isFile())

    const dir2Items = glob.sync(`${framesVideo2Dir}/**`)
    const dir2Files = dir2Items.filter((file) => fs.statSync(file).isFile())

    let i = 0
    let diffPercentCount = 0
    for (const expectedFilePath of dir1Files) {
      const expectedImg = (await jimp.read(fs.readFileSync(expectedFilePath))).bitmap
      const actualFilePath = dir2Files[i]
      if (!actualFilePath) {
        return resolve()
      }
      const actualImg = (await jimp.read(fs.readFileSync(actualFilePath))).bitmap

      const { width, height } = expectedImg

      if (width !== exportWidth || height !== exportHeight) {
        exportWidth = width
        exportHeight = height
      }

      const diff = new PNG({ width, height })

      const diffPixelCount = pixelmatch(expectedImg.data, actualImg.data, diff.data, width, height, {
        threshold: 0.5,
        includeAA: true,
        alpha: 0.5,
        diffMask: false // 背景是否空白
      })

      const fileName = `0000000000${i}`.slice(-8)

      const diffPercent = diffPixelCount / width / height * 100
      diffPercentCount += diffPercent
      const diffPixelPercent = `${diffPercent}%`
      fs.appendFileSync(reportTxtPath, `${fileName} ${diffPixelPercent}${os.EOL}`)

      fs.writeFileSync(`${framesDiffDir}/${fileName}.png`, PNG.sync.write(diff))
      i += 1
    }

    console.log('平均diff percent', diffPercentCount / i)

    resolve()
  })
}

async function combineFramesToVideo (framesDir, outputPath) {
  return new Promise((resolve, reject) => {
    // ffmpeg -i ./framesDiff/%08d.png -framerate 25 -pixel_format rgba -video_size 1280x720 -hide_banner -map_metadata -1 -map_chapters -1 -c:v libx264 -profile:v main -preset medium -crf 20 -movflags faststart -pix_fmt yuv420p -r 24
    ffmpeg()
      .addInput(`${framesDir}/%08d.png`)
      .inputOptions([
        '-framerate',
        '25',
        // '-vcodec',
        // 'rawvideo',
        '-pixel_format',
        'rgba',
        '-video_size',
        `${exportWidth}x${exportHeight}`
      ])
      .outputOptions([
        '-hide_banner',
        '-map_metadata',
        '-1',
        '-map_chapters',
        '-1',
        '-c:v',
        'libx264',
        '-profile:v',
        'main',
        '-preset',
        'ultrafast',
        '-crf',
        '20',
        '-movflags',
        'faststart',
        '-pix_fmt',
        'yuv420p',
        '-r',
        '24'
      ])
      .output(outputPath)
      .on('start', (commandLine) => {
        console.log(`Spawned Ffmpeg with command: ${commandLine}`)
      })
      .on('end', () => {
        resolve('合成完成')
      })
      .on('error', (err) => {
        reject(err)
      })
      .run()
  })
}

(async () => {
  // const video1 = '/Users/ringcrl/Documents/saga/playground/21-06-17-video-diff/2f21eae0c062c0a960a61966.mp4';
  // const video2 = '/Users/ringcrl/Documents/saga/playground/21-06-17-video-diff/e20a3c7efb223c56ac22e933.mp4';
  videoDiff(v1, v2)
})()
