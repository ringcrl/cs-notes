import { WebGLRenderer } from '../../../vendor/three/build/three.js'

function createRenderer () {
  const renderer = new WebGLRenderer({ antialias: true })

  return renderer
}

export { createRenderer }
