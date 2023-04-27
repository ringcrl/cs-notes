```sh
# 查找 ffmpeg 路径
brew list ffmpeg

# 编译方法1：
clang -g -o ff_log.out ff_log.c -I/opt/homebrew/Cellar/ffmpeg/5.1/include/ -L/opt/homebrew/Cellar/ffmpeg/5.1/lib/ -lavutil

# 编译方法2：
clang -g -o ff_log.out ff_log.c `pkg-config --cflags --libs libavutil`
```
