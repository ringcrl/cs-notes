<!--webpack-real-project-configuration-->

配过不少的项目了，每次没有用脚手架工具，都是复制粘贴，现在来系统的梳理一下。

<!--more-->

# 参考地址

[webpack：从入门到真实项目配置](https://juejin.im/post/59bb37fa6fb9a00a554f89d2)

[前端构建秘籍](https://juejin.im/post/5c9075305188252d5c743520)

# 简单使用

## webpack.config.js

```js
const path = require('path')
module.exports = {
  entry:  './app/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
    filename: "bundle.js" // 打包后输出文件的文件名
  }
}
```

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="./build/bundle.js"></script>
</body>
</html>
```

## package.json

```js
"scripts": {
  "start": "webpack"
}
```

# Loader

https://www.webpackjs.com/loaders/

## Babel

https://www.babeljs.cn/docs/usage

### 依赖包

```bash
npm i --save-dev babel-loader babel-core babel-preset-env
```

- babel-loader 用于让 webpack 知道如何运行 babel
- babel-core 可以看做编译器，这个库知道如何解析代码
- babel-preset-env 这个库可以根据环境的不同转换代码

### webpack-config.js

```js
module.exports = {
  // ......
  module: {
    rules: [{
      // js 文件才使用 babel
      test: /\.js$/,
      // 使用哪个 loader
      use: 'babel-loader',
      // 不包括路径
      exclude: /node_modules/
    }]
  }
}
```

### .babelrc

```js
{
  "presets": ["babel-preset-env"]
}
```

### 使用缓存加快打包速度

`loader: 'babel-loader?cacheDirectory=true'`

## 处理图片

### 依赖包

```bash
npm i --save-dev url-loader file-loader
```

### addImage.js

```js
let smallImg = document.createElement('img')
// 必须 require 进来
smallImg.src = require('../images/small.jpeg')
document.body.appendChild(smallImg)

let bigImg = document.createElement('img')
bigImg.src = require('../images/big.jpeg')
document.body.appendChild(bigImg)
```

### webpack.config.js

```js
module.exports = {
  // ...
  module: {
    // ...
    output: {
      publicPath: 'build/' // 知道如何寻找资源
    },
    rules: [
      // ...
      {
        // 图片格式正则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          // 配置 url-loader 的可选项
          options: {
            // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
            limit: 10000,
            // 超出限制，创建的文件格式
            // build/images/[图片名].[hash].[图片格式]
            name: 'images/[name].[hash].[ext]'
          }
        }]
      }
    ]
  }
}
```

## 处理 CSS 文件

### 依赖包

```bash
npm i --save-dev css-loader style-loader
```

- css-loader 可以让 CSS 文件也支持 impost，并且会解析 CSS 文件
- style-loader 可以将解析出来的 CSS 通过标签的形式插入到 HTML 中，依赖 css-loader

### addImage.js

```js
import '../styles/addImage.css'

let smallImg = document.createElement('img')
smallImg.src = require('../images/small.jpeg')
document.body.appendChild(smallImg)
```

### webpack.config.js

```js
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    }]
  }
}
```

因为我们开启了 CSS 模块化的选项，所以 .xxx 被转成了唯一的哈希值，这样就解决了 CSS 的变量名重复问题。

### CSS 单独打包

**注意：webpack4 mini-css-extract-plugin 旨在取代 extract-text-webpack-plugin 插件**

```sh
npm i --save-dev extract-text-webpack-plugin
```

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    // ....
    module: {
      rules: [{
          test: /\.css$/,
          // 写法和之前基本一致
          loader: ExtractTextPlugin.extract({
            // 必须这样写，否则会报错
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                modules: true
              }
            }]
          })
        ]
      }
    ]
  },
  // 插件列表
  plugins: [
    // 输出的文件路径
    new ExtractTextPlugin("css/[name].[hash].css")
  ]
}
```

 HTML 文件没有引用新的 CSS 文件，所以这里需要手动引入下。

# 在项目中使用

## Tree Shaking

- harmony export (immutable) 表明代码是有用的
- unused harmony export func2 表明 func2 是无用代码
- webpack 仅仅是做了标记，去掉这些代码的能力，是通过插件实现的，常用的便是 unglify

```js
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = func1;
/* unused harmony export func2 */
function func1() {
  console.log('func1');
}
function func2() {
  console.log('func2');
}
/***/ })
```

## NamedModulePlugin 模块命名

```js
// 开发环境展示模块名字，当 HMR enabled
new webpack.NamedModulesPlugin()
```

## DllPlugin 加快打包速度

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。
这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包

```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
      // 依赖的库数组
      vendor: [
        'prop-types',
        'babel-polyfill',
        'react',
        'react-dom',
        'react-router-dom',
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.DllPlugin({
        // DllPlugin的name属性需要和libary保持一致
        name: '[name]_[hash]',
        path: path.join(__dirname, 'dist', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        // manifest就是我们第一步中打包出来的json文件
        manifest: require('./dist/vendor-manifest.json'),
      }),
    ],
}
```

