import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { InstancedSkinnedMesh } from './InstancedSkinnedMesh.js'

let camera, scene, renderer, mixer

let mesh
const amount = 4
const count = 3 * Math.pow(amount, 3)
let dummy
const variance = []
const duration = 3.25

init()
animate()

function init () {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(amount * 0.9, amount * 0.9, amount * 0.9)
  camera.lookAt(0, 0, 0)

  scene = new THREE.Scene()

  scene.fog = new THREE.FogExp2(0x000111, 0.02)

  const ambient = new THREE.AmbientLight(0x000111, 3)

  scene.add(ambient)

  const light = new THREE.DirectionalLight(0x22aaff)

  light.position.set(10, 100, 10)

  scene.add(light)

  scene.background = new THREE.Color(0x000111)

  const loader = new GLTFLoader()

  loader.load(new URL('../whale.gltf', import.meta.url), function (object) {
    const m = object.scene.getObjectByName('poly_whale')

    dummy = m

    mesh = new InstancedSkinnedMesh(m.geometry, m.material, count)

    mesh.copy(m)
    mesh.bind(m.skeleton, m.bindMatrix)

    const meshMaterial = mesh.material
    const pointsMaterial = new THREE.PointsMaterial({
      transparent: true,
      opacity: 0.1
    })

    mesh.material = pointsMaterial
    mesh.isPoints = true
    mesh.isMesh = false

    window.addEventListener('click', () => {
      if (mesh.material === pointsMaterial) {
        mesh.material = meshMaterial
        mesh.isPoints = false
        mesh.isMesh = true
      } else {
        mesh.material = pointsMaterial
        mesh.isPoints = true
        mesh.isMesh = false
      }
    })

    pointsMaterial.size = 0.07

    m.visible = false

    mesh.frustumCulled = false

    mixer = new THREE.AnimationMixer(object.scene)

    mixer.clipAction(object.animations[0]).play()

    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector4(
        Math.random(),
        Math.random() * 2 - 1,
        3 * Math.random(),
        duration * Math.random()
      )

      variance.push(v)

      mesh.setColorAt(
        i,
        new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`)
      )
    }

    const g = new THREE.Group()

    g.position.set(-5, -10, -5)

    scene.add(g)

    g.add(object.scene)

    g.add(mesh)

    //
  })

  //

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

//

function animate () {
  requestAnimationFrame(animate)

  render()
}

function render (time) {
  if (mesh) {
    const time = performance.now() * 0.001

    let i = 0

    const offset = (amount - 1) / 2

    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        for (let z = 0; z < 3 * amount; z++) {
          const v = variance[i++]

          const t = (v.w + time) % duration

          const pt = Math.abs(0.5 - t / duration)

          dummy.position.set(
            offset - 2 * x + v.x,
            offset - y + v.y,
            offset - 4 * z + v.z - time + Math.pow(pt, 4)
          )

          dummy.position.multiplyScalar(5)

          dummy.position.z = 20 + (dummy.position.z % 120)

          dummy.updateMatrix()

          mixer.setTime(t)

          dummy.skeleton.bones.forEach((b) => {
            b.updateMatrixWorld()
          })

          mesh.setMatrixAt(i, dummy.matrix)

          mesh.setBonesAt(i, dummy.skeleton)
        }
      }
    }

    mesh.instanceMatrix.needsUpdate = true

    if (mesh.skeleton && mesh.skeleton.bonetexture) {
      mesh.skeleton.bonetexture.needsUpdate = true
    }
  }

  renderer.render(scene, camera)
}
