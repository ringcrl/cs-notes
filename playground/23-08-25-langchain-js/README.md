## 调试

```sh
# 使用 NodeJS 18
nvm use 18

# 参照 .env.example 配置 .env

# 运行
ts-node main.ts
```

```sh
# 向量数据库：https://cloud.tencent.com/document/product/1709/95102

# 创建数据库
curl -i -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer account=root&api_key=eC4bLRy2va******************************' \
  http://10.0.X.X:80/database/create \
  -d '{
        "database": "db_test"
  }'

# 查询数据库
curl -i -X GET \
   -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer account=root&api_key=A5VOgsMpGWJhUI0WmUbY********************' \
   http://10.0.X.X:80/database/list

# 创建 Collection
curl -i -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer account=root&api_key=A5VOgsMpGWJhUI0WmUbY********************' \
  http://10.0.X.X:80/collection/create \
  -d '{
    "database": "db_test",
    "collection": "collection_test",
    "replicaNum": 2,
    "shardNum": 1,
    "description": "This is the test data of vectordb.",
    "indexes": [
      {
        "fieldName": "id",
        "fieldType": "string",
        "indexType": "primaryKey"
      },
      {
        "fieldName": "vector",
        "fieldType": "vector",
        "indexType": "HNSW",
        "dimension": 1536,
        "metricType": "L2",
        "params": {
          "M": 64,
          "efConstruction": 8
        }
      },
      {
        "fieldName": "doc_id",
        "fieldType": "uint64",
        "indexType": "filter"
      },
      {
        "fieldName": "content",
        "fieldType": "string",
        "indexType": "filter"
      }
    ]
  }'

# 查询 Collection
curl -i -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer account=root&api_key=A5VOgsMpGWJhUI0WmUbY********************' \
  http://10.0.X.X:80/collection/list \
  -d '{
    "database": "db_test"
  }'

# 插入数据
curl -i -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer account=root&api_key=A5VOgsMpGWJhUI0WmUbY********************' \
  http://10.0.X.X:80/document/upsert \
  -d '{
    "database": "db_test",
    "collection": "collection_test",
    "buildIndex": true,
    "documents": [
      {
        "id": "1",
        "vector": [0.14,0.25,0.72,0.53,0.67,0.87,0.23,0.78,0.99,0.13],
        "doc_id": 1,
        "content": "doc_id=1 content=string_1"
      },
      {
        "id": "2",
        "vector": [0.23,0.29,0.78,0.81,0.23,0.42,0.82,0.54,0.22,0.80],
        "doc_id": 1,
        "content": "doc_id=1 content=string_2"
      },
      {
        "id": "3",
        "vector": [0.14,0.32,0.88,0.12,0.52,0.32,0.91,0.23,0.23,0.67],
        "doc_id": 1,
        "content": "doc_id=1 content=string_3"
      },
      {
        "id": "4",
        "vector": [0.98,0.52,0.62,0.91,0.99,0.34,0.55,0.35,0.43,0.64],
        "doc_id": 2,
        "content": "doc_id=2 content=string_4"
      },
      {
        "id": "5",
        "vector": [0.67,0.14,0.92,0.45,0.83,0.74,0.23,0.53,0.23,0.55],
        "doc_id": 2,
        "content": "doc_id=2 content=string_5"
      }
    ]
  }'

# 向量检索数据
curl -i -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer account=root&api_key=A5VOgsMpGWJhUI0WmUbY********************' \
  http://10.0.X.X:80/document/search \
  -d '{
    "database": "db_test",
    "collection": "collection_test",
    "search": {
      "vectors": [
        [0.2,0.14,0.23,0.5,0.65,0.34,0.89,0.64,0.23,0.22]
      ],
      "retrieveVector": false,
      "limit": 2,
      "filter": "doc_id=1"
    }
  }'

# 删除 Collection
curl -i -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer account=root&api_key=A5VOgsMpGWJhUI0WmUbY********************' \
  http://10.0.X.X:80/collection/drop \
 -d '{
   "database": "db_test",
   "collection": "collection_test"
}'

```
