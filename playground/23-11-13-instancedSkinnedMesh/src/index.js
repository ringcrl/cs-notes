import * as THREE from 'three'
import { cloneDeep } from 'lodash'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from './meshopt_decoder.module'
import { InstancedSkinnedMesh } from './InstancedSkinnedMesh.js'

import male from '../assets/male.glb'
import maleAnimation from '../assets/male-animation.glb'
import maleDownBodyCorduroyGlb from '../assets/male-down-body-corduroy/male-down-body-corduroy.glb'
import maleDownBodyCorduroyTexture from '../assets/male-down-body-corduroy/private-long-dengxinrong.png'
import maleDownBodyKaqiTexture from '../assets/male-down-body-kaqi/private-long-kaqi.png'

import Stats from 'stats.js'
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

let camera, scene, renderer, mixer

let mesh
const amount = 4
const count = Math.pow(amount, 3)
let dummy // 指的是一个占位符或者是一个没有实际功能或数据的对象
const variance = []
const duration = 3.25

const replaceMaterialImage = (material, imageUrl) => {
  return new Promise((resolve, reject) => {
    const image = new window.Image()// new ImageBitmap();
    image.crossOrigin = 'anonymous'
    image.src = imageUrl
    image.onload = async event => {
      // imagebitmap会导致嘴唇和眉毛都有黑边，直接用image初始化texture shirly
      // const imageBitmap = await window.createImageBitmap(image);
      const newCommonTexture = cloneDeep(material.map)
      if (newCommonTexture && newCommonTexture.source) {
        newCommonTexture.source.data = image
        material.map = newCommonTexture
        material.map.needsUpdate = true
      }
      const newEmissiveMap = cloneDeep(material.emissiveMap)
      if (newEmissiveMap) {
        newEmissiveMap.source.data = image
        material.emissiveMap = newEmissiveMap
        material.emissiveMap.needsUpdate = true
      }
      resolve(true)
    }
  })
}

async function loadModel (modelUrl) {
  const loader = new GLTFLoader()
  loader.setMeshoptDecoder(MeshoptDecoder)
  const data = await loader.loadAsync(modelUrl)
  return data
}

async function init () {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(amount * 0.9, amount * 0.9, amount * 0.9)
  camera.lookAt(0, 0, 0)

  scene = new THREE.Scene()

  const ambient = new THREE.AmbientLight(0x000011, 3)

  scene.add(ambient)

  const light = new THREE.DirectionalLight(0xffffff)

  light.position.set(10, 100, 10)

  scene.add(light)

  scene.background = new THREE.Color(0x000011)

  // const loader = new GLTFLoader()

  const object = await loadModel(maleDownBodyCorduroyGlb)
  // const object = await loadModel(male)
  const animationObject = await loadModel(maleAnimation)

  // 是一个 SkinnedMesh

  // 'Avatar_Down_Body,Avatar_Down_Body001,Avatar_Down_Body002,Avatar_Hair,Avatar_Hair001,Avatar_Head,Avatar_Mask_Eyebrows,Avatar_Mask_Eyes,Avatar_Mask_Mouth,Avatar_Shoes,Avatar_Shoes001,Avatar_Up_Body,Avatar_Up_Body001,Avatar_Up_Body002,mixamorigHips'

  // m 是 SkinnedMesh
  // const m = object.scene.getObjectByName('Avatar_Down_Body')
  const m = object.scene.getObjectByName('Avatar_Down_Body003')
  // const m = object.scene.getObjectByName('Avatar_Down_Body003_1')

  dummy = m

  mesh = new InstancedSkinnedMesh(m.geometry, m.material, count)

  mesh.copy(m)
  mesh.bind(m.skeleton, m.bindMatrix)

  const meshMaterial = mesh.material

  replaceMaterialImage(meshMaterial, maleDownBodyKaqiTexture)

  const pointsMaterial = new THREE.PointsMaterial({
    transparent: true,
    opacity: 0.1
  })

  mesh.isPoints = false
  mesh.isMesh = true

  // mesh.material = pointsMaterial
  // mesh.isPoints = true
  // mesh.isMesh = false

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

  // mixer.clipAction(object.animations[0]).play()

  mixer.clipAction(animationObject.animations[2]).play()

  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector4(
      Math.random(),
      Math.random() * 2 - 1,
      3 * Math.random(),
      duration * Math.random()
    )

    variance.push(v)

    // mesh.setColorAt(
    //   i,
    //   new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`)
    // )
  }

  const g = new THREE.Group()

  g.position.set(-5, -5, -5)

  scene.add(g)

  g.add(object.scene)

  g.add(mesh)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  stats.begin()
  render()
  stats.end()

  window.requestAnimationFrame(animate)
}

function render (time) {
  if (mesh) {
    const time = performance.now() * 0.001

    let i = 0

    const offset = (amount - 1) / 2

    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        for (let z = 0; z < amount; z++) {
          const v = variance[i++]

          const t = (v.w + time) % duration

          const pt = Math.abs(0.5 - t / duration)

          dummy.position.set(
            offset - 2 * x + v.x,
            offset - y + v.y
            // offset - 4 * z + v.z + Math.pow(pt, 4)
          )
          // dummy.position.multiplyScalar(5)
          // dummy.position.z = 20 + (dummy.position.z % 120)

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

;(async () => {
  await init()
  animate()
})()
