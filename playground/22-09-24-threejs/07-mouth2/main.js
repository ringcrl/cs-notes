// 创建场景、相机和渲染器
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xa18891)
document.body.appendChild(renderer.domElement)
camera.position.z = 5

// 创建嘴巴的几何体
const mouthGeometry = new THREE.CircleGeometry(1, 32)
const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x46010b })
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
scene.add(mouth)

// 定义形变目标
const targets = [
  { scaleX: 1, scaleY: 0.5, scaleZ: 1 },
  { scaleX: 1.5, scaleY: 0.05, scaleZ: 1 },
  { scaleX: 1, scaleY: 0.5, scaleZ: 1 }
]

// 创建形变动画轨迹
const param1 = targets.map((v, index) => index)
const param2 = targets.map(v => Object.values(v)).flat()
const track = new THREE.VectorKeyframeTrack('.scale', param1, param2)

// 创建动画剪辑
const clip = new THREE.AnimationClip('MorphAnimation', -1, [track])

// 创建形变动画混合器
const mixer = new THREE.AnimationMixer(mouth)
const action = mixer.clipAction(clip)
action.play()

// 渲染循环
function animate () {
  requestAnimationFrame(animate)
  mixer.update(0.01)
  renderer.render(scene, camera)
}

animate()
