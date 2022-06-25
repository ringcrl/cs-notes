// 计算 start, 至 start + range 之间的素数
function generatePrimes (start, range) {
  const primes = []
  let isPrime = true
  const end = start + range
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false
        break;
      }
    }

    if (isPrime) {
      primes.push(i)
    }

    isPrime = true
  }
  return primes
}

/**
* - 加载clustr模块
* - 设定启动进程数为cpu个数
*/
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

// 素数的计算
const min = 2
const max = 1e7 // = 10000000
let primes = []

if (cluster.isMaster) {
  const range = Math.ceil((max - min) / numCPUs)
  let start = min

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork() // 启动子进程
    //  在主进程中，这会发送消息给特定的工作进程
    worker.send({ start, range })

    start += range

    worker.on('message', (msg) => {
      primes = primes.concat(msg.data)
      worker.kill()
    })
  }
  // 当任何一个工作进程关闭的时候，cluster 模块都将会触发 'exit' 事件
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // 监听子进程发送的信息
  process.on('message', (msg) => {
    console.log(msg)
    const { start, range } = msg
    const data = generatePrimes(start, range)
    // 在工作进程中，这会发送消息给主进程
    process.send({ data })
  })
}
