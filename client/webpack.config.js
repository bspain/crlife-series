const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  resolve: { extensions: [".js", ".ts", ".tsx"] },
  module: {
    rules: [
      {
        // All files with '.ts' or '.tsx' extension will be handled by 'ts-loader'
        test: function(modulePath) {
          return ( modulePath.endsWith('.ts') || modulePath.endsWith('.tsx') ) && !modulePath.includes("__tests__") 
        }, 
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    // contentBase: path.join(__dirname, "public/"), 
    // port: 3000,
    // publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};