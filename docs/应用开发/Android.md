# 基础知识

## 四大组件

- 活动（Activity）
    - 凡是应用中能看到的东西
- 服务（Service）
    - 用户退出了应用，服务仍然可以继续运行
- 广播接收器（Broadcast Receiver）
    - 应用接受如电话、信息的广播消息，也可以向外发出广播消息
- 内容提供器（Content Provider）
    - 应用之间共享数据，例如读取电话簿中的联系人

## 工具

- JDK：java 语言的软件开发工具包，包含了 java 的运行环境、工具集合、基础类库
- Android SDK：谷歌提供的 Android 开发工具包，开发时需要引入该工具包

# build.gradle

- Andorid Studio 采用 Gradle 构建项目，基于领域特定语言（DSL）来声明项目设置
- jcenter 是代码托管仓库，很多 Android 开源项目都会托管到这里
- classpath 声明一个 Gradle 插件，说明是用于构建 Android

## 外层 build.gradle

- 通常情况不需要修改这个文件，除非添加全局构建配置

```gradle
buildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath 'com.android.tools.build:gradle:2.2.0'
  }
}

allprojects {
  repositories {
    jcenter()
  }
}
```

## app/build.gradle

```sh
# "com.android.library" 库模块，不可直接运行
# 应用程序模块，可直接运行
apply plugin: "com.android.application"

# 闭包
android {
  # 24 表示 Android7.0 SDK 编译
  compileSdkVersion 24

  defaultConfig {
    # 项目报名
    applicationId "com.example.helloworld"
    # 最低兼容到 Android 4.0 系统
    minSdkVersion 15
    # 表示在此版本做过充分测试
    # 系统会为应用开启一些新的特性
    targetSdkVersion 24
    # 指定项目版本号
    versionCode 1
    # 指定项目版本名
    versionName "1.0"
  }

  # 生成安装文件的相关配置
  # 通常有 debug 和 release 两个闭包，debug 可以忽略不写
  buildTypes {
    release {
      # 是否对代码进行混淆
      minifyEnabled false
      # 指定混淆时使用的规则文件，这里指定了两个文件
      proguardFiles getDefaultProguardFile('proguard-android.txt'),
        'proguard-rules.pro'
    }
  }
}

# 指定当前项目所有依赖关系
# - 本地依赖
# - 库依赖
# - 远程依赖
dependencies {
  # 本地依赖，libs 目录下所有 .jar 文件都加入到构建路径中
  compile fileTree(dir: 'libs', inclue: ['*.jar'])
  # 远程依赖，先看本地是否有缓存，没有就去网上下载，加入到构建路径下
  compile 'com.android.support:appcompat-v7:24.2.1'
  # 库依赖
  compile project(':helper')
}
```
