import { WebGLRenderer } from '../../../vendor/three/build/three.js'

function createRenderer () {
  const renderer = new WebGLRenderer()

  return renderer
}

export { createRenderer }
