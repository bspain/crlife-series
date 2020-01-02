const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "public/"), 
    // port: 3000,
    // publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});