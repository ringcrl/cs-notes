import {
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from '../../../vendor/three/build/three.js'

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  // 即使加载纹理需要一些时间（可能是几百毫秒）
  // TextureLoader 也会立即返回 Texture 类的空实例
  // 但是，在图像数据完全加载之前，纹理将显示为黑色
  // 正式场景等到所有纹理加载完成后再渲染
  const texture = textureLoader.load(
    '/assets/textures/uv-test-bw.png',
  );

  // create a "standard" material
  // 创建颜色材质
  // const material = new MeshStandardMaterial({ color: 'purple' });

  // 创建纹理材质
  const material = new MeshStandardMaterial({ map: texture });

  return material;
}

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2)

  const material = createMaterial();

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
