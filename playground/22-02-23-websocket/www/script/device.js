const usersocket = io()
usersocket.emit('type', 'device')
const lastTime = 0

const fileUpload = document.querySelector('.file-upload')
fileUpload.addEventListener('change', (e) => {
  const file = e.target.files[0]
  console.log(file)
  usersocket.emit('file', file)
})

const degtorad = Math.PI / 180
function getQuaternion (alpha, beta, gamma) {
  const _x = beta ? beta * degtorad : 0 // beta value
  const _y = gamma ? gamma * degtorad : 0 // gamma value
  const _z = alpha ? alpha * degtorad : 0 // alpha value

  const cX = Math.cos(_x / 2)
  const cY = Math.cos(_y / 2)
  const cZ = Math.cos(_z / 2)
  const sX = Math.sin(_x / 2)
  const sY = Math.sin(_y / 2)
  const sZ = Math.sin(_z / 2)

  //
  // ZXY quaternion construction.
  //

  const w = cX * cY * cZ - sX * sY * sZ
  const x = sX * cY * cZ - cX * sY * sZ
  const y = cX * sY * cZ + sX * cY * sZ
  const z = cX * cY * sZ + sX * sY * cZ

  return [w, x, y, z]
}

function getAcQuaternion (_w, _x, _y, _z) { // 我的四元数转旋转轴和旋转角度方法
  const rotate = 2 * Math.acos(_w) / degtorad

  const x = _x / Math.sin(degtorad * rotate / 2) || 0
  const y = _y / Math.sin(degtorad * rotate / 2) || 0
  const z = _z / Math.sin(degtorad * rotate / 2) || 0

  return {
    x, y, z, rotate
  }
}

window.addEventListener('deviceorientation', (evt) => {
  console.log(evt)
  const qu = getQuaternion(evt.alpha, evt.beta, evt.gamma)
  const rotate3d = getAcQuaternion(qu[0], qu[1], qu[2], qu[3])
  // document.getElementById("info").innerHTML = "z轴旋转 alpha: 　" + evt.alpha + "<br>"
  //       + "y轴旋转 gamma: 　" + evt.gamma + "<br>"
  //       + "x轴旋转 beta: 　" + evt.beta

  usersocket.emit('rotate3d', rotate3d)
})

usersocket.on('disconnect', () => {
  document.getElementById('info').innerHTML = '房间已关闭，请重新扫码'
})
