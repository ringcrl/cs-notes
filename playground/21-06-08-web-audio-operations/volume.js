fetch(url)
  .then((res) => res.arrayBuffer)
  .then((buffer) => {
    const audioCtx = new AudioContext()
    audioCtx.decodeAudioData(buffer)
      .then((audioBuffer) => {
        // 获取声道数量
        const channels = audioBuffer.numberOfChannels
        // 更改每个通道内的数据
        for (let channel = 0; channel < channels; channel++) {
          const channelData = audioBuffer.getChannelData(channel)
          for (let j = 0; j < channelData.length; j++) {
            channelData[j] = channelData[j] * volumn // volunm [0,1]
          }
        }

        return audioBuffer
      })
  })
