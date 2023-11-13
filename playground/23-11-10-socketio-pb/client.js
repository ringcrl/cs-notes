import { io } from 'socket.io-client'
import * as demo from './message_pb'

const socket = io('http://localhost:4000')

socket.on('messageResponse', (data) => {
  const response = demo.Message.deserializeBinary(data)
  console.log(`Received response: ${response.getContent()}`)
})

document.getElementById('sendButton').addEventListener('click', () => {
  const input = document.getElementById('messageInput')
  const message = new demo.Message()
  message.setId('' + Math.random()) // 随机生成 ID
  message.setContent(input.value)
  message.setTimestamp(Date.now())

  socket.emit('sendMessage', message.serializeBinary())
})
