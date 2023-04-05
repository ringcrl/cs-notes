import * as Bob from '@bob-plug/core'
import { pageDataToTextList, getPageData } from './helper'
import { cookie } from './cookie'

function translate (query, completion) {
  if (!query.text || query.text.split(' ').length > 2) {
    return completion({
      error: {
        type: 'notFound'
      }
    })
  }
  const text = query.text

  Bob.api.$http.get({
    url: `http://127.0.0.1:11111/word/${text}`,
    handler: (res) => {
      Bob.api.$log.error(JSON.stringify(res.data))
      const list = res.data

      if (list.length === 0) {
        return completion({
          error: {
            type: 'notFound'
          }
        })
      }

      completion({
        result: {
          toParagraphs: list
        }
      })
    }
  })
}

function supportLanguages () {
  return ['zh-Hans', 'zh-Hant', 'en']
}
