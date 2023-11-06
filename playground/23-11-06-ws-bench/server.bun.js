const CLIENTS_TO_WAIT_FOR = 30
let remainingClients = CLIENTS_TO_WAIT_FOR
const port = 4001

// 30MS的数据一次性发送给所有客户端
const CACHE_MS = 30
let prevTime = 0
const cacheMessages = []

const server = Bun.serve({
  port: port,
  websocket: {
    open (ws) {
      ws.subscribe('room')

      remainingClients--
      console.log(`${ws.data.name} connected (${remainingClients} remain)`)

      if (remainingClients === 0) {
        console.log('All clients connected')
        setTimeout(() => {
          console.log('Starting benchmark by sending "ready" message')
          ws.publishText('room', 'ready')
        }, 100)
      }
    },
    message (ws, msg) {
      if (Date.now() - prevTime < CACHE_MS) {
        cacheMessages.push(msg)
        return
      }

      const out = JSON.stringify(cacheMessages)
      if (ws.publishText('room', out) !== out.length) {
        throw new Error('Failed to publish message')
      }
      cacheMessages.length = 0
      prevTime = Date.now()
    },
    close (ws) {
      remainingClients++
    },

    perMessageDeflate: false,
    publishToSelf: true
  },

  fetch (req, server) {
    if (
      server.upgrade(req, {
        data: {
          name: new URL(req.url).searchParams.get('name') || 'Client #' + (CLIENTS_TO_WAIT_FOR - remainingClients)
        }
      })
    ) { return }

    return new Response('Error')
  }
})

console.log(`Waiting for ${remainingClients} clients to connect...\n`, `  http://${server.hostname}:${port}/`)
