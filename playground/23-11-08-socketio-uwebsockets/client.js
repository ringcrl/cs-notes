const io = require('socket.io-client')

// 连接到服务端
const socket = io('http://localhost:3000')

// 连接事件
socket.on('connect', () => {
  console.log('Connected to server')

  // 发送消息到服务端
  socket.emit('message', 'Hello from client')
})

// 监听服务端的消息
socket.on('message', (data) => {
  console.log('Message from server:', data)
})

// 断开连接事件
socket.on('disconnect', () => {
  console.log('Disconnected from server')
})
