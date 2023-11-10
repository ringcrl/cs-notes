const io = require('socket.io-client')
const protobuf = require('protobufjs')

// 连接到Socket.IO服务端
const socket = io('http://localhost:3000')

// 加载生成的Protocol Buffers类
const root = protobuf.loadSync('message.proto')
const MyMessage = root.lookupType('example.MyMessage')

socket.on('connect', () => {
  console.log('Connected to server')

  // 发送消息
  const message = MyMessage.create({ text: 'Hello from client!' })
  const buffer = MyMessage.encode(message).finish()
  socket.emit('message', buffer)
})

// 接收消息
socket.on('message', (buffer) => {
  const message = MyMessage.decode(buffer)
  console.log('Received message:', message.text)
})
