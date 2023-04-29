```sh
# 查找 ffmpeg 路径
brew list ffmpeg

# 编译方法1：
clang -g -o output/ff_log.out ff_log.c -I/opt/homebrew/Cellar/ffmpeg/5.1/include/ -L/opt/homebrew/Cellar/ffmpeg/5.1/lib/ -lavutil

# 编译方法2：
# pkg-config --cflags --libs libavutil 命令行运行的结果：
# -I/opt/homebrew/Cellar/ffmpeg/5.1/include -L/opt/homebrew/Cellar/ffmpeg/5.1/lib -lavutil
clang -g -o output/ff_log.out ff_log.c `pkg-config --cflags --libs libavutil`

clang -g -o output/extra_audio.out extra_audio.c `pkg-config --cflags --libs libavcodec libavformat`
```
