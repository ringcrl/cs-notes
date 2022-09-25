import { Color, Scene } from '../../../vendor/three/build/three.js'

function createScene () {
  const scene = new Scene()
  scene.background = new Color('skyblue')

  return scene
}

export { createScene }
