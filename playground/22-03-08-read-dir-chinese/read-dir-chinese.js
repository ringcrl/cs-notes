const fs = require('fs')
const path = require('path')
const hashString = require('hash-string')
// const translate = require('../22-03-08-translate/translate');

function getFileChineseList (filePath) {
  const chineseReg = /([\u4e00-\u9fa5])+/g
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const chineseList = fileContent.match(chineseReg)
  if (chineseList) return chineseList
  return []
}

function readDirFiles (dir, filesList = []) {
  const allowFiles = ['js', 'ts', 'vue']
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readDirFiles(path.join(dir, item), filesList) // 递归读取文件
    } else {
      // 只允许配置文件
      if (allowFiles.includes(fullPath.split('.')[1])) {
        filesList.push(fullPath)
      }
    }
  })
  return filesList
}

function getDirFilesUniqueChineseList (dir) {
  const files = readDirFiles(dir)
  const chinessList = []
  files.forEach((file) => {
    const fileChineseList = getFileChineseList(file)
    chinessList.push(...fileChineseList)
  })
  const uniqueChineseList = [...new Set(chinessList)]
  return uniqueChineseList
}

// async function translateList(textList) {
//   const testList = textList.slice(100, 110);
//   const testMap = {};
//   for (const text of testList) {
//     const textRes = await translate(text);
//     testMap[text] = textRes;
//   }
//   return testMap;
// }

const keyMap = new Map()
function hashKey (value, context) {
  const key = `k_${
    (`0000${hashString(value.replace(/\s+/g, '')).toString(36)}`).slice(-7)}`
  const existedValue = keyMap.get(context ? `${key}_${context}` : key)
  if (existedValue && existedValue !== value) {
    console.error('existedValue !== value', existedValue, value)
  } else {
    keyMap.set(context ? `${key}_${context}` : key, value)
  }
  return key
}

(async () => {
  // 获取目录所有中文，存储到文件
  // const dirPath = 'path_to_dir';
  // const uniqueChineseList = getDirFilesUniqueChineseList(dirPath);
  // const res = {};
  // uniqueChineseList.forEach((text) => {
  //   const key = hashKey(text);
  //   res[key] = text;
  // });
  // fs.writeFileSync(path.resolve(__dirname, './cache/1.json'), JSON.stringify(res, null, 2));

  // 翻译字段
  // const res = await translateList(uniqueChineseList);

  // 校验后文件去重，重新生成新文件
  // const textMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, './cache/1.json'), 'utf-8'));
  // let resList = [];
  // Object.keys(textMap).forEach((key) => {
  //   const value = textMap[key];
  //   resList.push(value);
  // });
  // resList = [...new Set(resList)];
  // const resMap = {};
  // resList.forEach((text) => {
  //   const key = hashKey(text);
  //   resMap[key] = text;
  // });
  // fs.writeFileSync(path.resolve(__dirname, './cache/res.json'), JSON.stringify(resMap, null, 2));
})()
