# CS-Notes

- [Chenng 的主页](https://www.chenng.cn/)
- [Chenng 的 CS 笔记](https://static.chenng.cn/)
- [LeetCode 刷题记录](https://github.com/ringcrl/LeetCode)
- [CodeWars 刷题记录](https://github.com/ringcrl/CodeWars)

# 项目配置

## husky

Husky can prevent bad git commit, git push and more

```sh
yarn add husky -D
```

```json
// package.json
"husky": {
  "hooks": {
    "pre-commit": "npm test",
    "pre-push": "npm test",
    "...": "..."
  }
}
```

## commitlint

Lint commit messages

```sh
yarn add @commitlint/config-angular @commitlint/cli -D

echo "module.exports = { extends: ['@commitlint/config-angular'] };" > commitlint.config.js
```

```json
// husky config
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## ESLint

```sh
npx install-peerdeps --dev eslint-config-airbnb-base
```

配置参照：`.eslintrc.js`

## Prettier

- ESLint 的规则校验同时包含了【格式规则】和【质量规则】
- Prettier 与 ESLint 的区别在于 Prettier 专注于统一的格式规则，从而减轻 ESLint 在格式规则上的校验，而对于质量规则 则交给专业的 ESLint 进行处理
- eslint-config-prettier: 用于解决 ESLint 和 Prettier 配合使用时容易产生的格式规则冲突问题，其作用就是关闭 ESLint 中配置的一些格式规则

```sh
yarn add prettier eslint-config-prettier -D
```

```js
// .eslintrc.js
{
  "extends": [
    // ...
    // 用于关闭 ESLint 相关的格式规则集，具体可查看 https://github.com/prettier/eslint-config-prettier/blob/master/index.js
    "prettier",
    // 用于关闭 @typescript-eslint/eslint-plugin 插件相关的格式规则集，具体可查看 https://github.com/prettier/eslint-config-prettier/blob/master/%40typescript-eslint.js
    "prettier/@typescript-eslint",
  ]
}
```

```json
// .vscode
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
```
