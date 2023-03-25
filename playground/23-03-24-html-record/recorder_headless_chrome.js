const puppeteer = require('puppeteer')
const { exec } = require('child_process')
const fs = require('fs')

const url = 'https://www.idcd.com/tool/time/62'
const duration = 5
const framerate = 20 // page.screenshot 耗时50ms，只能达到20帧了
const outputPath = 'output.mp4';

(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({ width: 800, height: 600 })
  await page.goto(url, { waitUntil: 'networkidle2' })

  await page.addStyleTag({ content: 'body {background-color:rgb(0,255,0);}' })

  if (!fs.existsSync('frames')) {
    fs.mkdirSync('frames')
  }

  for (let i = 0; i < duration * framerate; i++) {
    console.time('page.screenshot')
    await page.screenshot({ path: `frames/frame_${i}.png` })
    console.timeEnd('page.screenshot')
    // await new Promise(resolve => setTimeout(resolve, 1000 / framerate))
  }

  await browser.close()

  exec(
    `ffmpeg -r ${framerate} -i frames/frame_%d.png -c:v libx264 -vf "fps=${framerate},format=yuv420p" -y ${outputPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing FFmpeg: ${error}`)
        return
      }
      console.log(`Video saved as ${outputPath}`)

      // exec('rm -rf frames', (error, stdout, stderr) => {
      //   if (error) {
      //     console.error(`Error deleting frames: ${error}`)
      //   }
      // })
    }
  )
})()
