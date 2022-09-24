import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from '../../../vendor/three/build/three.module.js'

function createCube () {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = new MeshBasicMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  return cube
}

export { createCube }
