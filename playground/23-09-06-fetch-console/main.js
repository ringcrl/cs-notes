async function main () {
  // fetch 测试 json
  const start = Date.now()
  const resFetchA = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()
  console.log('time1', Date.now() - start)
  console.log('resFetchA', resFetchA)
  const resFetchB = await (await fetch('https://jsonplaceholder.typicode.com/todos/2')).json()
  console.log('time2', Date.now() - start)
  console.log('resFetchB', resFetchB)
}

function loop () {
  for (let i = 0; i < 10000; i++) {
    console.log('1')
  }
}

(async () => {
  main()
  // loop()
})()
