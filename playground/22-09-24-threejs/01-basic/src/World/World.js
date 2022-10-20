import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/loop.js'
import { createControls } from './systems/controls.js'

// These variables are module-scoped: we cannot access them
// from outside the module
let camera
let renderer
let scene
let loop

class World {
  constructor (container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()

    loop = new Loop(camera, scene, renderer)

    container.append(renderer.domElement)

    const controls = createControls(camera, renderer.domElement)
    // controls.target.set(1,2,3); // 默认控制点中点坐标
    controls.enableDamping = true // 增加阻尼
    loop.updatables.push(controls) // 需要在循环中更新才能有停止的缓动动作

    const cube = createCube()
    const { ambientLight, mainLight } = createLights()

    // disabled mesh rotation
    // loop.updatables.push(cube);

    scene.add(ambientLight, mainLight, cube)

    const resizer = new Resizer(container, camera, renderer)
    // 通过 setAnimationLoop 刷新，不需要手动调用了
    // resizer.onResize = () => {
    //   this.render();
    // }
  }

  render () {
    // draw a single frame
    renderer.render(scene, camera)
  }

  start () {
    loop.start()
  }

  stop () {
    loop.stop()
  }
}

export { World }
