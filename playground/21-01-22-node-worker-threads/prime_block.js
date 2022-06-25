const min = 2
const max = 1e7

function generatePrimes (start, range) {
  const primes = []
  let isPrime = true
  const end = start + range
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
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
console.time('generatePrimes')
const primes = generatePrimes(min, max)
console.timeEnd('generatePrimes')
console.log(primes.length)
