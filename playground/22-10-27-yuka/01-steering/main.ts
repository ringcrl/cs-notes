import * as YUKA from 'yuka'
import * as THREE from 'three'

let renderer: THREE.Renderer
let camera: THREE.Camera
let scene: THREE.Scene

let entityManager: YUKA.EntityManager
let time: YUKA.Time
let vehicle: YUKA.Vehicle

const obstacles: YUKA.GameEntity[] = []

init()
animate()

function init () {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(30, 25, 0)
  camera.lookAt(scene.position)

  const vehicleGeometry = new THREE.ConeBufferGeometry(0.5, 2, 8)
  vehicleGeometry.rotateX(Math.PI * 0.5)
  vehicleGeometry.computeBoundingSphere()
  const vehicleMaterial = new THREE.MeshNormalMaterial()

  const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial)
  vehicleMesh.matrixAutoUpdate = false
  scene.add(vehicleMesh)

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 0).normalize()
  scene.add(directionalLight)

  const gridHelper = new THREE.GridHelper(25, 25)
  scene.add(gridHelper)

  // renderer

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // resize

  window.addEventListener('resize', onWindowResize, false)

  // game setup

  entityManager = new YUKA.EntityManager()
  time = new YUKA.Time()

  const path = new YUKA.Path()
  path.loop = false
  path.add(new YUKA.Vector3(10, 0, 0))

  vehicle = new YUKA.Vehicle()
  vehicle.maxSpeed = 3
  vehicle.setRenderComponent(vehicleMesh, sync)

  vehicle.boundingRadius = vehicleGeometry.boundingSphere.radius
  vehicle.smoother = new YUKA.Smoother(20)
  vehicle.position.set(-10, 0, 0)

  entityManager.add(vehicle)

  const obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior(obstacles)
  vehicle.steering.add(obstacleAvoidanceBehavior)

  const followPathBehavior = new YUKA.FollowPathBehavior(path)
  vehicle.steering.add(followPathBehavior)

  // obstacles

  setupObstacles()
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  window.requestAnimationFrame(animate)

  const delta = time.update().getDelta()

  entityManager.update(delta)

  renderer.render(scene, camera)
}

function sync (entity, renderComponent) {
  renderComponent.matrix.copy(entity.worldMatrix)
}

function setupObstacles () {
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
  geometry.computeBoundingSphere()
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })

  const mesh1 = new THREE.Mesh(geometry, material)

  mesh1.position.set(0, 0, 0)

  scene.add(mesh1)

  const obstacle1 = new YUKA.GameEntity()
  obstacle1.position.copy(mesh1.position)
  obstacle1.boundingRadius = geometry.boundingSphere.radius
  entityManager.add(obstacle1)
  obstacles.push(obstacle1)
}
