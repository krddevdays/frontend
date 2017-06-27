import path from 'path'

import {
  createConfig,
  entryPoint,
  setOutput,
  babel,
  match,
  addPlugins,
  webpack,
  file
} from 'webpack-blocks'

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
  setOutput({
    publicPath: '/',
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  }),
  babel(),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [
    file(),
    (context, {merge}) => merge({
      module: {
        rules: [
          Object.assign({
            use: [
              {
                loader: 'image-webpack-loader'
              }
            ]
          }, context.match)
        ]
      }
    })
  ]),
  match(['*.js'], [
    (context, {merge}) => merge({
      module: {
        rules: [
          Object.assign(
            {
              enforce: 'pre',
              loader: 'eslint-loader'
            },
            context.match
          )
        ]
      }
    })
  ]),
  addPlugins([
    process.env.PHENOMIC_ENV !== 'static' && new webpack.HotModuleReplacementPlugin(),
    process.env.NODE_ENV === 'production' && new webpack.optimize.UglifyJsPlugin()
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
