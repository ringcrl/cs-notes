# 配置

## .vscode/launch.json

https://github.com/Microsoft/vscode-recipes

```json
{
  "version": "1.0.0",
  "configurations": [
    {
      "name": "JS",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "cwd": "${workspaceFolder}",
      "outputCapture": "std"
    },
    {
      // 支持参数启动
      "name": "JS-CONFIG",
      "type": "node",
      // linux下需要这样运行：xvfb-run -s "-ac -screen 0 1280x1024x24" node test/pixi.js
      // https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-support-for-npm-and-other-tools
      "runtimeExecutable": "xvfb-run",
      "runtimeArgs": ["-s", "-ac -screen 0 1280x1024x24", "node"],
      "request": "launch",
      "program": "${file}",
      "cwd": "${workspaceFolder}",
      "outputCapture": "std"
    },
    {
      "name": "TS-NODE",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${file}"]
    },
    {
      "name": "Webpack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/webpack/bin/webpack.js",
      "args": ["--config=build/webpack.build-lib.js"]
    },
    {
      "name": "Jest",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--testPathPattern=${file}", "--config=jest.config.js", "--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    },
    {
      "name": "Python",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal"
    }
  ]
}
```

## .vscode/settings.json

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# 快捷键

## 跳转光标曾停留过的位置

`ctrl + -`、`ctrl + shift + -` 光标位置后退，前进

## 资源管理器同级全选

选中文件后 `cmd + a` 全选

## 整个单词选中

`option + shift + ←/→`

## 切换自动换行

`option + z`

## 跳转到匹配的括号

`cmd + shift + \`

## 查看方法调用链

`option + shift + h`

## 剪切、删除整行

`cmd + x`

## 移动光标所在行

`alt + ↑/↓`

## 开关左侧栏

`cmd + b`

## 多行选择

`shift + option + 鼠标拖拽`

# 使用技巧

## 搜索过滤多个文件夹

files to exclude

{dist, browser}

## TS 重构

选中代码，右键选择重构

## 快速滚动

按住 `option` 滚动鼠标，可以 5 倍速滚动屏幕
