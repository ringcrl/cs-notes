# npm

## 模块安装机制

- 发出 npm install 命令
- 查询 node_modules 目录之中是否已经存在指定模块
    - 若存在，不再重新安装
    - 若不存在
        - npm 向 registry 查询模块压缩包的网址
        - 下载压缩包，存放在根目录下的.npm目录里
        - 解压压缩包到当前项目的node_modules目录

## 实现原理

- 执行工程自身 preinstall
- 确定首层依赖模块
    - dependencies 和 devDependencies 属性中直接指定的模块
    - npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点
- 获取模块
    - 如果有 package-lock.json，直接取里面的信息
    - 如果没有就从仓库获取：^1.1.0 会去仓库中获取符合 1.x.x 形式的最新版本
    - 获取模块实体：上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载
- 模块扁平化
    - npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有重复模块时，则将其丢弃
    - 重复模块定义，模块名相同且 semver 兼容。每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个兼容版本，而不必版本号完全一致

## 发包流程

### 登录到 npm

`npm adduser` 登录到 npm，填入个人信息

### 发个人包

- 修改 package.json 的 `name` 为 `@chenng/aop-js`
- `git push`
- `npm publish --access public` 推送到 npm

### 发 fork 包

- 开发过程可以直接改 node_modules 里面的源码，改完 Xcode 只要重新 cmd + R 一下即可生效，还可以直接 debugger
- fork <https://github.com/zmxv/react-native-sound> 到【团队】
- `git clone`、`git push`
- 修改 package.json 的 `name`、`repository`、`homepage` ，例如 `@kitten-team/react-native-sound`
- `npm publish --access public` 推送到 npm

## Git 私有包

- Git tag
- 分支名
- 提交的 SHA-1

```json
"dependencies": {
  "a": "git+ssh://git@github.com:mycompany/a.git#0.1.0",
  "b": "git+ssh://git@github.com:mycompany/a.git#develop",
  "c": "git+ssh://git@github.com:mycompany/a.git#dacc525c",
}
```

## package.json

### module

- rollup 中最早就提出的 `pkg.module`，提高打包的性能，其中提升一个便是 tree shaking
- 打包工具遇到 module 字段，会优先使用，如果没找到对应的文件，则会使用 main 字段，并按照 CommonJS 规范打包
- 虽然打包工具支持了 ES Module，但是并不意味着其他的 es6 代码可以正常使用，因为使用者可能并不会对你的 npm 包做编译处理，比如 webpack rules 中 `exclude: /node_modules/`，所以如果不是事先约定好后编译或者没有兼容性的需求，你仍需要用 babel 处理，从而产出兼容性更好的 npm 包

## 查看包依赖

- `npm list @types/lodash`

查看所有用到这个依赖的仓库

# yarn

## 更换源

```sh
# 查看所有可用的源
npm install -g yrm
yrm ls

# 查看当前源
yarn config get registry

# 设置淘宝源
yarn config set registry https://registry.npm.taobao.org

# 设置原生源
yarn config set registry https://registry.yarnpkg.com
```

## peerDependencies

- A、B、C 三个模块，B 导出 C 的类型，A 使用了 C 的类型
- B 需要在 peerDependencies 加入 C，保证 A 在使用 B 模块的时候会优先安装 C，在 A 使用 C 的类型的时候能找到 C

## 缓存的包

```sh
# 查看缓存的包
yarn cache list --pattern cmblockly

# 清除缓存的包
yarn cache clean

# 清除指定的缓存包
yarn cache clean cmblockly
```

## 查看 link 的包

```zsh
# vim .zshrc
alias lc='ls -l node_modules/@cmao | grep ^l'
alias lk='ls -l node_modules | grep ^l'
```

# 常用的包

https://mp.weixin.qq.com/s/nfvb-57Vvm8g1sysDVrS6A