import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  CircleGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Vector3,
  Raycaster,
  Plane,
  SphereGeometry,
  MeshStandardMaterial
} from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const a = new OrbitControls(camera, renderer.domElement)

// // create a circle shape
// const circle = new THREE.Shape()
// circle.moveTo(0, 10)
// circle.absarc(0, 0, 10, 0, Math.PI * 2, false)

// // create a mesh to hold the circle
// const circleGeometry = new THREE.ShapeGeometry(circle)
// const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial)

// // add the circle mesh to the scene
// scene.add(circleMesh)

const mouse = new Vector2()
const intersectionPoint = new Vector3()
const planeNormal = new Vector3()
const plane = new Plane()
const raycaster = new Raycaster()

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  planeNormal.copy(camera.position).normalize()
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position)
  raycaster.setFromCamera(mouse, camera)
  raycaster.ray.intersectPlane(plane, intersectionPoint)
})

window.addEventListener('click', (e) => {
  const sphereGeo = new SphereGeometry(0.125, 30, 30)
  const sphereMat = new MeshStandardMaterial({
    color: 0xffea00,
    metalness: 0,
    roughness: 0
  })
  const sphereMesh = new Mesh(sphereGeo, sphereMat)
  scene.add(sphereMesh)
  sphereMesh.position.copy(intersectionPoint)
})

camera.position.z = 5

function animate (): void {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

// listen for clicks on the circle
// document.addEventListener('click', onDocumentClick, false)

// function onDocumentClick (event) {
//   // use the Raycaster to detect if the user clicked on the circle
//   const raycaster = new THREE.Raycaster()
//   const mouse = new THREE.Vector2()
//   mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
//   mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
//   raycaster.setFromCamera(mouse, camera)
//   const intersects = raycaster.intersectObjects([circleMesh])

//   // if the user clicked on the circle, animate it
//   if (intersects.length > 0) {
//     animateCircle()
//   }
// }

// function animateCircle () {
//   // create a simple animation to scale the circle up and down
//   let scale = 1
//   let direction = 1
//   function animate () {
//     scale += direction * 0.01
//     if (scale > 1.5) {
//       direction = -1
//     } else if (scale < 0.5) {
//       direction = 1
//     }
//     circleMesh.scale.set(scale, scale, scale)
//     requestAnimationFrame(animate)
//   }
//   animate()
// }
