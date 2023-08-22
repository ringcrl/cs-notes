const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/stream', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream'
  })

  let counter = 0
  const interval = setInterval(() => {
    const chunk = JSON.stringify({ chunk: counter++ })
    res.write(`data: ${chunk}\n\n`)
  }, 1000)

  res.on('close', () => {
    clearInterval(interval)
    res.end()
  })
})

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log(`Your app is listening on port ${listener.address().port}`)
)
