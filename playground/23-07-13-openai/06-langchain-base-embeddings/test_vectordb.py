from os import path
from langchain.vectorstores import Chroma

from langchain.embeddings import HuggingFaceEmbeddings

doc_directory = path.join(path.dirname(__file__), "vectordb/docs_500_100")
embeddings = HuggingFaceEmbeddings()
vectordb = Chroma(persist_directory=doc_directory,
                  embedding_function=embeddings)

docs_score = vectordb.similarity_search_with_score(
    "支持什么格式？", include_metadata=True, k=3)


docs = []
for doc_score in docs_score:
    doc, score = doc_score
    doc.metadata["score"] = score
    docs.append(doc)

# 对于url的挑选，会选出距离最近的和距离小于0.3的
doc_urls = []
min_score = 1  # score都小于1
best_url = ""
for doc in docs:
    score = doc.metadata["score"]
    if score > 0.3:
        if score < min_score:
            min_score = score
            best_url = "{k}: {v}\n".format(
                k=doc.metadata["title"], v=doc.metadata["source"])
    else:
        doc_urls.append("{k}: {v}\n".format(
            k=doc.metadata["title"], v=doc.metadata["source"]))


try:
    del vectordb
except Exception as e:
    print(e)
