// 获取audioBuffer数据的方式之一
fetch(audioUrl)
  .then((res) => res.arrayBuffer())
  .then((buffer) => { // 获取音频二进制数据
    const audioCtx = new audioContext()
    audioCtx.decodeAudio(buffer)
      .then((audioBuffer) => { // 获取音频解码后的audioBuffer数据
        // to do sth
      })
  })

/**
* 音频裁剪
* @param audioBuffer 待裁剪的数据
* @param duration 音频总时长
* @param startOffset 裁剪偏移时间,单位s
*/
function clipAudio (audioBuffer, duration, startOffset = 0) {
  return new Promise((resolve, reject) => {
    // 获取音频通道数量
    const channels = audioBuffer.numberOfChannels
    // 获取采样率
    const rate = audioBuffer.sampleRate

    // 计算截取后需要的采样数量
    const endOffset = rate * duration
    const frameCount = endOffset - 0

    // 创建新的audioBuffer数据
    const newAudioBuffer = new AudioContext().createBuffer(channels, frameCount, rate)

    // 创建Float32的空间,作为copy数据的载体
    const anotherArray = new Float32Array(frameCount)

    // 裁剪后放置的起始位置
    const offset = 0

    // 遍历通道,将每个通道的数据分别copy到对应的newAudioBuffer的通道
    for (let channel = 0; channel < channels; channel++) {
      audioBuffer.copyFromChannel(anotherArray, channel, rate * startOffset)
      newAudioBuffer.copyToChannel(anotherArray, channel, offset)
    }
    // 完成裁剪
    resolve(newAudioBuffer)
  })
}
