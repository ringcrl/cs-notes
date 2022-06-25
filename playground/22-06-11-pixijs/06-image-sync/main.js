const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  autoStart: false // 禁用定时器自动render
})
document.body.appendChild(app.view)

const container = new PIXI.Container()

app.stage.addChild(container)

function addImage (image) {
  const texture = PIXI.Texture.from(image)

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
}

async function loadImage (url) {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = url
    image.onload = () => {
      resolve(image)
    }
  })
}

(async () => {
  const image = await loadImage('https://pixijs.io/examples/examples/assets/bunny.png')
  addImage(image)
  app.renderer.render(app.stage)
})()
