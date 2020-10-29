const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => {
      video.srcObject = stream
    },
    (err) => console.error(err)
  )
}

let lastExpression
let debounce = 0

video.addEventListener('play', () => {
  const sound = new Howl({
    src: ['./media/bg.mp3'],
    volume: 0.3,
  })
  sound.play()

  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    audioPlay(detections)
  }, 100)
})

function audioPlay(detections) {
  const now = Date.now()
  if (now - debounce < 1000) {
    return
  }

  debounce = now

  if (!detections[0]) {
    return
  }

  // neutral: 0.984237790107727
  // happy: 0.0016227735904976726
  // sad: 0.0000035373489026824245
  // angry: 0.00006959625170566142
  // fearful: 1.067873256488383e-7
  // disgusted: 0.0020965859293937683
  // surprised: 0.01196972094476223

  const sourceMap = {
    happy: './media/happy.mp3',
    sad: './media/sad.mp3',
    angry: './media/angry.mp3',
    fearful: './media/fearful.mp3',
    // surprised: './media/surprised.mp3',
  }

  const matchedExpression = findMatchedExpression(detections[0].expressions)

  if (lastExpression === matchedExpression) {
    return
  }

  lastExpression = matchedExpression

  const playSource = sourceMap[matchedExpression]
  if (!playSource) {
    return
  }

  const sound = new Howl({
    src: [playSource],
  })

  sound.play()
}

function findMatchedExpression(expressions) {
  const expressionList = Object.keys(expressions)
  let matchedIndex = 0
  let maxScore = 0
  for (let i = 0; i < expressionList.length; i++) {
    const currExpression = expressionList[i]
    const currExpressionScore = expressions[currExpression]
    if (currExpressionScore > maxScore) {
      matchedIndex = i
      maxScore = currExpressionScore
    }
  }
  return expressionList[matchedIndex]
}
