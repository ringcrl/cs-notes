const dataArray = new Uint8Array(1280 * 720 * 4)

function reverse (dataArray, height, width) {
// 需要从上到下颠倒过来
  const halfHeight = (height / 2) | 0 // the | 0 keeps the result an int
  const bytesPerRow = width * 4
  const temp = new Uint8ClampedArray(width * 4)
  for (let y = 0; y < halfHeight; ++y) {
    const topOffset = y * bytesPerRow
    const bottomOffset = (height - y - 1) * bytesPerRow

    // make copy of a row on the top half
    temp.set(dataArray.subarray(topOffset, topOffset + bytesPerRow))

    // copy a row from the bottom half to the top
    dataArray.copyWithin(topOffset, bottomOffset, bottomOffset + bytesPerRow)

    // copy the copy of the top half row to the bottom half
    dataArray.set(temp, bottomOffset)
  }
}

reverse(dataArray)
