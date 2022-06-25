const promiseCacahe = new Map()
const proIndex = {
  keyIndex: 0,
  dataIndex: 1
}
function genSamePromise (cacheKey, functionReturnPromise) {
  const expireTime = 60 * 1000
  const keyStr = JSON.stringify(cacheKey)
  const totalPs = promiseCacahe.entries()
  let target = totalPs.next()
  const willExpireKeys = []

  /**
   * 清理缓存内的数据
   */
  while (!target.done) {
    const mapKey = target.value[proIndex.keyIndex]
    const val = target.value[proIndex.dataIndex]
    const now = Date.now()
    if (now > val.expire) {
      willExpireKeys.push(mapKey)
    }
    target = totalPs.next()
  }
  willExpireKeys.forEach((item) => {
    promiseCacahe.delete(item)
  })
  if (!promiseCacahe.has(keyStr)) {
    promiseCacahe.set(keyStr, {
      val: functionReturnPromise(),
      expire: new Date().getTime() + expireTime
    })
  }
  return promiseCacahe.get(keyStr).val
}

function functionReturnPromise () {
  console.log('functionReturnPromise call')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('res')
    }, 1000)
  })
}

(async () => {
  console.time('time')
  const a = genSamePromise('1', functionReturnPromise)
  const b = genSamePromise('1', functionReturnPromise)
  const c = genSamePromise('1', functionReturnPromise)

  const res = await Promise.all([a, b, c])
  console.log(res)
  console.timeEnd('time')
})()
