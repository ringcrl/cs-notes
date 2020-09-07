# 编译 WASM

## Emscripten

Emscripten 是一个 LLVM 到 JS 的编译器，编译出 JS 文件供浏览器使用，也可以生成 WASM 提供更好的性能体验。

### 环境准备

cmake、git、python2.7

Mac 环境下，只需要通过 Homebrew 安装 cmake 即可

安装 Homebrew：https://brew.sh

```sh
brew install cmake
```

### 安装 emsdk

```sh
git clone https://github.com/emscripten-core/emsdk && cd emsdk

./emsdk install sdk-upstream-master-64bit
./emsdk activate sdk-upstream-master-64bit

# 配置环境变量，每次需要编译的时候配置一次
source /Users/ringcrl/Documents/sdk/emsdk/emsdk_env.sh

# 校验编译成功
emcc --help
```

## 编译 FFmpeg 到 LLVM

```sh
# 克隆项目
git clone https://github.com/FFmpeg/FFmpeg
cd FFmpeg

# 编译配置
CPPFLAGS="-D_POSIX_C_SOURCE=200112 -D_XOPEN_SOURCE=600" \
emconfigure ./configure --cc="emcc" \
--prefix=$(pwd) --enable-cross-compile --target-os=none --arch=x86_64 \
--cpu=generic --disable-ffplay \
--disable-asm --disable-doc --disable-devices --disable-pthreads \
--disable-w32threads --disable-network --disable-hwaccels \
--disable-parsers --disable-bsfs --disable-debug --disable-protocols \
--disable-indevs --disable-outdevs --enable-protocol=file


# configure FFMpeg with Emscripten
CFLAGS="-s USE_PTHREADS" \
LDFLAGS="$CFLAGS -s INITIAL_MEMORY=33554432" \
emconfigure ./configure --target-os=none \
  --arch=x86_32 \
  --enable-cross-compile \
  --disable-x86asm \
  --disable-inline-asm \
  --disable-stripping \
  --disable-programs \
  --disable-doc \
  --extra-cflags="$CFLAGS" \
  --extra-cxxflags="$CFLAGS" \
  --extra-ldflags="$LDFLAGS" \
  --nm="llvm-nm -g" \
  --ar=emar \
  --as=llvm-as \
  --ranlib=llvm-ranlib \
  --cc=emcc \
  --cxx=em++ \
  --objcc=emcc \
  --dep-cc=emcc

# 编译
make
```

以上编译参数参考：https://github.com/bgrins/videoconverter.js/blob/master/build/build_lgpl.sh

## 编译 LLVM 到 WebAssembly

```sh
# 这里的 ffmpeg 是上一步编译输出的 LLVM bitcode，注意一定要是 .bc 后缀
cp ffmpeg ffmpeg.bc

# 然后把 ffmpeg.bc 移到一个单独的文件夹作处理
# 我是在 fock 出来的 FFmpeg 项目下新建了 wasmbuild 做实验

# ASSERTIONS 用于启用运行时检查常见内存分配错误
# VERBOSE 显示详细的信息
# TOTAL_MEMORY 控制内存容量，默认的内存容量为 16MB，栈容量为 5MB
# ALLOW_MEMORY_GROWTH Emscripten 堆一经初始化，容量就固定了，该选项支持自动拓展
# WASM 编译到 wasm，默认是 asm.js
# -02 优化等级
# -v 制定 xx.bc 文件
# -o 制定前置钩子、后置钩子，也就是 JS IO 通信使用，传递文件、传入参数，回调拿到产出结果

emcc -s ASSERTIONS=1 \
-s VERBOSE=1 \
-s TOTAL_MEMORY=33554432 \
-s ALLOW_MEMORY_GROWTH=1 \
-s WASM=1 \
-O2 \
-v ffmpeg.bc \
-o ./ffmpeg.js --pre-js ./ffmpeg_pre.js --post-js ./ffmpeg_post.js
```

## ffmpeg 前后置钩子

上一步最后出现了两个文件 `ffmpeg_pre.js` 钩子和 `ffmpeg_post.js`钩子，这里参考了：https://github.com/bgrins/videoconverter.js/blob/master/build/ffmpeg_pre.js 进行编写。

- 命令行运行之前在创建 `/input`，`/output` 文件夹，并将浏览器上传得到的文件放入 `/input`
- 执行 `ffmpeg` 相关命令，在命令中控制输出逻辑，将输出文件放入到 `/output`
- 在运行完成后读取 `/output` 目录，将文件转成 ArrayBuffer 回调给浏览器