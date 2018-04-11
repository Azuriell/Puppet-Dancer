const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve('./dist/'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-env']
              }
            }
          }
        ]
      }
};