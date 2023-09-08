// 创建场景、相机和渲染器
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建嘴巴几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// geometry.computeVertexNormals()
const texture = new THREE.TextureLoader().load('./mouth_texture.png')
const material = new THREE.MeshBasicMaterial({ map: texture })
const mouthMesh = new THREE.Mesh(geometry, material)
mouthMesh.position.set(0, 0, -1)

scene.add(mouthMesh)

// 定义形变目标
const targets = [
  { scaleX: 1, scaleY: 1, scaleZ: 1 },
  { scaleX: 1.5, scaleY: 0.02, scaleZ: 1 },
  { scaleX: 1, scaleY: 1, scaleZ: 1 }
]

// 创建形变动画轨迹
const track = new THREE.VectorKeyframeTrack('.scale', [0, 1, 2], [
  targets[0].scaleX, targets[0].scaleY, targets[0].scaleZ,
  targets[1].scaleX, targets[1].scaleY, targets[1].scaleZ,
  targets[2].scaleX, targets[2].scaleY, targets[2].scaleZ
])

// 创建动画剪辑
const clip = new THREE.AnimationClip('MorphAnimation', -1, [track])

// 创建形变动画混合器
const mixer = new THREE.AnimationMixer(mouthMesh)
const action = mixer.clipAction(clip)
action.play()

// 渲染循环
function animate () {
  requestAnimationFrame(animate)
  mixer.update(0.01) // 更新形变动画
  renderer.render(scene, camera)
}

animate()
