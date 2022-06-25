const http = require('http')
const fs = require('fs')

const filename = '/Users/ringcrl/Documents/assets/视频/60fps.mp4'

http
  .createServer(async (req, res) => {
    const readStream = fs.createReadStream(filename)
    readStream.pipe(res)
  })
  .listen(3001)
