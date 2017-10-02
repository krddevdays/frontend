import path from 'path'

import webpack from 'webpack'
import {
  createConfig,
  entryPoint,
  setOutput,
  addPlugins,
  env,
  match,
  setDevTool
} from '@webpack-blocks/webpack'
import { file } from '@webpack-blocks/assets'
import babel from '@webpack-blocks/babel'

module.exports = (config) => createConfig([
  entryPoint({
    [config.bundleName]: [
      process.env.PHENOMIC_ENV !== 'static' &&
      require.resolve('webpack-hot-middleware/client'),
      process.env.PHENOMIC_ENV !== 'static' &&
      require.resolve('react-hot-loader/patch'),
      './App.js'
    ].filter(item => item)
  }),
  setDevTool('source-map'),
  setOutput({
    publicPath: '/',
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  }),
  match('*.js', {exclude: /node_modules/}, [
    babel(),
    (context, util) => util.addLoader({
      ...context.match,
      enforce: 'pre',
      loader: 'eslint-loader'
    })
  ]),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [
    file(),
    (context, util) => util.addLoader({
      ...context.match,
      use: ['image-webpack-loader']
    })
  ]),
  match(['*.pdf'], [
    file()
  ]),
  env('production', [
    addPlugins([
      new webpack.optimize.UglifyJsPlugin()
    ])
  ]),
  addPlugins([
    process.env.PHENOMIC_ENV !== 'static' && new webpack.HotModuleReplacementPlugin()
  ].filter(item => item)),
  (context, util) => util.merge({
    // eslint-disable-next-line max-len
    // https://github.com/facebookincubator/create-react-app/blob/fbdff9d722d6ce669a090138022c4d3536ae95bb/packages/react-scripts/config/webpack.config.prod.js#L279-L285
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  })
])