## Happypack

webpack 是单线程的，就算此刻存在多个任务，你也只能排队一个接一个地等待处理。
这是 webpack 的缺点，好在我们的 CPU 是多核的，Happypack 会充分释放 CPU 在多核并发方面的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率。

```js
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的"名字"就叫做js，和楼上的查询参数遥相呼应
      id: 'js',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}
```

## 分离代码

我们可以考虑将依赖的库和自己的代码分割开来，这样用户在下一次使用应用时就可以尽量避免重复下载没有变更的代码。

```js
// 这是 packet.json 中 dependencies 下的
const VENOR = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "redux",
  "redux-form",
  "redux-thunk"
]

module.exports = {
  // 之前我们都是使用了单文件入口
  // entry 同时也支持多文件入口，现在我们有两个入口
  // 一个是我们自己的代码，一个是依赖库的代码
  entry: {
    // bundle 和 vendor 都是自己随便取名的，会映射到 [name] 中
    bundle: './src/index.js',
    vendor: VENOR
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  // ...
}
```

上面的配置并不会减少代码 bundle 文件大小，这是因为 bundle 中也引入了依赖库的代码,刚才的步骤并没有抽取 bundle 中引入的代码。

## 抽取共同代码

### CommonsChunkPlugin

```js
module.exports = {
  // ...
  output: {
    path: path.join(__dirname, 'dist'),
    // 既然我们希望缓存生效，就应该每次在更改代码以后修改文件名
    // [chunkhash]会自动根据文件是否更改而更换哈希
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // vendor 的意义和之前相同
      // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
      names: ['vendor', 'manifest'],
      // 配合 manifest 文件使用
      minChunks: Infinity
    })
  ]
};
```

### 删除每次打包的文件

```bash
npm install --save-dev clean-webpack-plugin
```

```js
module.exports = {
  //...
  plugins: [
    // 只删除 dist 文件夹下的 bundle 和 manifest 文件
    new CleanWebpackPlugin(['dist/bundle.*.js', 'dist/manifest.*.js'], {
      // 打印 log
      verbose: true,
      // 删除文件
      dry: false
    }),
  ]
};
```

## HTML 中自动新增标签

```bash
npm install html-webpack-plugin --save-dev
```

```js
module.exports = {
  //...
  plugins: [
    // 我们这里将之前的 HTML 文件当做模板
    // 注意在之前 HTML 文件中请务必删除之前引入的 JS 文件
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
```

## 按需加载代码

当用户访问我们的首页时，其实我们根本无需让用户加载除了首页以外的代码，这个优化我们可以通过路由的异步加载来完成。

```js
// 注意在最新版的 V4路由版本中，更改了按需加载的方式，如果安装了 V4版，可以自行前往官网学习
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const rootRoute = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default))
      }
    }
  ]
}

const Routes = () => {
  return (
    <Router history={hashHistory} routes={rootRoute} />
  );
};

export default Routes;

```

## 自动刷新

每次更新代码都需要执行依次 build，并且还要等上一会很麻烦。

### webpack-dev-server

```bash
npm i --save-dev webpack-dev-server
```

### packet.json

```js
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server --open"
},
```

### hot-loader

但是每次重新刷新页面对于 debug 来说很不友好，这时候就需要用到模块热替换了。但是因为项目中使用了 React，并且 Vue 或者其他框架都有自己的一套 hot-loader。

## 生成生产环境代码

### 依赖包

```bash
npm i --save-dev \
url-loader \
optimize-css-assets-webpack-plugin \
file-loader \
extract-text-webpack-plugin
```

### webpack.config.js

```js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const VENOR = ["faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "redux",
  "redux-form",
  "redux-thunk",
  "react-router"
]

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENOR
  },
  // 如果想修改 webpack-dev-server 配置，在这个对象里面修改
  devServer: {
    port: 8081
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            // 这边其实还可以使用 postcss 先处理下 CSS 代码
            loader: 'css-loader'
          }]
        })
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new CleanWebpackPlugin(['dist/*.js'], {
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // 生成全局变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
    }),
    // 分离 CSS 代码
    new ExtractTextPlugin("css/[name].[contenthash].css"),
    // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 压缩 JS 代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```

### package.json

```js
"scripts": {
  "build": "NODE_ENV=production webpack -p",
  "dev": "webpack-dev-server --open"
}
```

## 补充

```js
module.exports = {
  resolve: {
  // 文件扩展名，写明以后就不需要每个文件写后缀
    extensions: ['.js', '.css', '.json'],
 // 路径别名，比如这里可以使用 css 指向 static/css 路径
    alias: {
      '@': resolve('src'),
      'css': resolve('static/css')
    }
  },
  // 生成 source-map，用于打断点，这里有好几个选项
  devtool: '#cheap-module-eval-source-map',
}
```
