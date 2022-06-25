const WIDTH = 1280
const HEIGHT = 720

const app = new PIXI.Application({
  width: WIDTH, height: HEIGHT, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1
})
document.body.appendChild(app.view)

const container = new PIXI.Container()

app.stage.addChild(container)

// Create a new texture
const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png')

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
  const bunny = new PIXI.Sprite(texture)
  bunny.anchor.set(0.5)
  bunny.x = (i % 5) * 40
  bunny.y = Math.floor(i / 5) * 40
  container.addChild(bunny)
}

// Move container to the center
container.x = app.screen.width / 2
container.y = app.screen.height / 2

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2
container.pivot.y = container.height / 2

for (let i = 0; i < 100; i++) {
  console.time('render')
  container.rotation -= 100
  app.renderer.render(app.stage)
  console.timeEnd('render')

  console.time('readPixels')
  const gl = app.view.getContext('webgl2')
  const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4)
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
  // console.log(pixels); // Uint8Array
  console.timeEnd('readPixels')
}
