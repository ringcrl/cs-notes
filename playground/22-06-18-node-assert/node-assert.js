// In strict assertion mode, error messages for objects display a diff
const assert = require('assert/strict')

// In legacy assertion mode, error messages for objects display the objects, often truncated
// const assert = require('assert');

const a1 = { a: 1 }
const a2 = { a: 1 }

assert.deepEqual(a1, a2)

const a3 = { a: 1, b: 2 }
const a4 = { b: 2, a: 1 }
assert.deepEqual(a3, a4)

const a5 = 1 / 3
const a6 = 1 / 3
assert.deepEqual(a5, a6)

// 误差精度为2的-50次方
function isDivisibleBy (dividend, divisor) {
  if (divisor === 0) return true
  const quotient = dividend / divisor
  const diff = Math.abs(Math.round(quotient) - quotient)
  return diff < Number.EPSILON * 0b100
}
const a7 = 0.1 + 0.2
const a8 = 0.3
assert.deepEqual(isDivisibleBy(a7, a8), true)

function getFrameAlign (frameRage, startTime) {
  // 会丢失精度
  // return Number.isInteger(startTime / (1000 / frameRage));

  const msPerFrame = 1000 / frameRage
  const gtValue = Math.ceil(startTime / msPerFrame)
  const quotient = startTime / msPerFrame
  return isDivisibleBy(gtValue, quotient)
}
assert.deepEqual(getFrameAlign(25, 0), true)
assert.deepEqual(getFrameAlign(25, 40), true)
assert.deepEqual(getFrameAlign(25, 41), false)
assert.deepEqual(getFrameAlign(25, 1000), true)
assert.deepEqual(getFrameAlign(30, 0), true)
assert.deepEqual(getFrameAlign(30, 100), true)
assert.deepEqual(getFrameAlign(30, 101), false)
assert.deepEqual(getFrameAlign(30, 1000), true)
assert.deepEqual(getFrameAlign(60, 0), true)
assert.deepEqual(getFrameAlign(60, 1000), true)
assert.deepEqual(getFrameAlign(60, 1001), false)
assert.deepEqual(getFrameAlign(60, 1500), true)

function getSegmentStartTime (opts) {
  const {
    itemStartTime, itemSection, itemDuration, startTime
  } = opts
  let currTime = itemSection?.from || 0
  const playRate = itemSection
    ? (itemSection.to - itemSection.from) / itemDuration
    : 1
  const diffTime = (startTime - itemStartTime) * playRate
  if (diffTime > 0) {
    currTime += diffTime
  }
  return currTime
}
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 0, itemSection: { from: 0, to: 2000 }, itemDuration: 2000, startTime: 0
}), 0)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 0, itemSection: { from: 0, to: 2000 }, itemDuration: 2000, startTime: 1000
}), 1000)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 0, itemSection: { from: 0, to: 2000 }, itemDuration: 2000, startTime: 2000
}), 2000)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 1000, itemSection: { from: 0, to: 2000 }, itemDuration: 2000, startTime: 0
}), 0)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 1000, itemSection: { from: 1000, to: 2000 }, itemDuration: 1000, startTime: 1000
}), 1000)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 1000, itemSection: { from: 1000, to: 2000 }, itemDuration: 1000, startTime: 1500
}), 1500)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 1000, itemSection: undefined, itemDuration: 2000, startTime: 1500
}), 500)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 1000, itemSection: { from: 1000, to: 2000 }, itemDuration: 1000, startTime: 500
}), 1000)
assert.deepEqual(getSegmentStartTime({
  itemStartTime: 0, itemSection: { from: 0, to: 2000 }, itemDuration: 8000, startTime: 500
}), 125)
