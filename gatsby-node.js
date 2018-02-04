const webpack = require('webpack')

exports.modifyWebpackConfig = function ({config, stage}) {
  config.merge({
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          URL: JSON.stringify(process.env.URL || 'https://krddevdays.ru')
        }
      })
    ]
  })
  return config
}
