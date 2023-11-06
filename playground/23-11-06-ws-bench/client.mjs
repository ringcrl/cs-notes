const SERVER = 'ws://0.0.0.0:4001'
const CLIENTS_TO_WAIT_FOR = 30
const DELAY = 10;

(async () => {
  const WebSocket = globalThis.WebSocket || (await import('ws')).WebSocket

  const MESSAGES_TO_SEND = JSON.stringify({
    $from: '108115540105701324622',
    type: 'MOVEMENT',
    position: {
      x: -2.812751531600952,
      y: -0.005082905292510986,
      z: 74.49711608886719
    },
    rotation: {
      x: 0,
      y: -0.668513298034668,
      z: 0,
      w: 0.7437002062797546
    },
    linear: {
      x: -4.147706985473633,
      y: 0.0005297342431731522,
      z: -0.1379387229681015
    },
    angular: {
      x: 0,
      y: 0,
      z: 0
    },
    clientTime: 1699005455734,
    $topic: 'socket',
    $uuid: '0d566433-421c-4082-ad60-a1e6279b27f0',
    ReceiptTimeStamp: 1699005455802
  })

  const NAMES = Array.from({ length: CLIENTS_TO_WAIT_FOR }).fill(0).map((_, i) => `player-${i}`)

  console.log(`Connecting ${CLIENTS_TO_WAIT_FOR} WebSocket clients...`)

  console.time(`All ${CLIENTS_TO_WAIT_FOR} clients connected`)

  const promises = []

  const clients = []
  for (let i = 0; i < CLIENTS_TO_WAIT_FOR; i++) {
    clients[i] = new WebSocket(`${SERVER}?name=${NAMES[i]}`)
    promises.push(
      new Promise((resolve, reject) => {
        clients[i].onmessage = event => {
          resolve()
        }
      })
    )
  }

  await Promise.all(promises)
  console.timeEnd(`All ${CLIENTS_TO_WAIT_FOR} clients connected`)

  let msgCount = 0
  for (const clinet of clients) {
    clinet.onmessage = event => {
      // console.log('client receive', JSON.parse(event.data))
      msgCount++
    }
  }

  function sendMsg () {
    for (let i = 0; i < CLIENTS_TO_WAIT_FOR; i++) {
      clients[i].send(MESSAGES_TO_SEND)
    }
  }

  setInterval(() => {
    sendMsg()
  }, DELAY)

  setInterval(() => {
    console.log('每秒消息量：', msgCount)
    msgCount = 0
  }, 1000)
})()
