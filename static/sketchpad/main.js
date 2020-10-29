const $sketchpad = document.getElementById('sketchpad')
const context = $sketchpad.getContext('2d')
let lineWidth = 5

autoSetCanvasSize($sketchpad)
listenToUser($sketchpad)

let eraserEnabled = false

pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
clear.onclick = function () {
  context.clearRect(0, 0, $sketchpad.width, $sketchpad.height)
}
download.onclick = function () {
  const url = $sketchpad.toDataURL('image/png')
  const $a = document.createElement('a')
  document.body.appendChild($a)
  a.href = url
  a.target = '_blank'
  a.click()
}

red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}

thin.onclick = function () {
  lineWidth = 5
}
thick.onclick = function () {
  lineWidth = 10
}

/** * */

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined,
  }
  const isTouchDevice = document.body.ontouchstart !== undefined // 判断是否为触屏设备
  const extractApi = {
    start: undefined,
    move: undefined,
    end: undefined,
  }
  if (isTouchDevice) {
    extractApi.start = 'ontouchstart'
    extractApi.move = 'ontouchmove'
    extractApi.end = 'ontouchend'
  } else {
    extractApi.start = 'onmousedown'
    extractApi.move = 'onmousemove'
    extractApi.end = 'onmouseup'
  }

  canvas[extractApi.start] = function (e) {
    const x = isTouchDevice ? e.touches[0].clientX : e.clientX
    const y = isTouchDevice ? e.touches[0].clientY : e.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint = {
        x,
        y,
      }
    }
  }
  canvas[extractApi.move] = function (e) {
    const x = isTouchDevice ? e.touches[0].clientX : e.clientX
    const y = isTouchDevice ? e.touches[0].clientY : e.clientY

    if (!using) return

    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      const newPoint = {
        x,
        y,
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
  canvas[extractApi.end] = function () {
    using = false
  }
}
