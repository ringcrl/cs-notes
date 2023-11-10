const io = require('socket.io')(3000)
const protobuf = require('protobufjs')

// 加载生成的Protocol Buffers类
const root = protobuf.loadSync('message.proto')
const MyMessage = root.lookupType('example.MyMessage')

io.on('connection', (socket) => {
  console.log('Client connected')

  // 接收消息
  socket.on('message', (buffer) => {
    const message = MyMessage.decode(buffer)
    console.log('Received message:', message.text)
  })

  // 发送消息
  const message = MyMessage.create({ text: 'Hello from server!' })
  const buffer = MyMessage.encode(message).finish()
  socket.emit('message', buffer)
})

console.log('Socket.IO server running')
