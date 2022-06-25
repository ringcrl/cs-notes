const path = require('path')
const cp = require('child_process')
const fs = require('fs')

const INPUT_DIR = 'INPUT_ABSOLUTE_PATH'
const OUTPUT_DIR = '/Users/ringcrl/Desktop/pngs'

const dirContent = fs.readdirSync(INPUT_DIR)
const filePathList = dirContent
  .filter((fileName) => fileName.endsWith('.mp4'))
  .map((fileName) => path.resolve(INPUT_DIR, fileName))

for (const filePath of filePathList) {
  const fileName = filePath.match(/\/([^/]+?)\.mp4/)[1]
  const outputFilePath = path.resolve(OUTPUT_DIR, `${fileName}.png`)
  const FFMPEG_COMMAND = `ffmpeg -i ${filePath} -y -f image2 -ss 2200ms -vframes 1 ${outputFilePath}`
  cp.execSync(FFMPEG_COMMAND)
}
