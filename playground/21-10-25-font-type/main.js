const opentype = require('opentype.js')

const FONT_PATH = '/Users/ringcrl/Desktop/xxx.ttf'

const fontInfo = opentype.loadSync(FONT_PATH)
const fontFamilyMap = fontInfo.names.fontFamily

console.log(fontFamilyMap)
