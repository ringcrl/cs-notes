
const path = require('path')

const bodyParser = require('body-parser')
const STS = require('qcloud-cos-sts')
const express = require('express')
const cors = require('cors')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const {
  SecretId, SecretKey, Bucket, Region, Key
} = process.env

// 创建临时密钥服务和用于调试的静态服务
const app = express()

app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

const config = {
  secretId: SecretId,
  secretKey: SecretKey,
  durationSeconds: 2,
  bucket: Bucket,
  region: Region,
  // 允许操作（上传）的对象前缀，可以根据自己网站的用户登录态判断允许上传的目录，例子： user1/* 或者 * 或者a.jpg
  // 请注意当使用 * 时，可能存在安全风险，详情请参阅：https://cloud.tencent.com/document/product/436/40265
  allowPrefix: `${Key}/*`,
  // 密钥的权限列表
  allowActions: [
    // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923

    // 简单上传
    'name/cos:PutObject',
    'name/cos:PostObject',
    // 分片上传
    'name/cos:InitiateMultipartUpload',
    'name/cos:ListMultipartUploads',
    'name/cos:ListParts',
    'name/cos:UploadPart',
    'name/cos:CompleteMultipartUpload'
  ]
}

// 格式一：临时密钥接口
app.all('/sts', function (req, res, next) {
  // 获取临时密钥
  const AppId = config.bucket.substr(config.bucket.lastIndexOf('-') + 1)
  // 数据万象DescribeMediaBuckets接口需要resource为*,参考 https://cloud.tencent.com/document/product/460/41741
  const policy = {
    version: '2.0',
    statement: [{
      action: config.allowActions,
      effect: 'allow',
      resource: [
        'qcs::cos:' + config.region + ':uid/' + AppId + ':' + config.bucket + '/' + config.allowPrefix
      ]
    }]
  }
  const startTime = Math.round(Date.now() / 1000)
  STS.getCredential({
    secretId: config.secretId,
    secretKey: config.secretKey,
    durationSeconds: config.durationSeconds,
    policy: policy
  }, function (err, tempKeys) {
    if (err) {
      return res.send(err)
    }

    Object.assign(tempKeys, {
      startTime: startTime
    })

    res.send(tempKeys)
  })
})

app.all('*', function (req, res, next) {
  res.send({ code: -1, message: '404 Not Found' })
})

// 启动签名服务
const PORT = 3300
app.listen(PORT)
console.log(`获取临时密钥：http://127.0.0.1:${PORT}/sts`)
