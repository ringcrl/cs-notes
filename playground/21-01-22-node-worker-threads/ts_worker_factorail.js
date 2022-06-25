const path = require('path')

require('ts-node').register()

require(path.resolve(__dirname, './ts_worker_factorial.ts'))
