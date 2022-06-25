const { spawn, Thread, Worker } = require('threads')
const longTask = require('./longTask');

(async () => {
  console.time('longTask')
  longTask()
  console.timeEnd('longTask')

  const work = await spawn(new Worker('./work'))
  console.time('workLongTask')
  await work.longTask()
  console.timeEnd('workLongTask')

  await Thread.terminate(work)
})()
