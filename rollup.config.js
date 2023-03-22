import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/festival.js',
      format: 'umd',
      name: 'Festival',
      sourcemap: true
    },
    {
      file: 'dist/festival.min.js',
      format: 'umd',
      name: 'Festival',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [json()]
}
