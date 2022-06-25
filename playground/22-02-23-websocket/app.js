const express = require('express')
const path = require('path')

const app = express()
const http = require('http')

const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server)
const url = require('url')
const ip = require('./ip')

app.use(express.static(path.resolve(__dirname, 'www')))

// 房间路由
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'www/room.html'))
})
// 设备路由，如果扫码登录，则加入相应的房间，如果房间信息不正确，则回应错误信息
app.get('/device', (req, res) => {
  const { roomid } = req.query
  const room = rooms.find((room) => room.id === roomid)
  if (!room) {
    res.send('错误的请求')
  } else {
    res.sendFile(path.resolve(__dirname, 'www/device.html'))
  }
})
// 存储房间信息的数组
/* 房间信息
 * {
 *  id: roomid,
 *  devices: []
 * }
 */
const rooms = []

// // webSocket 连接
io.on('connection', (socket) => {
  /*
   * 连接已关闭
   * 如果是设备连接断开，则通知房间移除房间内的设备
   * 如果是房间连接关闭，则关闭所有在房间内设备的连接，并移除房间
   *
   */
  socket.on('disconnect', function () {
    // 根据roomid是否存在，判断是房间断开或是设备断开
    const { roomid } = url.parse(this.request.headers.referer, true).query
    if (roomid) {
      // 设备连接关闭
      console.log('设备：', this.id, '已离线')
      this.broadcast.to(roomid).emit('remove', this.id)
      const room = rooms.find((room) => room.id === roomid)
      const deviceIndex = room.devices.indexOf(this.id)
      room.devices.splice(deviceIndex, 1)
    } else {
      // 房间连接关闭
      console.log('房间已关闭')
      const _this = this
      const room = rooms.find((room) => room.id === _this.id)
      if (!room) {
        return
      }
      room.devices.map((deviceid) => {
        _this.disconnect(true)
      })
      const roomIndex = rooms.indexOf(room)
      rooms.splice(roomIndex, 1)
    }
  })

  /* 客户端类型
   * 如果是room, 则新建一个房间
   * 如果是device, 则找到对应房间，并将id加入到devices数组中, 同时通知对应房间新建一个设备
   */
  socket.on('type', function (msg) {
    if (msg === 'room') {
      console.log('房间：', this.id, '已创建')

      var room = { id: this.id, devices: [] }
      rooms.push(room)
      this.emit('qrcode', ip())
    } else {
      const { roomid } = url.parse(this.request.headers.referer, true).query
      var room = rooms.find((room) => room.id = roomid)
      if (room && !~room.devices.indexOf(this.id)) {
        console.log('新设备：', this.id, '已进入房间:', roomid)
        room.devices.push(this.id)

        this.broadcast.to(roomid).emit('device', this.id)
      }
    }
  })

  /* 设备的旋转信息
   * 根据请求获取roomid
   * 如果存在此房间，则给房间发送信息
   * 如果不存在，则断开此设备的连接
   */
  socket.on('rotate3d', function (msg) {
    const { roomid } = url.parse(this.request.headers.referer, true).query
    const room = rooms.find((room) => room.id === roomid)

    if (room) {
      this.broadcast.to(roomid).emit('rotate3d', { id: this.id, data: msg })
    } else {
      this.disconnect(true)
    }
  })

  socket.on('file', function (file) {
    console.log(file)
    const { roomid } = url.parse(this.request.headers.referer, true).query
    const room = rooms.find((room) => room.id === roomid)
    if (room) {
      this.broadcast.to(roomid).emit('file', { id: this.id, data: file })
    } else {
      this.disconnect(true)
    }
  })
})

const port = 8002
server.listen(port, '0.0.0.0', () => {
  console.log(`http://${ip()[0]}:${port}`)
})
