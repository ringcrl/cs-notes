// Load in dependencies
const Spritesmith = require('spritesmith')
const fs = require('fs')
const path = require('path')

const spriteDir = path.resolve(__dirname, './cache')
let sprites = fs.readdirSync(spriteDir)
sprites = sprites.map((spriteName) => path.resolve(spriteDir, spriteName))

Spritesmith.run({ src: sprites, algorithm: 'top-down' }, (err, result) => {
  if (err) {
    return
  }
  // result.image; // Buffer representation of image
  // result.coordinates; // Object mapping filename to {x, y, width, height} of image
  // result.properties; // Object with metadata about spritesheet {width, height}
  fs.writeFileSync(`${__dirname}/sprite.png`, result.image)
})
