## socketio-pb demo

```sh
# 编译 proto
# 先安装：https://github.com/protocolbuffers/protobuf/releases
protoc --js_out=import_style=commonjs,binary:. message.proto

# 服务端运行
node server.js

# 客户端运行
npx parcel index.html
```
