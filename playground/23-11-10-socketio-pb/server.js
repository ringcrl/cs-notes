const http = require('http')
const socketIo = require('socket.io')
const { Message } = require('./message_pb.js') // 引入生成的 protobuf 库

const server = http.createServer()
const io = socketIo(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('sendMessage', (data) => {
    // 解码收到的 protobuf 消息
    const message = Message.deserializeBinary(data)
    console.log(`Received message: ${message.getContent()}`)

    // 创建一个新的 protobuf 消息作为响应
    const response = new Message()
    response.setId(message.getId())
    response.setContent('Echo: ' + message.getContent())
    response.setTimestamp(Date.now())

    // 发送响应消息
    socket.emit('messageResponse', response.serializeBinary())
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(4000, () => {
  console.log('Listening on port 4000')
})
