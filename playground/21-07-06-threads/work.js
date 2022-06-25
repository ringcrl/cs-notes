const { expose } = require('threads/worker')
const longTask = require('./longTask')

expose({
  longTask () {
    return longTask()
  }
})
