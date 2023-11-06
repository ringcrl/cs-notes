import { createRequire } from 'module'

const CLIENTS_TO_WAIT_FOR = 30
const require = createRequire(import.meta.url)
const WebSocketServer = require('ws').Server
const config = {
  host: '0.0.0.0',
  port: '4001'
}
const wss = new WebSocketServer(config, function () {
  console.log(`Waiting for ${CLIENTS_TO_WAIT_FOR} clients to connect..`)
})

const clients = []

// 30MS的数据一次性发送给所有客户端
const CACHE_MS = 30
let prevTime = 0
const cacheMessages = []
wss.on('connection', function (ws, { url }) {
  const name = new URL(new URL(url, 'http://localhost:3000')).searchParams.get('name')
  console.log(`${name} connected (${CLIENTS_TO_WAIT_FOR - clients.length} remain)`)
  clients.push(ws)

  ws.on('message', function (message) {
    if (Date.now() - prevTime < CACHE_MS) {
      cacheMessages.push(JSON.parse(message))
      return
    }

    for (const client of clients) {
      client.send(JSON.stringify(cacheMessages))
    }
    cacheMessages.length = 0
    prevTime = Date.now()
  })

  ws.on('close', function (ws) {
    clients.splice(clients.indexOf(ws), 1)
  })

  if (clients.length === CLIENTS_TO_WAIT_FOR) {
    sendReadyMessage()
  }
})

function sendReadyMessage () {
  console.log('All clients connected')
  setTimeout(() => {
    console.log('Starting benchmark')
    for (const client of clients) {
      client.send('ready')
    }
  }, 100)
}
