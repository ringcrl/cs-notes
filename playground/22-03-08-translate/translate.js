// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require('tencentcloud-sdk-nodejs')
require('dotenv').config()

const {
  SecretId, SecretKey
} = process.env

const TmtClient = tencentcloud.tmt.v20180321.Client

const clientConfig = {
  credential: {
    secretId: SecretId,
    secretKey: SecretKey
  },
  region: 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'tmt.tencentcloudapi.com'
    }
  }
}

const client = new TmtClient(clientConfig)

async function translate (text) {
  const params = {
    SourceText: text,
    Source: 'zh',
    Target: 'en',
    ProjectId: 0
  }
  const res = await client.TextTranslate(params)
  return res.TargetText
}

// (async () => {
//   const res = await translate('测试');
//   console.log(res);
// })();

module.exports = translate
