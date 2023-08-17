module.exports = {
   extends: 'eslint:recommended',
   parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module' // It will treat import and export statements as valid syntax
   },
   env: {
      node: true,
      // Each env comes with a set of global variables. For them to be recognized, you set a specific env to true.
      // In the case of node, variables like "module", "require", "process" should be recognized.
      es6: true
   },
   rules: {
      indent: ['error', 3],
      // quotes: ['error', 'single', { 'allowTemplateLiterals': true }],
      semi: ['error', 'never'],
      'no-unused-vars': ['warn', { vars: 'all' }],
      'no-empty': 'warn',
      'no-undef': 'error'
   }
}
