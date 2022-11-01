export interface Line {
  id: string
  startTimeStr: string
  startTime: number
  endTimeStr: string
  endTime: number
  duration: number
  text: string
}

const timestampToSeconds = (srtTimestamp: string): number => {
  const [rest, millisecondsString] = srtTimestamp.split(',')
  const milliseconds = parseInt(millisecondsString)
  const [hours, minutes, seconds] = rest.split(':').map((x) => parseInt(x))
  return milliseconds * 0.001 + seconds + 60 * minutes + 3600 * hours
}

export default class SrtParser {
  seperator = ','

  correctFormat (time: string): string {
    // Fix the format if the format is wrong
    // 00:00:28.9670 Become 00:00:28,967
    // 00:00:28.967  Become 00:00:28,967
    // 00:00:28.96   Become 00:00:28,960
    // 00:00:28.9    Become 00:00:28,900

    // 00:00:28,96   Become 00:00:28,960
    // 00:00:28,9    Become 00:00:28,900
    // 00:00:28,0    Become 00:00:28,000
    // 00:00:28,01   Become 00:00:28,010
    // 0:00:10,500   Become 00:00:10,500
    const str = time.replace('.', ',')

    let hour = null
    let minute = null
    let second = null
    let millisecond = null

    // Handle millisecond
    const [front, ms] = str.split(',')
    millisecond = this.fixedStrDigit(3, ms)

    // Handle hour
    const [aHour, aMinute, aSecond] = front.split(':')
    hour = this.fixedStrDigit(2, aHour, false)
    minute = this.fixedStrDigit(2, aMinute, false)
    second = this.fixedStrDigit(2, aSecond, false)

    return `${hour}:${minute}:${second},${millisecond}`
  }

  /*
  // make sure string is 'howManyDigit' long
  // if str is shorter than howManyDigit, pad with 0
  // if str is longer than howManyDigit, slice from the beginning
  // Example:
  Input: fixedStrDigit(3, '100')
  Output: 100
  Explain: unchanged, because "100" is 3 digit
  Input: fixedStrDigit(3, '50')
  Output: 500
  Explain: pad end with 0
  Input: fixedStrDigit(3, '50', false)
  Output: 050
  Explain: pad start with 0
  Input: fixedStrDigit(3, '7771')
  Output: 777
  Explain: slice from beginning
  */
  private fixedStrDigit (
    howManyDigit: number,
    str: string,
    padEnd: boolean = true
  ): string {
    if (str.length === howManyDigit) {
      return str
    }
    if (str.length > howManyDigit) {
      return str.slice(0, howManyDigit)
    }
    if (str.length < howManyDigit) {
      if (padEnd) {
        return str.padEnd(howManyDigit, '0')
      } else {
        return str.padStart(howManyDigit, '0')
      }
    }

    return ''
  }

  private tryComma (data: string): string[] {
    data = data.replace(/\r/g, '')
    const regex =
      /(\d+)\n(\d{1,2}:\d{2}:\d{2},\d{1,3}) --> (\d{1,2}:\d{2}:\d{2},\d{1,3})/g
    const dataArray = data.split(regex)
    dataArray.shift() // remove first '' in array
    return dataArray
  }

  private tryDot (data: string): string[] {
    data = data.replace(/\r/g, '')
    const regex =
      /(\d+)\n(\d{1,2}:\d{2}:\d{2}\.\d{1,3}) --> (\d{1,2}:\d{2}:\d{2}\.\d{1,3})/g
    const dataArray = data.split(regex)
    dataArray.shift() // remove first '' in array
    this.seperator = '.'
    return dataArray
  }

  fromSrt (data: string): Line[] {
    const originalData = data
    let dataArray = this.tryComma(originalData)
    if (dataArray.length === 0) {
      dataArray = this.tryDot(originalData)
    }

    const items: Line[] = []
    for (let i = 0; i < dataArray.length; i += 4) {
      const startTimeStr = this.correctFormat(dataArray[i + 1].trim())
      const endTimeStr = this.correctFormat(dataArray[i + 2].trim())
      const startTime = timestampToSeconds(startTimeStr)
      const endTime = timestampToSeconds(endTimeStr)
      const duration = endTime - startTime
      const newLine = {
        id: dataArray[i].trim(),
        startTimeStr,
        startTime,
        endTimeStr,
        endTime,
        duration,
        text: dataArray[i + 3].trim()
      }
      items.push(newLine)
    }

    return items
  }

  toSrt (data: Line[]): string {
    let res = ''

    for (let i = 0; i < data.length; i++) {
      const s = data[i]
      res += s.id + '\r\n'
      res += s.startTimeStr + ' --> ' + s.endTimeStr + '\r\n'
      res += s.text.replace('\n', '\r\n') + '\r\n\r\n'
    }

    return res
  }
}

const test1 = `
1
00:00:03,120 --> 00:00:06,040
Hi, I’m Carrie Anne, and welcome to Crash Course Computer Science!

2
00:00:06,040 --> 00:00:08,219
111

3
00:00:08,219 --> 00:00:12,080
If you’ve watched the whole series, hopefully you’ve developed a newfound appreciation
`

const srtParser = new SrtParser()
const res = srtParser.fromSrt(test1)
console.log(res)
