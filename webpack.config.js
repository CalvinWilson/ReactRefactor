var webpack = require('webpack');

module.exports = {
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "js/bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      "_": "underscore",
      "$": "jquery"
    })
  ],
  module: {
    loaders: [
      {test:/\.html$/, loader:'mustache'},
      {test: /\.css$/, loader:'style!css'},
      {test: /\.json$/, loader:'json'},
      {
        test: /\.jsx?$/i,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  }
}