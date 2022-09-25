import { BoxBufferGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../../vendor/three/build/three.js'

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2)

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material = new MeshStandardMaterial({ color: 'purple' });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

  // this method will be called once per frame
  // 不同显示器的帧率不一样，不能直接加个数值，否则不能控制60帧
  const radiansPerSecond = MathUtils.degToRad(30);
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube
}

export { createCube }
