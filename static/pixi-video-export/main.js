const app = new PIXI.Application({ transparent: true })
document.body.appendChild(app.view)

// Create play button that can be used to trigger the video
const button = new PIXI.Graphics()
  .beginFill(0x0, 0.5)
  .drawRoundedRect(0, 0, 100, 100, 10)
  .endFill()
  .beginFill(0xffffff)
  .moveTo(36, 30)
  .lineTo(36, 70)
  .lineTo(70, 50)

// Position the button
button.x = (app.screen.width - button.width) / 2
button.y = (app.screen.height - button.height) / 2

// Enable interactivity on the button
button.interactive = true
button.buttonMode = true

// Add to the stage
app.stage.addChild(button)

// Listen for a click/tap event to start playing the video
// this is useful for some mobile platforms. For example:
// ios9 and under cannot render videos in PIXI without a
// polyfill - https://github.com/bfred-it/iphone-inline-video
// ios10 and above require a click/tap event to render videos
// that contain audio in PIXI. Videos with no audio track do
// not have this requirement
button.on('pointertap', onPlayVideo)

function onPlayVideo() {
  // Don't need the button anymore
  button.destroy()

  // create a video texture from a path
  const texture = PIXI.Texture.from('https://vs-cdn.tencent-cloud.com/assets/videos/03.mp4')

  // create a new Sprite using the video texture (yes it's that easy)
  const videoSprite = new PIXI.Sprite(texture)

  // Stetch the fullscreen
  videoSprite.width = app.screen.width
  videoSprite.height = app.screen.height

  app.stage.addChild(videoSprite)
}

// const { createFFmpeg, fetchFile } = (window as any).FFmpeg
// const ffmpeg = createFFmpeg({ log: true })
// ffmpeg.load()
// ;(window as any).ffmpeg = ffmpeg
// const exportNum = 0
// const blobList = []

// const readFromBlobOrFile = blob => new Promise((resolve, reject) => {
//     const fileReader = new FileReader()
//     fileReader.onload = () => {
//       resolve(fileReader.result)
//     }
//     fileReader.onerror = ({
//       target: {
//         error: { code },
//       },
//     }) => {
//       reject(Error(`File could not be read! Code=${code}`))
//     }
//     fileReader.readAsArrayBuffer(blob)
//   })

//   // 打开新窗口
// function openNewWindow(url: string) {
//   const tempLink = document.createElement('a')
//   tempLink.style.display = 'none'
//   tempLink.href = url
//   tempLink.download = '测试下载'

//   // Safari thinks _blank anchor are pop ups. We only want to set _blank
//   // target if the browser does not support the HTML5 download attribute.
//   // This allows you to download files in desktop safari if pop up blocking
//   // is enabled.
//   tempLink.setAttribute('target', '_blank')

//   document.body.appendChild(tempLink)
//   tempLink.click()
//   document.body.removeChild(tempLink)
// }

// async function exportFunc() {
//   let index = 0
//   for (const blob of blobList.filter(_ => _)) {
//     const data = await readFromBlobOrFile(blob)
//     let formatNum = String(index)
//     if (formatNum.length === 1) {
//       formatNum = `00${formatNum}`
//     } else if (formatNum.length === 2) {
//       formatNum = `0${formatNum}`
//     }
//     const name = `tmp.00${formatNum}.png`
//     debug('name', name)
//     ffmpeg.FS('writeFile', name, new Uint8Array(data))
//     index++
//   }

//   // FIXME: test ffmpeg
//   ffmpeg.FS('writeFile', 'audio.ogg', await fetchFile('/audio.ogg'))
//   await ffmpeg.run(
//     '-framerate',
//     '30',
//     '-pattern_type',
//     'glob',
//     '-i',
//     '*.png',
//     '-i',
//     'audio.ogg',
//     '-c:a',
//     'copy',
//     '-shortest',
//     '-c:v',
//     'libx264',
//     '-pix_fmt',
//     'yuv420p',
//     'out.mp4'
//   )
//   const data = ffmpeg.FS('readFile', 'out.mp4')
//   openNewWindow(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })))
// }

// // FIXME: 测试写入 FFMPEG
// const callBack = frame => blob => {
//   debug('frame', frame)
//   blobList[frame] = blob
// }
// app.view.toBlob(callBack(frame))
