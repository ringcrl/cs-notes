<!--react-native-summary-->

react-native 填坑总结。

<!--more-->

# 通用

## 未知红屏

- 重新 `yarn start`
- 重新 `yarn ios`
- 检查 127.0.0.1 localhost

## UI 优化

- RN：ScrollView
- iOS：CollectionView
- Android：RecycleView

## Cannot find entry file

```sh
yarn start -- --reset-cache
```

## 别人遇到的问题

https://github.com/amandakelake/blog/issues/52

## 搭建开发环境

https://reactnative.cn/docs/getting-started/

## 解决跨域

Chrome 插件：Allow-Control-Allow-Origin: *

## Reactotron 调试 redux

Reactotron，需要配置本机 IP

## 报错集锦

[react native 报错集锦](https://www.jianshu.com/p/4eccb8987fad)

## react-devtools 调试样式

```sh
# 安装
npm install -g react-devtools

# 运行
react-devtools
```

使用：模拟器上面打开 Toggle Inspector

## Webview 打包异常

重新执行 `yarn dll`

## pod install 失败

pod cache clean --all

# 安卓

## build.gradle 报错

- 找到报错模块 `module/android/build.gradle`
- 将 jcenter() 移到 google() 后面

## yarn android 失败

- 打开 Android Studio

- Build => Clean Project、Rebuild Project

- File => Invalidate Cached / Restart
- 右上角的 Sync Project with gradle files
- 点击三角形

## Android Studio 打包红屏

```sh
# 方案一
yarn android

# 方案二
摇一摇 => Dev Settings
```

## 安卓使用 react-devtool

adb reverse tcp:8097 tcp:8097

## 安卓配置

- 安装 JDK：jdk-8u144-macosx-x64.dmg
- 通过 Android Studio 的 Congigure 安卓一堆的 SDK
- 设置安卓环境变量：export ANDROID_HOME="/Users/ringcrl/Library/Android/sdk"
- 安卓 adb：brew cask install android-platform-tools
- 转发静态文件：adb reverse tcp:8081 tcp:8081
- yarn android，如果报错，拉一份别人的 gradle-2.14.1-all 到自己的本机目录下

## 安卓在 Chrome 下调试

- 安卓链接电脑，打开 Chrome
- Chrome 执行 `cmd + shift + p` ，输入 `remote`
- 找到设备 inspect

## local.properties

```bash
## This file must *NOT* be checked into Version Control Systems,
# as it contains information specific to your local configuration.
#
# Location of the SDK. This is only used by Gradle.
# For customization when using a Version Control System, please read the header note.
# Mon Oct 29 10:58:05 CST 2018
sdk.dir=/Users/ringcrl/Library/Android/sdk
keystore=/Users/ringcrl/Documents/cmao/nemo/android/keystores/nemo_release.keystore
alias=xxx
password=xxx
alias_password=xxx
```

# iOS

## 未知错误

```sh
# 清除缓存 Xcode 缓存
shift + cmd + k

# 清除 npm 缓存
npm start -- --reset-cache
```

## denied the launch request

- Developer Authentication Certification Authority
- Developer ID Certification Authority
- Apple Worldwide Developer Relations Certification Authority

都改为【系统默认】

## 查看模拟器根目录

右下角 => filter => Home

## 'xx.h' file not found

```bash
cd ios
pod install
```

## 使用 iterm2 打开服务

node_modules/react-native/packager/launchPackager.command

finder => 显示简介 => 打开方式 => iTerm

## 查看沙盒文件

AppDelegate.m

```obj-c
NSString *path = NSHomeDirectory();
NSLog(@"NSHomeDirectory:%@",path);
NSBundle *myBundle = [NSBundle mainBundle];
NSLog(@"MainBundle:%@", myBundle);
return YES;
```

## Xcode 打 release 包

```
Product => Scheme => Edit Scheme => Build Configuration
```



## Xcode10 报错修复

'config.h' file not found

```
<https://github.com/facebook/react-native/issues/14382#issuecomment-309331766>

cd node_modules/react-native/third-party/glog-0.3.4
./configure
make
make install
```

Build input file cannot be found: '/Users/ringcrl/Documents/cmao/nemo2/node_modules/react-native/Libraries/WebSocket/libfishhook.a'

```
<https://github.com/facebook/react-native/issues/19569#issuecomment-394869470>
```

可以写 Node 脚本直接进行文件操作修复。
