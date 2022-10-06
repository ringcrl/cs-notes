import * as Bob from '@bob-plug/core'
import { pageDataToTextList, getPageData } from './helper'
import { cookie } from './cookie'

function translate (query, completion) {
  if (!query.text || query.text.split(' ').length > 2) {
    completion({
      error: {
        type: 'notFound'
      }
    })
    return
  }
  const text = query.text

  Bob.api.$http.get({
    url: `http://127.0.0.1:11111/word/${text}`,
    handler: (res) => {
      Bob.api.$log.error(JSON.stringify(res.data))
      completion({
        result: {
          toParagraphs: res.data
        }
      })
    }
  })
}

function supportLanguages () {
  return ['zh-Hans', 'zh-Hant', 'en']
}
