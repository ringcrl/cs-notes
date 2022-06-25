function fibonacci (n) {
  if (n === 0 || n === 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// 接收主线程发送过来的任务，并开始查找斐波那契数
process.on('message', (msg) => {
  if (msg.type === 'hello') {
    process.send({
      type: 'hi',
      data: msg.data
    })
  }

  if (msg.type === 'call') {
    const res = fibonacci(35)
    process.send({
      type: 'res',
      src: msg.data,
      data: res
    })
  }
})
