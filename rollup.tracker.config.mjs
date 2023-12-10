import 'dotenv/config'
import buble from '@rollup/plugin-buble'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/tracker/index.js',
  output: {
    file: 'public/script.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    replace({
      '/api/send': process.env.COLLECT_API_ENDPOINT || '/api/send',
      delimiters: ['', ''],
      preventAssignment: true,
    }),
    buble({ objectAssign: true }),
    terser({ compress: { evaluate: false } }),
  ],
}
