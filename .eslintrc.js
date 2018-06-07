module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    'sourceType': 'module',
    'allowImportExportEveryWhere': true
  },
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'standard',
    'standard-react'
  ]
}
