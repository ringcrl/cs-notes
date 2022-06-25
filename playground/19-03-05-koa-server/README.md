# server-node

Node Koa 服务

# 本地开发

```sh
# 设置 .env
cp .env.example .env
vim .env
```

```sh
# 启动服务
yarn dev
```

# 线上部署

```sh
# 设置 .env
cp .env.example .env
vim .env

# 打包文件
yarn build

# 启动服务
pm2 start dist/server.js
```