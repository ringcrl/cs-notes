const xhr = new XMLHttpRequest()

xhr.addEventListener('progress', updateProgress)
xhr.addEventListener('load', transferComplete)
xhr.addEventListener('error', transferFailed)
xhr.addEventListener('abort', transferCanceled)

// xhr.open('GET', 'http://127.0.0.1:3001');
// xhr.open('GET', '../_test/output.txt');
xhr.open('GET', 'xxx')
xhr.send()

let lastPos = 0
xhr.onreadystatechange = function () {
  console.log('onreadystatechange')
  console.log(xhr)
  if (xhr.readyState === 3) {
    const data = xhr.responseText.substring(lastPos)
    lastPos = xhr.responseText.length

    process(data)
  }
}

function process (data) {
  console.log(`部分数据: ${lastPos}`)
}

// 服务端到客户端的传输进程（下载）
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    const percentComplete = oEvent.loaded / oEvent.total * 100
    // console.log(oEvent.target.response);
    console.log(percentComplete)
    // ...
  } else {
    // 总大小未知时不能计算进程信息
  }
}

function transferComplete (evt) {
  console.log('The transfer is complete.')
}

function transferFailed (evt) {
  console.log('An error occurred while transferring the file.')
}

function transferCanceled (evt) {
  console.log('The transfer has been canceled by the user.')
}
