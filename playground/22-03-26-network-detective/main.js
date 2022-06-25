function getDownlink () {
  return navigator.connection.downlink
}

async function getDownloadSpeed () {
  return new Promise((resolve, reject) => {
    requestIdleCallback(() => {
      const fileSrc = '//cdn-1257430323.cos.ap-guangzhou.myqcloud.com/assets/imgs/1920-960.png'
      const fileSize = 3.88

      const testImg = new Image()
      testImg.src = fileSrc
      const st = Date.now()
      testImg.onload = showSpeed

      function showSpeed () {
        const _fileSize = fileSize // measured in MB
        const et = Date.now()
        const speed = Math.round(_fileSize) / ((et - st) / 1000)
        resolve(speed)
      }
    })
  })
}

(async () => {
  const downlink = getDownlink()
  let downloadSpeed = await getDownloadSpeed()
  downloadSpeed = downloadSpeed.toFixed(1)

  document.querySelector('#downlink').innerHTML = `${downlink}MB/s`
  document.querySelector('#download-speed').innerHTML = `${downloadSpeed}MB/s`
})()
