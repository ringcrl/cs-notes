```sh
# 查找 ffmpeg 路径
brew list ffmpeg

# 编译
clang -g -o ff_log ff_log.c -I/opt/homebrew/Cellar/ffmpeg/5.1/include/ -L/opt/homebrew/Cellar/ffmpeg/5.1/lib/ -lavutil
```
