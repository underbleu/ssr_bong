const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const config = {
  // Tell webpack the root file of our server application
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
    // path: path module helper(nodeJS)
    // __dirname: reference to the current working directory the our project is being excuted in
    // 'public' directory: will be generated automatically
  }
}

module.exports = merge(baseConfig, config)