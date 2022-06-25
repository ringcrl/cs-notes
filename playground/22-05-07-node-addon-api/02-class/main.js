const testAddon = require('./build/Release/testAddon.node')

console.log('testAddon', testAddon)

const classInstance = new testAddon.ClassExample(4.3)
console.log('Testing class initial value : ', classInstance.getValue())
console.log('After adding 3.3 : ', classInstance.add(3.3))
