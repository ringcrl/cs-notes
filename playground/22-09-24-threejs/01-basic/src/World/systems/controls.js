import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'

function createControls (camera, canvas) {
  const controls = new OrbitControls(camera, canvas)

  controls.tick = () => controls.update()

  // 按需渲染，只有操作了才进行画面的渲染
  // controls.addEventListener('change', () => {
  //   renderer.render(scene, camera);
  // });

  return controls
}

export { createControls }
