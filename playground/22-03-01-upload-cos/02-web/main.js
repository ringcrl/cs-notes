// 请求用到的参数
const Bucket = 'cdn-1257430323'
const Region = 'ap-guangzhou'
const KeyPrefix = 'temp'

const ChunkSize = 1024 * 1024 * 8

// 初始化 SDK
const cos = new COS({
  getAuthorization: function (options, callback) {
    const url = 'http://127.0.0.1:3300/sts'
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function (e) {
      try {
        const data = JSON.parse(e.target.responseText)
        const credentials = data.credentials
        if (!data || !credentials) {
          return console.error('credentials invalid')
        }
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          SecurityToken: credentials.sessionToken,
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
        })
      } catch (e) { }
    }
    xhr.send()
  }
})

// 上传文件
const uploadFile = function (file, callback) {
  cos.uploadFile(
    {
      Bucket /* 填写自己的bucket，必须字段 */,
      Region /* 存储桶所在地域，必须字段 */,
      Key:
        KeyPrefix +
        '/' +
        file.name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
      Body: file, // 上传文件对象
      SliceSize:
        1024 *
        1024 *
        1 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData))
      }
    },
    function (err, data) {
      if (err) {
        return console.error('上传失败', err)
      }
      console.log('上传成功', data)
    }
  )
}

// 监听表单提交
document.getElementById('submitBtn').onclick = function (e) {
  const file = document.getElementById('fileSelector').files[0]
  if (!file) {
    document.getElementById('msg').innerText = '未选择上传文件'
    return
  }
  file &&
    uploadFile(file, function (err, data) {
      console.log(err || data)
      document.getElementById('msg').innerText =
        err || '上传成功，ETag=' + data.ETag
    })
}
