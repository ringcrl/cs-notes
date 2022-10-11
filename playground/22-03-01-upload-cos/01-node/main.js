const argv = require('minimist')(process.argv.slice(2))
const path = require('path')
const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')
const { v4: uuid } = require('uuid')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const {
  SecretId, SecretKey, Bucket, Region, Key
} = process.env

const {
  p
} = argv

let filePath
if (p) {
  filePath = p
} else {
  console.log(`

请输入文件路径: node main.js -p path_to_file，即将进行临时文件上传

`)
  filePath = path.resolve(__dirname, '../package.json')
}

(async () => {
  const fileInfo = fs.statSync(filePath)
  const fileSize = fileInfo.size
  const startTime = Date.now()

  const cos = new COS({
    SecretId,
    SecretKey
  })

  const postfix = filePath.split('.').pop()
  const fileName = `${uuid()}.${postfix}`
  const fileKey = `${Key}/${fileName}`

  // 1、分片上传
  cos.sliceUploadFile({
    Bucket,
    Region,
    Key: fileKey,
    FilePath: filePath,
    SliceSize: 1024 * 1024 * 32,
    AsyncLimit: 10,
    onTaskReady (taskId) {
      console.log(taskId)
    }
  }, (err, data) => {
    const requestId = (err || data).headers['x-cos-request-id']
    console.log('requestId', requestId)
    if (err) {
      return console.error(err)
    }
    console.log('data', data)
    console.log('平均速度：', `${(fileSize / 1024 / 1024) / ((Date.now() - startTime) / 1000)} MB/s`)
  })

  // 2、根据大小自动切换分片上传
  // cos.uploadFile(
  //   {
  //     Bucket,
  //     Region,
  //     Key: fileKey,
  //     FilePath: filePath,
  //     SliceSize: 1024 * 1024 * 32,
  //     AsyncLimit: 10,
  //     onTaskReady(taskId) { /* 非必须 */
  //       console.log('taskId', taskId);
  //     },
  //   // },
  //   },
  //   (err, data) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log('data', data);
  //     console.log('平均速度：', `${(fileSize / 1024 / 1024) / ((Date.now() - startTime) / 1000)} MB/s`);
  //   },
  // );
})()
