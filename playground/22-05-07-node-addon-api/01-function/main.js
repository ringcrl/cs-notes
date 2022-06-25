const testAddon = require('./build/Release/testAddon.node')

console.log(testAddon)
console.log(testAddon.hello())
console.log('add ', testAddon.add(5, 10))
