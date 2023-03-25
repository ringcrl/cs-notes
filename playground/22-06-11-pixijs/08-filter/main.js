const app = new PIXI.Application()
document.body.appendChild(app.view)

// Create background image
const background = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bg_grass.jpg')
background.width = app.screen.width
background.height = app.screen.height
const container = new PIXI.Container()
container.addChild(background)
app.stage.addChild(container)

const filter = new PIXI.Filter(null, `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec4 vColor;

  uniform sampler2D uSampler;
  uniform float customUniform;

  void main(void)
  {
    vec2 uvs = vTextureCoord.xy;

    vec4 fg = texture2D(uSampler, vTextureCoord);


    fg.r = uvs.y + sin(customUniform);

    //fg.r = clamp(fg.r,0.0,0.9);

    gl_FragColor = fg;

  }  
`, {
  customUniform: 0.0
})

container.filters = [filter]

// Animate the filter
app.ticker.add((delta) => {
  filter.uniforms.customUniform += 0.04 * delta
  container.rotation += 0.01 * delta
})
