## ffprobe

```sh
ffprobe -show_format -show_streams -print_format json -loglevel fatal ./第一段.mp4
```

## ffmpeg

### 参数

```
-f fmt 指定格式(音频或视频格式)
-i filename	指定输入文件名，在 linux 下当然也能指定:0.0(屏幕录制)或摄像头
-y 覆盖已有文件
-t duration	记录时长为
-fs limit_size 设置文件大小上限
-ss time_off 从指定的时间(s)开始，[-]hh:mm:ss[.xxx]的格式也支持
-re 代表按照帧率发送,作为推流工具一定要加入参数,否则 ffmpeg 会按照最高速率向流媒体服务器不停发送数据

-b 指定比特率(bits/s)，似乎 ffmpeg 是自动 VBR 的，指定了就大概是平均比特率
-bitexact 使用标准比特率
-vb 指定视频比特率(bits/s)
-vframes number 设置转换多少桢(frame)的视频
-r rate 帧速率(fps)（可以改，确认非标准桢率会导致音画不同步，所以只能设定为15或者29.97）
-s size 指定分辨率 (320x240)
-aspect aspect 设置视频长宽比(4:3, 16:9 or 1.3333, 1.7777)
-croptop size 设置顶部切除尺寸(in pixels)
-cropbottom size 设置底部切除尺寸(in pixels)
-cropleft size 设置左切除尺寸 (in pixels)
-cropright size 设置右切除尺寸 (in pixels)
-padtop size 设置顶部补齐尺寸(in pixels)
-padbottom size 底补齐(in pixels)
-padleft size 左补齐(in pixels)
-padright size 右补齐(in pixels)
-padcolor color 补齐带颜色(000000-FFFFFF)
-vn 取消视频
-vcodec codec 强制使用codec编解码方式('copy' to copy stream)
-sameq 使用同样视频质量作为源（VBR）
-pass n 选择处理遍数（1或者2）。两遍编码非常有用。第一遍生成统计信息，第二遍生成精确的请求的码率
-passlogfile file 选择两遍的纪录文件名为 file
```

### 视频剪裁

```sh
# 将文件从 50 秒开始剪切 20 秒,输入到新文件,-ss 是指定开始时间,-t 是指定时长
ffmpeg -i input.mp4 -ss 00:00:50.0 -codec copy -t 20 output.mp4
```

### mp4 导出 gif

```sh
# -ss 00:00:03 表示从第 00 分钟 03 秒开始制作 GIF
# -t 3 表示把持续 3 秒的视频转换为 GIF
# -s 640x360 是 GIF 的分辨率
# -r 15 表示帧率，网上下载的视频帧率通常为 24，设为 15 效果挺好了
ffmpeg -i /input/01.mp4 -ss 00:00:02 -t 3 -s 360x640 -r 15 /output/foo.gif
```

### 截图

```sh
# 截取单图
ffmpeg -ss 00:00:05 -i /input/01.mp4 -vframes 1 -q:v 2 /output/01.jpg

# 按帧截图
ffmpeg -i /input/01.mp4 -r 0.25 /output/prefix_%03d.jpg

# 每隔 1s 截一张图
ffmpeg -i /input/01.mp4 -y -f image2 -vf fps=fps=1 /output/prefix_%03d.jpeg
```
