# CS-Notes

- 主页：`https://ringcrl.github.io/cs-notes`
- 静态页：`https://ringcrl.github.io/cs-notes/playground/<path_to_html>`

## 代码规范

[JavaScript Standard Style](https://github.com/standard/standard)

```sh
# npm 依赖：ts-standard
npm install ts-standard --save-dev

# vsc 插件：StandardJS

# vsc 配置：.vscode/settings.json
{
  "standard.autoFixOnSave": true,
  "standard.nodePath": "/Users/ringcrl/.nvm/versions/node/v16.15.1/bin/node",
}
```

## 提交校验

```sh
npm install husky --save-dev

# package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
    }
  }
}
```
