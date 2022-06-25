function longTask () {
  let count = 0
  for (let i = 0; i < 1000000000; i++) {
    count += i
  }
  return count
}

module.exports = longTask
