function fibonacci (n) {
  if (n === 0 || n === 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const startTime = Date.now()
const totalCount = 500
let completedCount = 0

for (let i = 0; i < totalCount; i++) {
  fibonacci(35)
  completedCount++
  console.log(`process: ${completedCount}/${totalCount}`)
}
console.info(`任务完成，用时: ${Date.now() - startTime}ms`)
