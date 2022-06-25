const fs = require('fs')
const path = require('path')
const AudioContext = require('./web-audio-engine').RenderingAudioContext;

(async () => {
  const audioContext = new AudioContext()

  await composeWith(audioContext)

  // ===========================导出====================================
  const audioData = audioContext.exportAsAudioData()
  const arrayBuffer = await audioContext.encodeAudioData(audioData)
  const outputPath = path.resolve(__dirname, './output.wav')
  fs.writeFileSync(outputPath, Buffer.from(arrayBuffer))
})()

async function composeWith (audioContext) {
  const fileBuffer1 = fs.readFileSync(path.resolve(__dirname, './assets/3s.wav'))
  const audioBuffer1 = await audioContext.decodeAudioData(fileBuffer1)
  const bufSrc1 = audioContext.createBufferSource()
  bufSrc1.buffer = audioBuffer1
  bufSrc1.connect(audioContext.destination)
  bufSrc1.start(0)

  const fileBuffer2 = fs.readFileSync(path.resolve(__dirname, './assets/2s.wav'))
  const audioBuffer2 = await audioContext.decodeAudioData(fileBuffer2)
  const bufSrc2 = audioContext.createBufferSource()
  bufSrc2.buffer = audioBuffer2
  bufSrc2.connect(audioContext.destination)
  bufSrc2.start(0)

  audioContext.processTo(audioBuffer1.duration)
}
