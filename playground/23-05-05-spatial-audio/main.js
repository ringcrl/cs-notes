import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

// 创建场景、相机和渲染器
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 添加光源
const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

// 添加鼠标控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 启用左键按住旋转
controls.enableRotate = true
// 启用右键按住平移
controls.enablePan = true

// 创建一个 AudioListener 并将其添加到相机中
const listener = new THREE.AudioListener()
camera.add(listener)

// 创建一个 PositionalAudio 对象（传入监听器）
const sound = new THREE.PositionalAudio(listener)

// 加载一个音频文件并将其设置为 PositionalAudio 对象的缓冲区
const audioLoader = new THREE.AudioLoader()
audioLoader.load('./52s.mp3', function (buffer) {
  sound.setBuffer(buffer)
  sound.setRefDistance(10) // 设置参考距离
  sound.setRolloffFactor(5) // 设置衰减系数
  sound.setLoop(true)
  sound.play()
})

// 添加一个文字表示发音点
const loader = new FontLoader()
loader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new TextGeometry('N', {
    font: font,
    size: 5,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 5
  })
  textGeometry.center()
  const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
  const textMesh = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(textMesh)
  textMesh.add(sound)
})

// 设置相机位置
camera.position.z = 10

// 添加键盘事件监听器
document.addEventListener('keydown', onDocumentKeyDown, false)
function onDocumentKeyDown (event) {
  const keyCode = event.which
  if (keyCode === 87) {
    camera.position.z -= 0.2
  } else if (keyCode === 83) {
    camera.position.z += 0.2
  } else if (keyCode === 65) {
    camera.position.x -= 0.2
  } else if (keyCode === 68) {
    camera.position.x += 0.2
  }
};

// 渲染循环
function animate () {
  window.requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

animate()
