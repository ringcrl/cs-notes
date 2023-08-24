const express = require('express')
const { pipeline } = require('node:stream/promises')
const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')

dotenv.config()

const app = express()
const port = 8888

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.json()) // for the body of the request

app.post('/chatapi', async (req, res) => {
  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `${req.body.message || 'Say hello.'}`
      }
    ],
    temperature: 0,
    max_tokens: 25,
    n: 1,
    stream: true
  })

  try {
    const response = await axios(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        data: body,
        responseType: 'stream'
      }
    )

    await pipeline(response.data, res)
  } catch (err) {
    console.error(err?.response?.data || err)
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
