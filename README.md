# CS-Notes

- [Chenng 的主页](https://www.chenng.cn)
- [Chenng 的 CS 笔记](https://ringcrl.github.io/cs-notes)
- [LeetCode 刷题记录](https://github.com/ringcrl/LeetCode)
- [CodeWars 刷题记录](https://github.com/ringcrl/CodeWars)

# 项目快速配置

## ESLint

```sh
npx install-peerdeps --dev eslint-config-airbnb-base
```

```js
// .eslintrc.js
module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
  },
};
```

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
    // 用于关闭 ESLint 相关的格式规则集：https://github.com/prettier/eslint-config-prettier/blob/master/index.js
    "prettier",
    // 用于关闭 @typescript-eslint/eslint-plugin 插件相关的格式规则集：https://github.com/prettier/eslint-config-prettier/blob/master/%40typescript-eslint.js
    "prettier/@typescript-eslint",
  ]
}
```

```js
// .prettierrc.js
module.exports = {
  singleQuote: true, // 使用单引号
  semi: false, // 是否默认添加行尾分号
  trailingComma: 'es5', // Trailing commas where valid in ES5 (objects, arrays, etc)
  printWidth: 100, // 100字符换行
  tabWidth: 2, // 缩进空格数
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

## Husky

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

## Commitlint

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

## Typescript

https://www.webpackjs.com/guides/typescript/