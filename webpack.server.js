const path = require('path')

module.exports = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather then for the browser
  target: 'node', 

  // Tell webpack the root file of our server application
  entry: './src/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
    // path: path module helper(nodeJS)
    // __dirname: reference to the current working directory the our project is being excuted in
    // 'build' directory: will be generated automatically
  }, 

  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // not run Babel over files inside
        options: {
          presets: [
            'react', // JSX -> normal javascript function calls
            'stage-0', // Handling async codes
            ['env', { targets: { browsers: ['last 2 versions'] } }] // Run all of the different transform rules neede to meet the requirements of the latest 2 versions of all popular browser
          ]
        }
      }
    ]
  }
}