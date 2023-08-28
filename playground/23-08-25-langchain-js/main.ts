import * as path from 'path'

import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { Document } from 'langchain/document'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import * as dotenv from 'dotenv'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

dotenv.config({ path: path.resolve(__dirname, '.env') })

const { VECTOR_DB_IP, VECTOR_DB_KEY } = process.env

const DOC_ID = 3
const DATABASE = 'db_test'
const COLLECTION = 'collection_test'

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer account=root&api_key=${VECTOR_DB_KEY as string}`
}

const embeddings = new OpenAIEmbeddings({
  batchSize: 512
})

interface IEmbedDoc {
  vector: number[]
  content: string
}
const embedDocs = async (docs: Document[]): Promise<IEmbedDoc[]> => {
  const embedRes = await embeddings.embedDocuments(docs.map((doc) => doc.pageContent))

  return embedRes.map((vector: any, index: number) => {
    return {
      content: docs[index].pageContent,
      vector
    }
  })
}

const loadPDFFile = async (localPath: string): Promise<any> => {
  const loader = new PDFLoader(localPath)
  const docs = await loader.load()

  // return docs

  // 节约 token，测试用
  return docs.slice(0, 2)
}

const getDocsCharacterTextSplitRes = async (docs: Document[]): Promise<Document[]> => {
  const splitter = new CharacterTextSplitter({
    separator: '\n',
    chunkSize: 500,
    chunkOverlap: 50
  })
  const res = await splitter.splitDocuments(docs)
  return res
}

// 单次最多插入1000条：https://cloud.tencent.com/document/product/1709/95121
const addDocsToVectorStore = async (docs: IEmbedDoc[]): Promise<any> => {
  const documents = docs.map((doc) => {
    return {
      id: uuid(),
      content: doc.content,
      vector: doc.vector,
      doc_id: DOC_ID
    }
  })

  const res = await axios({
    method: 'post',
    url: `http://${VECTOR_DB_IP as string}:80/document/upsert`,
    headers: HEADERS,
    data: JSON.stringify({
      database: DATABASE,
      collection: COLLECTION,
      buildIndex: true,
      documents
    })
  })

  return res.data
}

const searchTopKFromVectorStore = async (query: string): Promise<any> => {
  const queryVector = await embeddings.embedQuery(query)

  const res = await axios({
    method: 'post',
    url: `http://${VECTOR_DB_IP as string}:80/document/search`,
    headers: HEADERS,
    data: JSON.stringify({
      database: DATABASE,
      collection: COLLECTION,
      search: {
        vectors: [queryVector],
        retrieveVector: false,
        limit: 2,
        filter: `doc_id=${DOC_ID}`
      }
    })
  })

  return res.data
}

const add = async (): Promise<any> => {
  const docsOfPDF = await loadPDFFile(path.resolve(__dirname, './1.pdf'))
  const characterTextSplittedRes = await getDocsCharacterTextSplitRes(docsOfPDF)
  const embedDocsRes = await embedDocs(characterTextSplittedRes)

  const addDocsToVectorStoreRes = await addDocsToVectorStore(embedDocsRes)
  console.log('addDocsToVectorStoreRes', addDocsToVectorStoreRes)
}

const search = async (): Promise<any> => {
  const searchTopKFromVectorStoreRes = await searchTopKFromVectorStore('云点播')
  console.log('searchTopKFromVectorStoreRes', searchTopKFromVectorStoreRes)
}

async function main (): Promise<void> {
  // 构建
  // await add()

  // 检索
  await search()
}

main().catch((err) => { console.error(err) })
