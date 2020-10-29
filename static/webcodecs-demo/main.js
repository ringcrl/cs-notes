const codecString = 'vp8'
let keepGoing = true

function playPause() {
  keepGoing = !keepGoing
  const btn = document.querySelector('button')
  if (keepGoing) {
    btn.innerText = 'Pause'
  } else {
    btn.innerText = 'Play'
  }
}

function delay(time_ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, time_ms)
  })
}

async function startDrawing() {
  const cnv = document.getElementById('src')
  const ctx = cnv.getContext('2d', { alpha: false })

  ctx.fillStyle = 'white'
  const { width } = cnv
  const { height } = cnv
  const cx = width / 2
  const cy = height / 2
  const r = Math.min(width, height) / 5
  const drawOneFrame = function drawOneFrame(time) {
    const angle = Math.PI * 2 * (time / 5000)
    const scale = 1 + 0.3 * Math.sin(Math.PI * 2 * (time / 7000))
    ctx.save()
    ctx.fillRect(0, 0, width, height)

    ctx.translate(cx, cy)
    ctx.rotate(angle)
    ctx.scale(scale, scale)

    ctx.font = '30px Verdana'
    ctx.fillStyle = 'black'
    const text = '😊📹📷Hello WebCodecs 🎥🎞️😊'
    const size = ctx.measureText(text).width
    ctx.fillText(text, -size / 2, 0)
    ctx.restore()
    window.requestAnimationFrame(drawOneFrame)
  }
  window.requestAnimationFrame(drawOneFrame)
}

function captureAndEncode(processChunk) {
  const cnv = document.getElementById('src')
  const fps = 60
  let pendingOutputs = 0
  let frameCounter = 0
  const stream = cnv.captureStream(fps)
  const vtr = new VideoTrackReader(stream.getVideoTracks()[0])

  const init = {
    output: (chunk) => {
      pendingOutputs--
      processChunk(chunk)
    },
    error: (e) => {
      console.log(e.message)
      vtr.stop()
    },
  }

  const config = {
    codec: codecString,
    width: cnv.width,
    height: cnv.height,
    bitrate: 10e6,
    framerate: fps,
  }

  const encoder = new VideoEncoder(init)
  encoder.configure(config)

  vtr.start((frame) => {
    if (!keepGoing) return
    if (pendingOutputs > 30) {
      // Too many frames in flight, encoder is overwhelmed
      // let's drop this frame.
      return
    }
    frameCounter++
    pendingOutputs++
    const insert_keyframe = frameCounter % 150 === 0
    encoder.encode(frame, { keyFrame: insert_keyframe })
  })
}

async function frameToBitmapInTime(frame, timeout_ms) {
  const options = { colorSpaceConversion: 'none' }
  const convertPromise = frame.createImageBitmap(options)

  if (timeout_ms <= 0) return convertPromise

  const results = await Promise.all([convertPromise, delay(timeout_ms)])
  return results[0]
}

function startDecodingAndRendering() {
  const cnv = document.getElementById('dst')
  const ctx = cnv.getContext('2d', { alpha: false })
  const readyFrames = []
  let underflow = true
  let timeBase = 0

  function calculateTimeTillNextFrame(timestamp) {
    if (timeBase === 0) timeBase = performance.now()
    const mediaTime = performance.now() - timeBase
    return Math.max(0, timestamp / 1000 - mediaTime)
  }

  async function renderFrame() {
    if (readyFrames.length === 0) {
      underflow = true
      return
    }
    const frame = readyFrames.shift()
    underflow = false

    const bitmap = await frame.createImageBitmap()
    // 根据帧的时间戳，计算在显示下一帧之前需要的实时等待时间
    const timeTillNextFrame = calculateTimeTillNextFrame(frame.timestamp)
    await delay(timeTillNextFrame)
    ctx.drawImage(bitmap, 0, 0)

    // 立即下一帧渲染
    setTimeout(renderFrame, 0)
    frame.destroy()
  }

  function handleFrame(frame) {
    readyFrames.push(frame)
    if (underflow) {
      underflow = false
      setTimeout(renderFrame, 0)
    }
  }

  const init = {
    output: handleFrame,
    error: (e) => {
      console.log(e.message)
    },
  }

  const config = {
    codec: codecString,
    codedWidth: cnv.width,
    codedHeight: cnv.height,
  }

  const decoder = new VideoDecoder(init)
  decoder.configure(config)
  return decoder
}

function main() {
  if (!('VideoEncoder' in window)) {
    document.body.innerHTML = '<h1>WebCodecs API is not supported.</h1>'
    return
  }
  startDrawing()
  const decoder = startDecodingAndRendering()
  captureAndEncode((chunk) => {
    decoder.decode(chunk)
  })
}

document.body.onload = main
