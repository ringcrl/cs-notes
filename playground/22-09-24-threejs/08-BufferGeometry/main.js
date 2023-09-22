// 步骤 1：创建场景
const scene = new THREE.Scene()

// 步骤 2：创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// 步骤 3：创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 步骤 4：将渲染器的输出添加到HTML文档中
document.body.appendChild(renderer.domElement)

// 步骤 5：加载纹理贴图
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./eyes-texture.png')

// 步骤 6：创建BufferGeometry
const geometry = new THREE.BufferGeometry()

// 定义顶点位置
const vertices = new Float32Array([
  -1, -1, 0,
  1, -1, 0,
  0, 1, 0
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

// 定义UV坐标
const uvs = new Float32Array([
  0, 0,
  1, 0,
  0.5, 1
])
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))

// 定义面索引
const indices = new Uint32Array([
  0, 1, 2
])
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 步骤 7：创建Mesh和材质
const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(geometry, material)

// 步骤 8：将Mesh添加到场景中
scene.add(mesh)

// 步骤 9：渲染循环
function animate () {
  requestAnimationFrame(animate)

  // 更新和渲染场景
  // mesh.rotation.x += 0.01
  // mesh.rotation.y += 0.01
  renderer.render(scene, camera)
}

animate()
