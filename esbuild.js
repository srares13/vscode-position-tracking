const esbuild = require('esbuild')

esbuild
   .build({
      entryPoints: ['index.js'],
      bundle: true,
      minify: true,
      platform: 'node',
      target: ['node16'],
      outfile: 'bundle/index.js',
      external: ['vscode'],
      format: 'cjs',
      sourcemap: true
   })
   .catch(() => process.exit(1))
