const fs = require('fs')
const path = require('path')
const os = require('os')

const inputPath = path.resolve(__dirname, 'input.txt')
const outputPath = path.resolve(__dirname, 'output.txt')

const data = fs.readFileSync(inputPath, 'UTF-8')

const lines = data.split(/\r?\n/)

lines.forEach((line) => {
  console.log(line)

  fs.appendFileSync(outputPath, line + os.EOL)
})
