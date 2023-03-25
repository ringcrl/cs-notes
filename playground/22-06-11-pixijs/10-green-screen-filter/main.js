const app = new PIXI.Application()
document.body.appendChild(app.view)

// Create background image
const image1 = PIXI.Sprite.from('./01-green.png')
image1.width = app.screen.width
image1.height = app.screen.height
const image2 = PIXI.Sprite.from('./02-bg.jpg')
image2.width = app.screen.width
image2.height = app.screen.height
const container = new PIXI.Container()
container.addChild(image2)
container.addChild(image1)
app.stage.addChild(container)

class GreenScreenFilter extends PIXI.Filter {
  constructor () {
    // 定义一个片段着色器（shader），用于指定滤镜效果
    const GREEN_SCREEN_FRAGMENT_SHADER = `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

const vec3 chroma = vec3(0.0, 1.0, 0.0);
const float threshold = 0.4;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);

    float distance = length(color.rgb - chroma);
    if (distance < threshold) {
        // 使像素完全透明
        // color.a = 0.0;
        discard;
    }

    gl_FragColor = color;
}
`
    super(null, GREEN_SCREEN_FRAGMENT_SHADER)
  }
}

const greenScreenFilter = new GreenScreenFilter()
image1.filters = [greenScreenFilter]
