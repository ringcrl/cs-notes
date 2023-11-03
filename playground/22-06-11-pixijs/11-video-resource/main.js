const app = new PIXI.Application({
  transparent: false,
  backgroundColor: 0xff0000
})
document.body.appendChild(app.view)

// Create play button that can be used to trigger the video
const button = new PIXI.Graphics()
  .beginFill(0x0, 0.5)
  .drawRoundedRect(0, 0, 100, 100, 10)
  .endFill()
  .beginFill(0xffffff)
  .moveTo(36, 30)
  .lineTo(36, 70)
  .lineTo(70, 50)

// Position the button
button.x = (app.screen.width - button.width) / 2
button.y = (app.screen.height - button.height) / 2

// Enable interactivity on the button
button.interactive = true
button.buttonMode = true

// Add to the stage
app.stage.addChild(button)

// Listen for a click/tap event to start playing the video
// this is useful for some mobile platforms. For example:
// ios9 and under cannot render videos in PIXI without a
// polyfill - https://github.com/bfred-it/iphone-inline-video
// ios10 and above require a click/tap event to render videos
// that contain audio in PIXI. Videos with no audio track do
// not have this requirement
button.on('pointertap', onPlayVideo)

async function onPlayVideo () {
  // Don't need the button anymore
  button.destroy()

  // create a video texture from a path

  const video = document.createElement('video')
  video.setAttribute('webkit-playsinline', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('crossorigin', 'anonymous')
  video.crossOrigin = 'anonymous'
  video.preload = 'auto'
  video.style.position = 'absolute'
  video.style.width = '100px'
  video.style.height = '100px'
  video.style.left = '0px'
  video.style.top = '0px'
  document.body.appendChild(video)
  video.src = './withrotate-video.mp4'
  window.video = video
  video.addEventListener('durationchange', () => {
    video.play()
  })

  const resource = new PIXI.resources.VideoResource(video, { autoPlay: false })
  const baseTexture = new PIXI.BaseTexture(resource)
  const texture = new PIXI.Texture(baseTexture)
  const videoDimensions = await getVideoDimensionsOf('./withrotate-video.mp4')

  // create a new Sprite using the video texture (yes it's that easy)
  const videoSprite = new PIXI.Sprite(texture)
  // const videoSprite = new PIXI.Sprite(PIXI.Texture.WHITE);

  videoSprite.height = app.screen.height
  videoSprite.width = videoSprite.height * (videoDimensions.width / videoDimensions.height)
  videoSprite.tint = 0x00ff00

  app.stage.addChild(videoSprite)
}

function getVideoDimensionsOf (url) {
  return new Promise((resolve) => {
    // create the video element
    const video = document.createElement('video')

    // place a listener on it
    video.addEventListener('loadedmetadata', function () {
      // retrieve dimensions
      const height = this.videoHeight
      const width = this.videoWidth
      // send back result
      resolve({ height, width })
    }, false)

    // start download meta-datas
    video.src = url
  })
}
