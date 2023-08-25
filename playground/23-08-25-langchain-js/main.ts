import * as fs from 'fs'
import * as path from 'path'

import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Document } from 'langchain/document'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import * as dotenv from 'dotenv'

dotenv.config()

const { OPENAI_API_KEY } = process.env

const readFile = (localPath: string): string => {
  const file = fs.readFileSync(localPath, 'utf8')
  return file
}

const getContentSplitedDocs = async (content: string): Promise<Document[]> => {
  const splitter = new CharacterTextSplitter({
    separator: ' ',
    chunkSize: 7,
    chunkOverlap: 3
  })
  const output = await splitter.createDocuments([content])
  return output
}

async function main (): Promise<void> {
  const fileContent = readFile(path.resolve(__dirname, './1.txt'))
  const docs = await getContentSplitedDocs(fileContent)
}

main().catch((err) => { console.error(err) })
