window.onload = async () => {
  const app = new PIXI.Application({
    width: 640,
    height: 640,
    backgroundColor: 0x1099bb,
    resolution: 1,
    autoStart: false // 禁用定时器自动render
  })

  document.body.appendChild(app.view)

  const pagUrl = './assets/snowman.pag'
  // Initialize pag webassembly module.
  const PAG = await window.libpag.PAGInit()
  const buffer = await fetch(pagUrl).then((response) => response.arrayBuffer())
  const pagFile = await PAG.PAGFile.load(buffer)

  /* eslint-disable-next-line */
  const pagResource = new PAGResource(PAG, pagFile);
  const baseTexture = new PIXI.BaseTexture(pagResource)
  const texture = new PIXI.Texture(baseTexture)
  const sprite = new PIXI.Sprite(texture)
  app.stage.addChild(sprite)

  // const progress = 0;
  // const timer = setInterval(() => {
  //   progress += 0.01;
  //   pagResource.setProgress(progress % 1);
  //   app.renderer.render(app.stage);
  // }, Math.round(1000 / 24));

  pagResource.setProgress(0.5)
  setTimeout(() => {
    app.renderer.render(app.stage)
  }, 1000)
  setTimeout(() => {
    app.renderer.render(app.stage)
  }, 2000)
}
