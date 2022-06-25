const fibonacci = require('./fibonacci')

const startTime = Date.now()
const totalCount = 45
let completedCount = 0

for (let i = 0; i < totalCount; i++) {
  const res = fibonacci(i)
  completedCount++
  console.log(`process: ${completedCount}/${totalCount}：${res}`)
}
console.info(`任务完成，用时: ${Date.now() - startTime}ms`)
