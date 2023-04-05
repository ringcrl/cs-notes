import { load } from 'cheerio'
import * as axios from 'axios'

import { cookie } from './cookie'

async function getPageData (keywork, cookie) {
  const pageData = await axios.get(`https://www.zmji.net/danci/${keywork}`, {
    headers: {
      cookie: cookie
    }
  })
  return pageData.data
}

function pageDataToTextList (pageData) {
  const $ = load(pageData)
  const textList = []
  $('.jiyi.mx-1.zjxx2').each((i, el) => {
    el.children.forEach((child) => {
      if (child.type === 'text') {
        textList.push(child.data.replace(/\s|\n/g, ''))
      }
    })
  })
  const res = textList.filter(_ => !!_)
  return res
}

async function test (keywork, cookie) {
  const pageData = await getPageData(keywork, cookie)
  const textList = pageDataToTextList(pageData)
  console.log(textList)
}

// test('leak', cookie)

export {
  getPageData,
  pageDataToTextList
}
