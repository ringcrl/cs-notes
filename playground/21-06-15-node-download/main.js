const request = require('request')
const fs = require('fs')
const path = require('path')

async function downloadFile (url, dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
  const postfix = url.split('.').pop().toLowerCase()
  const fileName = `${Date.now()}.${postfix}`
  const filePath = path.resolve(dirPath, fileName)
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath)
    request(url).pipe(stream).on('close', () => {
      resolve(filePath)
    }).on('error', (err) => {
      reject(err)
    })
  })
}

(async () => {
  const url = '<remote_path>'
  const dirPath = path.resolve(__dirname, 'temp')
  const res = await downloadFile(url, dirPath)
  console.log(res)
})()
