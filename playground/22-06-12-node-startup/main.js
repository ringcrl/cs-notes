const fs = require('fs')

console.log('服务已初始化')

const tmpArgvList = fs.readFileSync('/tmp/node_start_fifo')
console.log('参数：', tmpArgvList)

console.log('服务已启动')

fs.writeFileSync('/tmp/node_finish_fifo', 'finish')

console.log('服务已退出')
