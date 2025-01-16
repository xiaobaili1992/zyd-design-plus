import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';
import pkg from './package.json' assert { type: 'json' };

const { version } = pkg;

const date = new Date();

const timeStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date
  .getDate()
  .toString()
  .padStart(2, 0)} ${date.getHours().toString().padStart(2, 0)}:${date
  .getMinutes()
  .toString()
  .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index-es.js',
      format: 'es',
      banner: `/*!
 * index-es.js v${version}
 * building time ${timeStr}
 * (c) 2022-2024 xiaobai.li
 * Copyright (c) 2024 Dee. All Rights Reserved.
 */`,
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'libBuild',
      banner: `/*!
* index.js v${version}
* building time ${timeStr}
* (c) 2022-2024 xiaobai.li
* Copyright (c) 2024 Dee. All Rights Reserved.
*/`,
    },
  ],
  treeshake: true,
  plugins: [
    resolve(),
    commonjs(),
    vue({
      preprocessStyles: true,
      target: 'browser',
      css: false,
      compileTemplate: true,
    }),
    postcss({
      extensions: ['.css', '.scss'],
      extract: 'styles.css',
      minimize: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      presets: [['@babel/preset-env', { targets: '> 0.25%, not dead', useBuiltIns: 'usage', corejs: 3 }], '@vue/babel-preset-jsx'],
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    }),
    terser(),
    // serve({
    //   open: true,
    //   contentBase: ['dist'], // 'public' 目录包含 index.html
    //   host: 'localhost',
    //   port: 3000
    // }),
    // livereload('dist')
  ],
  external: ['vue', 'element-ui', "dee-svg-icon-plus"],
};
