const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',

  fill: ['#ffffff', '#00ff99'], // gradient
  fillGradientType: 0,
  fillGradientStops: [0.5, 0.8],
  // fillGradientStops: [],

  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: 'round'
})

const richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style)
richText.x = 50
richText.y = 220

app.stage.addChild(richText)
