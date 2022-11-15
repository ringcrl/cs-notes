function playM3u8 (url) {
  if (Hls.isSupported()) {
    const video = document.createElement('video')
    video.setAttribute('controls', 'true')
    video.style.width = '300px'
    document.body.append(video)
    video.volume = 1.0
    const hls = new Hls()
    const m3u8Url = decodeURIComponent(url)
    hls.loadSource(m3u8Url)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    })
    video.addEventListener('canplay', () => {
      console.log('canplay')
    })
    document.title = url
  }
}

playM3u8(window.location.href.split('#')[1])
playM3u8(window.location.href.split('#')[1])
