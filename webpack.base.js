module.exports = {
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