const fs = require('fs')
const path = require('path')

const BASE_PATH = __dirname

// // 同步创建文件夹
function mkdirs (dir) {
  let paths = dir.split('/')
  paths = paths.filter((_) => _ !== '')
  for (let i = 1; i < paths.length; i++) {
    // slice 左闭右包
    const newPath = `/${paths.slice(0, i + 1).join('/')}`
    console.log(newPath)
    try {
      // 是否能访问到这个文件，如果能访问到，说明这个文件已经存在，进入循环的下一步。
      // accessSync的第二个参数就是用来判断该文件是否能被读取
      fs.accessSync(newPath, fs.constants.R_OK)
    } catch (e) {
      fs.mkdirSync(newPath)
    }
  }
}
mkdirs(path.resolve(BASE_PATH, 'a/b/c'))

// 同步删除文件夹或文件
function removePath (_path, isRecursion) {
  if (!fs.existsSync(_path)) {
    return
  }

  if (!isRecursion) {
    const stat = fs.statSync(_path)
    if (stat.isDirectory()) {
      // 如果是文件夹就递归下去
      removePath(_path, true)
      return
    }
    // 删除文件
    fs.unlinkSync(_path)
    return
  }

  const files = fs.readdirSync(_path)
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(_path, files[i])
    const stat = fs.statSync(newPath)
    if (stat.isDirectory()) {
      // 如果是文件夹就递归下去
      removePath(newPath, true)
    } else {
      // 删除文件
      fs.unlinkSync(newPath)
    }
  }
  fs.rmdirSync(_path)// 如果文件夹是空的，就将自己删除掉
}
removePath(path.resolve(BASE_PATH, 'a'))
