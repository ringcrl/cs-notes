const express = require('express')
const { pipeline } = require('node:stream/promises')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()

const app = express()
const port = 3000

app.use(express.static('public'))

app.use(express.json()) // for the body of the request

app.post('/chatapi', async (req, res) => {
  try {
    const response = axios(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        // We need to send the body as a string, so we use JSON.stringify.
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              // The message will be 'Say hello.' unless you provide a message in the request body.
              content: ` ${req.body.message || 'Say hello.'}`
            }
          ],
          temperature: 0,
          max_tokens: 25,
          n: 1,
          stream: true
        })
      }
    )

    await pipeline(response.body, res)
  } catch (err) {
    console.error(err)
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
