const PuppeteerVideoRecorder = require('../index')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = (await browser.pages())[0]
  const recorder = new PuppeteerVideoRecorder()
  await recorder.init(page, __dirname)
  await page.goto('https://devyumao.github.io/dragon-loading/')

  await recorder.start()

  setTimeout(async () => {
    await recorder.stop()
    await browser.close()
  }, 5000)
})()
