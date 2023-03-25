const { chromium } = require('playwright')
const { saveVideo } = require('playwright-video')

const url = 'https://www.idcd.com/tool/time/62'
const duration = 5
const outputPath = 'output.mp4'
const framerate = 60 // 设置录制帧率
const backgroundColor = 'rgb(0, 255, 0)'

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate((bgColor) => {
    document.body.style.backgroundColor = bgColor
  }, backgroundColor)

  const recorder = await saveVideo(page, outputPath, { fps: framerate })

  await page.waitForTimeout(duration * 1000)

  await recorder.stop()
  await browser.close()
})()
