// const http = require('http')
const { Server } = require('socket.io')
const { App } = require('uWebSockets.js')

// 创建一个HTTP服务器
// const server = http.createServer((req, res) => {
//   res.end('Server is running')
// })

// 附加Socket.IO到服务器
// const io = new Server(server)

// 使用 uwebsocket.js 代理原生 http server
const io = new Server()
const app = App()
io.attachApp(app)

// 监听连接事件
io.on('connection', (socket) => {
  console.log('A user connected')

  // 监听自定义事件
  socket.on('message', (data) => {
    console.log('Message received:', data)
  })

  // 断开连接事件
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

// // 监听3000端口
// server.listen(3000, () => {
//   console.log('Server is running on port 3000')
// })

app.listen(3000, (token) => {
  if (!token) {
    console.warn('port already in use')
  }
  console.log('Server is running on port 3000')
})
