/* eslint-disable @typescript-eslint/no-floating-promises */

document.querySelector('#start-btn')?.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = event => {
        const audioBlob = event.data
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const audioData = fileReader.result
          const audioCtx = new AudioContext()
          audioCtx.decodeAudioData(audioData, audioBuffer => {
            const audioData = audioBuffer.getChannelData(0)
            const canvas = document.getElementById('waveform')
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            const sliceWidth = canvas.width * 1.0 / audioData.length
            let x = 0
            audioData.forEach(data => {
              const v = data / 128.0
              const y = v * canvas.height / 2
              if (x === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
              x += sliceWidth
            })
            ctx.lineTo(canvas.width, canvas.height / 2)
            ctx.stroke()
          })
        }
        fileReader.readAsArrayBuffer(audioBlob)
      }
      mediaRecorder.start()
    })
})
