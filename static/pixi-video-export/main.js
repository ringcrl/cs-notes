const { createFFmpeg, fetchFile } = (window as any).FFmpeg
const ffmpeg = createFFmpeg({ log: true })
ffmpeg.load()
;(window as any).ffmpeg = ffmpeg
const exportNum = 0
const blobList = []
const readFromBlobOrFile = blob => new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = ({
      target: {
        error: { code },
      },
    }) => {
      reject(Error(`File could not be read! Code=${code}`))
    }
    fileReader.readAsArrayBuffer(blob)
  })

  // 打开新窗口
function openNewWindow(url: string) {
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = url
  tempLink.download = '测试下载'

  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  tempLink.setAttribute('target', '_blank')

  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
}


async function exportFunc() {
  let index = 0
  for (const blob of blobList.filter(_ => _)) {
    const data = await readFromBlobOrFile(blob)
    let formatNum = String(index)
    if (formatNum.length === 1) {
      formatNum = `00${formatNum}`
    } else if (formatNum.length === 2) {
      formatNum = `0${formatNum}`
    }
    const name = `tmp.00${formatNum}.png`
    debug('name', name)
    ffmpeg.FS('writeFile', name, new Uint8Array(data))
    index++
  }

  // FIXME: test ffmpeg
  ffmpeg.FS('writeFile', 'audio.ogg', await fetchFile('/audio.ogg'))
  await ffmpeg.run(
    '-framerate',
    '30',
    '-pattern_type',
    'glob',
    '-i',
    '*.png',
    '-i',
    'audio.ogg',
    '-c:a',
    'copy',
    '-shortest',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    'out.mp4'
  )
  const data = ffmpeg.FS('readFile', 'out.mp4')
  openNewWindow(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })))
}

// FIXME: 测试写入 FFMPEG
const callBack = frame => blob => {
  debug('frame', frame)
  blobList[frame] = blob
}
app.view.toBlob(callBack(frame))