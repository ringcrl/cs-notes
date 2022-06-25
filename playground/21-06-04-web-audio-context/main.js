console.clear()

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

// load some sound
const audioElement = document.querySelector('audio')
const track = audioCtx.createMediaElementSource(audioElement)

const playButton = document.querySelector('.tape-controls-play')

// play pause audio
playButton.addEventListener('click', function () {
  // check if context is in suspended state (autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  if (this.dataset.playing === 'false') {
    audioElement.play()
    this.dataset.playing = 'true'
    // if track is playing pause it
  } else if (this.dataset.playing === 'true') {
    audioElement.pause()
    this.dataset.playing = 'false'
  }

  const state = this.getAttribute('aria-checked') === 'true'
  this.setAttribute('aria-checked', state ? 'false' : 'true')
}, false)

// if track ends
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false'
  playButton.setAttribute('aria-checked', 'false')
}, false)

// volume
const gainNode = audioCtx.createGain()

const volumeControl = document.querySelector('[data-action="volume"]')
volumeControl.addEventListener('input', function () {
  console.log(this.value)
  gainNode.gain.value = this.value
}, false)

// panning
const pannerOptions = { pan: 0 }
const panner = new StereoPannerNode(audioCtx, pannerOptions)

const pannerControl = document.querySelector('[data-action="panner"]')
pannerControl.addEventListener('input', function () {
  panner.pan.value = this.value
}, false)

// connect our graph
track.connect(gainNode).connect(panner).connect(audioCtx.destination)

const powerButton = document.querySelector('.control-power')

powerButton.addEventListener('click', function () {
  if (this.dataset.power === 'on') {
    audioCtx.suspend()
    this.dataset.power = 'off'
  } else if (this.dataset.power === 'off') {
    audioCtx.resume()
    this.dataset.power = 'on'
  }
  this.setAttribute('aria-checked', state ? 'false' : 'true')
  console.log(audioCtx.state)
}, false)

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
