const fibonacci = require('./fibonacci')

// 接收主线程发送过来的任务，并开始查找斐波那契数
process.on('message', (n) => {
  const res = fibonacci(n)
  // 查找结束后通知主线程，以便主线程再度进行任务分配
  process.send({ index: n, res })
})
