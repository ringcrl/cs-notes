module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-base", "airbnb-typescript/base"],
  parserOptions: {
    project: "./tsconfig.json",
    // https://github.com/typescript-eslint/typescript-eslint/issues/967
    createDefaultProgram: true,
  },
  rules: {
    "import/prefer-default-export": 0
  },
};
