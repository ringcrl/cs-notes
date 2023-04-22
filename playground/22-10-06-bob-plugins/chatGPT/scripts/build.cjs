const fs = require('fs-extra')
const path = require('path')
const AdmZip = require('adm-zip')

const argv = require('minimist')(process.argv.slice(2))
const { name = 'chatgpt', prompt = 'you are a helpful assistant' } = argv

const SRC_DIR = path.resolve(__dirname, '../src')
const PLUGIN_DIR = path.resolve(__dirname, `../release/${name}.bobplugin`)
const INFO_TEMPLATE_PATH = path.resolve(__dirname, '../src/_info.json')
const INFO_PATH = path.resolve(__dirname, '../src/info.json')

const build = () => {
  // 写入 prompt 文件
  fs.writeFileSync(path.resolve(__dirname, '../src/user-prompt.js'), `exports.userPrompt = '${prompt}'\n`)

  // 根据 _info.json 模板生成新的 info.json
  const info = JSON.parse(fs.readFileSync(INFO_TEMPLATE_PATH))
  info.name = name
  info.identifier = `ringcrl.openai.${name}`
  fs.writeFileSync(INFO_PATH, JSON.stringify(info, null, 2))

  // 将 src 目录所有文件打包成 zip
  const zip = new AdmZip()
  const files = fs.readdirSync(SRC_DIR)
  for (const file of files) {
    zip.addLocalFile(`${SRC_DIR}/${file}`)
  }
  zip.writeZip(PLUGIN_DIR)
}

build()
