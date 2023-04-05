```sh
# 安装依赖
npm i

# 启动服务，测试服务：http://127.0.0.1:11111/word/leak
cd playground/22-10-06-bob-plugin-zmji
nohup ts-node -T src/zmji-server.ts &

# 编译插件
npm run build
```
