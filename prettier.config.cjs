module.exports = {
   tabWidth: 3,
   useTabs: false,
   semi: false,
   singleQuote: true,
   trailingComma: 'none',
   quoteProps: 'preserve',
   printWidth: 100,
   overrides: [
      {
         files: 'README.md',
         options: {
            printWidth: 80
         }
      }
   ]
}
