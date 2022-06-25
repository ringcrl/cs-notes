const roomsocket = io()
roomsocket.emit('type', 'room')
console.log('room')

const isFirst = []
roomsocket.on('file', (res) => {
  console.log(res)
  const arrayBufferView = new Uint8Array(res.data)
  const blob = new Blob([arrayBufferView], { type: 'image/jpeg' })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  const img = document.querySelector('#photo')
  img.src = imageUrl
})

roomsocket.on('device', createBox)

roomsocket.on('qrcode', (ip) => {
  let { href } = location
  if (location.hostname === 'localhost') {
    href = href.replace('localhost', ip[0])
  }
  new QRCode(document.getElementById('qrcode'), `${href}device?roomid=${roomsocket.id}`)
})
roomsocket.on('remove', (id) => {
  const section = document.getElementsByTagName('section')[0]
  const box = document.getElementById(`adj-${id}`)
  if (box) {
    section.removeChild(box)
  }
})

function createBox (id) {
  const box = document.createElement('div')
  box.setAttribute('class', 'adjust')
  box.setAttribute('id', `adj-${id}`)
  box.innerHTML = `
    <div class="box" id="${id}">
        <img id="photo" style="width: 100%" src="../images/front.jpg" />
    </div>
  `
  document.getElementsByTagName('section')[0].appendChild(box)
}

roomsocket.on('connect', () => {
  console.log('已连接')
})
