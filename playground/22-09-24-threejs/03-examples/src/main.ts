import { Scene, PerspectiveCamera, WebGLRenderer, CircleGeometry, MeshBasicMaterial, Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const a = new OrbitControls(camera, renderer.domElement)

const geometry = new CircleGeometry(1, 32)
const material = new MeshBasicMaterial({ color: 0xffffff })
const cube = new Mesh(geometry, material)
cube.rotation.x = 0.5
scene.add(cube)

camera.position.z = 5

function animate (): void {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
