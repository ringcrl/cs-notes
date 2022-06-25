const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads')

function generatePrimes (start, range) {
  const primes = []
  let isPrime = true
  const end = start + range
  for (let i = start; i < end; i++) {
    for (let j = 2; j < Math.sqrt(end); j++) {
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

if (isMainThread) {
  const max = 1e7
  const min = 2
  let primes = []

  const threadCount = +process.argv[2] || 2
  const threads = new Set()
  console.log(`Running with ${threadCount} threads...`)
  const range = Math.ceil((max - min) / threadCount)
  let start = min

  for (let i = 0; i < threadCount - 1; i++) {
    const myStart = start
    threads.add(new Worker(__filename, { workerData: { start: myStart, range } }))
    start += range
  }

  threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }))

  for (const worker of threads) {
    worker.on('error', (err) => { throw err })
    worker.on('exit', () => {
      threads.delete(worker)
      console.log(`Thread exiting, ${threads.size} running...`)
      if (threads.size === 0) {
        // console.log(primes.join('\n'))
      }
    })

    worker.on('message', (msg) => {
      primes = primes.concat(msg)
    })
  }
} else {
  const data = generatePrimes(workerData.start, workerData.range)
  parentPort.postMessage(data)
}
