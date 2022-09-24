const fs = require('fs')
const path = require('path')

const t = require('@babel/types')
const generate = require('@babel/generator').default
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const srcStr = fs.readFileSync(path.resolve(__dirname, 'src.js')).toString()

console.log(`
处理前代码：
${srcStr}
`)

const ast = babelParser.parse(srcStr)

const insertLog = (path) => {
  const body = path.node.body
  const newBlockStatement = t.blockStatement(
    [t.expressionStatement(
      t.callExpression(
        t.memberExpression(
          t.identifier('console'),
          t.identifier('log')
        ),
        [t.stringLiteral('code inserted by babel')]
      )
    ), ...body]
  )
  path.replaceWith(newBlockStatement)
}

const funcStatementHandler = (path) => {
  insertLog(path)
}

const forStatementHandler = (path) => {
  insertLog(path)
}

traverse(ast, {
  enter (path) {
    if (path.node.type === 'BlockStatement' && path.node.body.length === 1) {
      if (path.parent.type === 'FunctionDeclaration') {
        funcStatementHandler(path)
      }

      if (path.parent.type === 'ForStatement') {
        forStatementHandler(path)
      }
    }
  }
})

const dist = generate(ast)
const distCodeStr = dist.code
console.log(`
处理后代码：
${distCodeStr}
`)

fs.writeFileSync(path.resolve(__dirname, 'dist.js'), distCodeStr)
