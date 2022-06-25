const message = document.getElementById('message')
const { createFFmpeg, fetchFile } = FFmpeg
const ffmpeg = createFFmpeg({
  log: true,
  progress: ({ ratio }) => {
    message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`
  }
})

const transcode = async ({ target: { files } }) => {
  const { name } = files[0]
  message.innerHTML = 'Loading ffmpeg-core.js'
  await ffmpeg.load()
  message.innerHTML = 'Start transcoding'
  ffmpeg.FS('writeFile', name, await fetchFile(files[0]))
  await ffmpeg.run('-i', name, '-vf', 'scale=480:-1', 'output.mp4')
  message.innerHTML = 'Complete transcoding'
  const data = ffmpeg.FS('readFile', 'output.mp4')

  const video = document.getElementById('output-video')
  video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
}
document.getElementById('uploader').addEventListener('change', transcode)
