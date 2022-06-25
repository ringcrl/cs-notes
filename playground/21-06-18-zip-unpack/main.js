const path = require('path')
const cp = require('child_process')
const AdmZip = require('adm-zip')

// tar 炸弹：https://zh.wikipedia.org/wiki/Tar
// 攻击者利用绝对路径，或者“tar -cf bomb.tar *”的方式创建的tar文件
// 然后诱骗受害者在根目录下解压，或者使用绝对路径解压
// 可能使受害系统上已有的文件被覆盖掉，或者导致当前工作目录凌乱不堪，这就是所谓的“tar炸弹”
// 因此，要养成良好的解压习惯：
// - 拒绝使用绝对路径
// - 新建一个临时子目录，然后在这个子目录里解压
// - 解压前用“t”查看tar的文件内容

const MAX_UNZIP_FILE_NUM = 1000 // 解压后文件数量上限 1000
const MAX_UNZIP_TOTAL_FILE_SIZE = 4 * 1024 * 1024 * 1024 // 解压后文件总存储上限 4GB
const SUBFOLDER_NAME = 'cache'
const SUBFOLDER_PATH = path.resolve(__dirname, SUBFOLDER_NAME)

cp.execSync(`rm -rf ${SUBFOLDER_PATH}`)
cp.execSync(`mkdir ${SUBFOLDER_PATH}`)

async function unzip (zipFilePath, unzipDir) {
  const zip = new AdmZip(zipFilePath)

  const zipEntries = zip.getEntries() // an array of ZipEntry records

  if (zipEntries.length > MAX_UNZIP_FILE_NUM) {
    throw new Error('解压后文件数量上限 1000')
  }

  let totalFileSize = 0
  zipEntries.forEach((zipEntry) => {
    totalFileSize += zipEntry.header.size
  })
  if (totalFileSize > MAX_UNZIP_TOTAL_FILE_SIZE) {
    throw new Error('解压后文件总存储上限 4GB')
  }

  zip.extractAllTo(/* target path */ unzipDir, /* overwrite */ true)
}

(async () => {
  await unzip(path.resolve(__dirname, '1.mpzp'), SUBFOLDER_PATH)
  console.log('解压缩完成')
})()
