module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
}
