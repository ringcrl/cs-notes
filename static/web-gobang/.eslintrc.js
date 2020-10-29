// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // require or disallow newline at the end of files
    'eol-last': 0,
    // spacing before opening parenthesis in function definitions
    'space-before-function-paren': 0,
    // enforce consistent indentation
    'indent': 0,
    // Disallow Unused Variables
    'no-unused-vars': 0,
    // object-property-newline
    'object-property-newline': 0,
    // operator-linebreak
    'operator-linebreak': 0
  }
}
