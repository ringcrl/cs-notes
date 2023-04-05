import { pageDataToTextList, getPageData } from './helper'
import { cookie } from './cookie'

const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()
router.get('/word/:word', async (ctx: any, next: any) => {
  console.log(ctx.params.word)
  const word = ctx.params.word
  const pageData = await getPageData(word, cookie)
  const textList = pageDataToTextList(pageData)
  ctx.body = textList
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(11111)
