# npm

## install

- npm 向 registry 查询模块压缩包的网址
- 下载压缩包，存放在根目录下的 .npm 目录里
- 解压压缩包到当前项目的 node_modules 目录

## publish

### 登录到 npm

`npm adduser` 登录到 npm，填入个人信息

### 配置 npm 包内文件

```json
{
    "files": [
        "src",
        "dist/*.js",
        "types/*.d.ts"
    ],
}
```

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

## owner 权限

```sh
# 添加用户权限
npm owner add xxx
```

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
