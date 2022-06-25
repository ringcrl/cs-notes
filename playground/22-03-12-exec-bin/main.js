const { execSync } = require('child_process')
const path = require('path')

const binPath = path.resolve(__dirname, '../22-01-23-C++/main')
const cmd = `${binPath}`
const res = execSync(cmd)
console.log(res.toString())
