# presets 与 plugins

```json
// .babelrc
{
  "presets": ["@babel/preset-env"], // presets 是 plugins 的集合，一个 presets 内部包含了很多 plugin
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

# babel 插件使用

```js
// 使用 presets: ['@babel/preset-env']
const babel = require('@babel/core');

const code = 'const fn = (a, b) => a + b';
// babel 有 transform 方法会帮我们自动遍历，使用相应的预设或者插件转换相应的代码
const r = babel.transform(code, {
  presets: ['@babel/preset-env'],
});
console.log(r.code);
// "use strict";
// var fn = function fn() { return a + b; };
```

```js
// 使用 plugins: ['@babel/plugin-transform-arrow-functions']
const babel = require('@babel/core');

const code = 'const fn = (a, b) => a + b';
// babel 有 transform 方法会帮我们自动遍历，使用相应的预设或者插件转换相应的代码
const r = babel.transform(code, {
  plugins: ['@babel/plugin-transform-arrow-functions'],
});
console.log(r.code);
// const fn = function (a, b) {
//   return a + b;
// };
```

# plugin-transform-arrow-functions

```js
const babel = require('@babel/core');
const t = require('@babel/types');

// const code = 'const fn = (a, b) => a + b';
const code = 'const fn = (a, b) => { return a + b}';
// const fn = function(a, b) { return a + b }
const arrowFnPlugin = {
  // 访问者模式
  visitor: {
    // 当访问到某个路径的时候进行匹配
    ArrowFunctionExpression(path) {
      // 拿到节点然后替换节点
      const { node } = path;
      console.log('ArrowFunctionExpression -> node', node);
      // 拿到函数的参数
      const { params } = node;
      let { body } = node;
      // 判断是不是 blockStatement，不是的话让他变成 blockStatement
      if (!t.isBlockStatement(body)) {
        body = t.blockStatement([body]);
      }
      const functionExpression = t.functionExpression(null, params, body);
      // 替换原来的函数
      path.replaceWith(functionExpression);
    },
  },
};

const r = babel.transform(code, {
  plugins: [arrowFnPlugin],
});

console.log(r.code);
```