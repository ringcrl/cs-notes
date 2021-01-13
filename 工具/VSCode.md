# 配置

## .vscode/launch.json

https://github.com/Microsoft/vscode-recipes

```json
{
  "version": "1.0.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "node-js",
      "program": "${file}",
      "cwd": "${cwd}",
      "runtimeExecutable": "/Users/ringcrl/.nvm/versions/node/v8.12.0/bin/node",
      "outputCapture": "std"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "node-ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${file}"],
      "outputCapture": "std"
    }
  ]
}
```

```json
// 支持参数启动

{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.0.1",
  "configurations": [
    {
      "name": "JS",
      "type": "node",
      // linux下需要这样运行：xvfb-run -s "-ac -screen 0 1280x1024x24" node test/pixi.js
      // https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-support-for-npm-and-other-tools
      "runtimeExecutable": "xvfb-run",
      "runtimeArgs": ["-s", "-ac -screen 0 1280x1024x24", "node"],
      "request": "launch",
      "program": "${file}",
      "cwd": "${workspaceFolder}",
      "outputCapture": "std"
    }
  ]
}
```

# 使用技巧

## 跳到上一次/下一次光标曾经停留过的地方

`ctrl + -`、`ctrl + shift + -` 光标位置后退，前进

## 侧边栏查看引用

shift + alt + F12 可以在侧边栏查看引用

## 资源管理器同级全选

选中文件后 cmd + a 全选

## 多行转一行

ctrl + J

## 删除上一个词

option + delete

## 选中词

option + Shift + 右键头 / 左键头

## 切换自动换行

option + z

## 跳转到匹配括号

cmd + shift + \

## 转到下一个错误

F8

## 选中所有匹配项

cmd + F2

## 查看定义

option + F12

## 在资源管理器显示文件

cmd + K R

## 搜索过滤多个文件夹

files to exclude

{dist, browser}

## 查看方法调用关系

option + shift + H

## 在匹配的闭合标签来回跳跃

`cmd + shift + \` 在匹配的闭合标签来回跳跃

## 剪切整行

剪切文本。但当未选中文本时，该命令会剪切光标所在整行，当然连续 `cmd + x` 用于删除行也是不错的选择

## 复制整行

`cmd + c` 复制文本。但当未选中文本时，该命令会复制光标所在整行

## 移动整行

`alt + ↑/↓` 上下移动光标所在行

## 光标所在行下方插入新行

`ctrl + enter` 直接跳到下一行，不会影响当前行内容

## 快速修复类型错误

`cmd + .`
