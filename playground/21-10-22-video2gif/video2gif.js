const path = require('path')
const cp = require('child_process')
const fs = require('fs')

const INPUT_DIR = 'INPUT_ABSOLUTE_PATH'
const OUTPUT_DIR = '/Users/ringcrl/Desktop/gifs'

const dirContent = fs.readdirSync(INPUT_DIR)
const filePathList = dirContent
  .filter((fileName) => fileName.endsWith('.mp4'))
  .map((fileName) => path.resolve(INPUT_DIR, fileName))

for (const filePath of filePathList) {
  const fileName = filePath.match(/\/([^/]+?)\.mp4/)[1]
  const outputFilePath = path.resolve(OUTPUT_DIR, `${fileName}.gif`)
  const FFMPEG_COMMAND = `ffmpeg -t 2 -ss 00:00:01 -i ${filePath} -r 15 -b:v 200k ${outputFilePath}`
  cp.execSync(FFMPEG_COMMAND)
}
