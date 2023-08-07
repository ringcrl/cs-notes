const base64 = 'data:audio/wav;base64,xxx'
console.log(base64)

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new window.Blob([u8arr], {
    type: mime
  })
}

const audioBlob = dataURLtoBlob(base64)
const audio = document.createElement('audio')
audio.src = window.URL.createObjectURL(audioBlob)

audio.addEventListener('canplay', () => {
  window.URL.revokeObjectURL(audio.src)
})

audio.play()
