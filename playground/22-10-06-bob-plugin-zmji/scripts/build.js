const path = require('path')

const AdmZip = require('adm-zip')
const { version } = require('../package.json')

const MAIN_JS_PATH = path.resolve(__dirname, '../build/main.js')
const PLUGIN_NAME = `bob-plugin-zmji${version}.bobplugin`
const ARTIFACT_PATH = path.resolve(__dirname, `../build/${PLUGIN_NAME}`)

const INFO_JSON = {
  identifier: 'bob-plugin-zmji',
  version: version,
  category: 'translate',
  name: '怎么记',
  minBobVersion: '0.8.0'
}

const createZip = () => {
  const zip = new AdmZip()
  zip.addLocalFile(MAIN_JS_PATH)
  zip.addLocalFile(path.resolve(__dirname, '../static/icon.png'))
  zip.addFile('info.json', JSON.stringify(INFO_JSON))
  zip.writeZip(ARTIFACT_PATH)
  console.log(new Date(), 'Zip created')
}

require('esbuild')
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    platform: 'node',
    treeShaking: false,
    outfile: MAIN_JS_PATH,
    watch: {
      onRebuild (error, result) {
        if (error) {
          console.error('watch build failed:', error)
        } else {
          console.log('watch build succeeded:', result)
          createZip()
        }
      }
    }
  })
  .then(() => {
    createZip()
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
