const API_KEY = ''
const API_URL = 'https://api.openai.com/v1/chat/completions'

const systemPrompt = 'You are a helpful assistant.'
const userPrompt = `
  给你提供一个对象，'{"OpeningClips":[1,2,3],"ClosingClips":[4,5,6]}'
  我下面给出的文字中如果命中这个对象的key，返回这个对象的值，不要说额外的话，不要说额外的话：
`
const question = '我尝试说 ClosingClips'

const messages = [
  { role: 'system', content: systemPrompt },
  { role: 'user', content: userPrompt },
  { role: 'user', content: question }
  // { role: 'assistant', content: 'xxx' } // 这一段是第一个问题的返回值，后面消息消息携带这个字段可以实现连续对话
]

const resToHtml = (res) => {
  document.querySelector('#answer').innerHTML = res
}

const queryData = async () => {
  const body = {
    model: 'gpt-3.5-turbo',
    temperature: 0,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
    messages: messages
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }
  const res = await window.axios.post(API_URL, body, config)
  console.log(res)

  const { choices } = res.data
  if (!choices || choices.length === 0) {
    return resToHtml('接口未返回结果')
  }
  let resText = choices[0].message.content.trim()

  if (resText.startsWith('"') || resText.startsWith('「')) {
    resText = resText.slice(1)
  }
  if (resText.endsWith('"') || resText.endsWith('」')) {
    resText = resText.slice(0, -1)
  }

  return resText
}

  ; (async () => {
  console.log('main')
  const resText = await queryData()
  resToHtml(resText)
})()
