const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
        color: "#C0C0C070",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
        color: "#FF3030",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {
        color: "#FF3030",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
        color: "#FF3030",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
        color: "#30FF30",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {
        color: "#30FF30",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {
        color: "#30FF30",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
        color: "#E0E0E0",
      });
      drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {
        color: "#E0E0E0",
      });
    }
  }
  canvasCtx.restore();
  return results
}

let currFaceMesh = createFaceMesh()
currFaceMesh.onResults(onResults)

let backupFaceMesh = createFaceMesh()

function createFaceMesh() {
  const faceMesh = new FaceMesh({
    locateFile: (file) => {
      return `./${file}`;
    },
  });
  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  return faceMesh
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    if (currFaceMesh) {
      await currFaceMesh.send({ image: videoElement });
    }

  },
  width: 1280,
  height: 720,
});
camera.start();

// // 由于内存泄露，需要彻底释放
setInterval(() => {
  const currHeap = (currFaceMesh?.g?.h?.HEAP8.length || 0) / 1024 / 1024 // MB 当前占用内存
  if (currHeap > 1000) {
    // 通过内存判断是否需要替换
    let tmp = currFaceMesh
    backupFaceMesh.onResults(onResults)
    currFaceMesh = backupFaceMesh
    tmp.close()
    tmp = null
    backupFaceMesh = createFaceMesh()
  }

}, 3000)
