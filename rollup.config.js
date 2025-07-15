import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

export default [
  // ES模块构建
  {
    input: './index.js',
    output: {
      file: 'dist/festival.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [json()]
  },
  
  // UMD构建（浏览器兼容）
  {
    input: './index.js',
    output: {
      file: 'dist/festival.umd.js',
      format: 'umd',
      name: 'Festival',
      sourcemap: true
    },
    plugins: [json()]
  },
  
  // UMD压缩版
  {
    input: './index.js',
    output: {
      file: 'dist/festival.umd.min.js',
      format: 'umd',
      name: 'Festival',
      sourcemap: true
    },
    plugins: [
      json(),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      })
    ]
  },
  
  // CommonJS构建（Node.js兼容）
  {
    input: './index.js',
    output: {
      file: 'dist/festival.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [json()]
  }
]