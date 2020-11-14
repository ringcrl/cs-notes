module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    // 用于关闭 ESLint 相关的格式规则集 https://github.com/prettier/eslint-config-prettier/blob/master/index.js
    'prettier',
    // 用于关闭 @typescript-eslint/eslint-plugin 插件相关的格式规则集 https://github.com/prettier/eslint-config-prettier/blob/master/%40typescript-eslint.js
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
    // https://github.com/typescript-eslint/typescript-eslint/issues/967
    createDefaultProgram: true,
  },
  rules: {
    'no-undef': 0,
    '@typescript-eslint/no-use-before-define': 0,
  },
}
