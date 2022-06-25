const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const path = require('path')

cluster.setupMaster({
  exec: path.resolve(__dirname, './worker.js'),
  slient: true
})

function * TaskGenerator (count) {
  for (let i = 0; i < count; i++) {
    yield i
  }
}

const resList = []

function run () {
  const startTime = Date.now()
  const totalCount = 45
  let completedCount = 0

  const taskGenerator = TaskGenerator(totalCount)

  if (cluster.isMaster) {
    cluster.on('fork', (worker) => {
      console.log(`[master] : fork worker ${worker.id}`)
    })
    cluster.on('exit', (worker) => {
      console.log(`[master] : worker ${worker.id} died`)
    })

    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork()

      // 接收子进程数据
      worker.on('message', function (payload) {
        completedCount++

        const { index, res } = payload

        console.log(`process: ${completedCount}/${totalCount}`)

        resList[index] = res

        nextTask(this)
      })

      nextTask(worker)
    }
  } else {
    process.on('message', (msg) => {
      console.log(msg)
    })
  }

  function nextTask (worker) {
    const data = taskGenerator.next()
    if (data.done) {
      done()
      return;
    }

    // 向子进程发送消息
    worker.send(data.value)
  }

  function done () {
    if (completedCount >= totalCount) {
      cluster.disconnect()
      console.log(resList)
      console.info(`任务完成，用时: ${Date.now() - startTime}ms`)
    }
  }
}

run()
