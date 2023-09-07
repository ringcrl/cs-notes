// 创建场景、相机和渲染器
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建眼睛模型，并将其添加到场景中
const eyeGeometry = new THREE.PlaneGeometry(0.5, 0.5 / 160 * 30)
const eyeTexture = new THREE.TextureLoader().load('./eyes-texture-cut.png')
const eyeMaterial = new THREE.MeshBasicMaterial({ map: eyeTexture })
// const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const eyeModel = new THREE.Mesh(eyeGeometry, eyeMaterial)
// const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
eyeModel.position.set(0, -0.3, -1) // 根据你的模型设置眼睛的位置
// rightEye.position.set(0.3, 0.5, -1)

scene.add(eyeModel)
// scene.add(rightEye)

// 创建眨眼动画
function blinkAnimation (eye) {
  const tween = new TWEEN.Tween(eye.scale)
    .to({ y: 0.04 }, 100) // 缩小眼睛模型
    .onComplete(function () {
      new TWEEN.Tween(eye.scale)
        .to({ y: 1 }, 100) // 恢复眼睛模型原始大小
        .start()
    })
    .start()
}

// 触发眨眼动画
function triggerBlink () {
  blinkAnimation(eyeModel)
  // blinkAnimation(rightEye)
}

// 在每帧更新中调用TWEEN库的更新函数
function animate () {
  requestAnimationFrame(animate)
  TWEEN.update()
  renderer.render(scene, camera)
}

// 调用触发眨眼的函数
triggerBlink()

// 启动动画循环
animate()
