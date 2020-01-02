const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  resolve: { extensions: [".js", ".ts", ".tsx"] },
  module: {
    rules: [
      {
        // All files with '.ts' or '.tsx' extension will be handled by 'ts-loader'
        test: function(modulePath) {
          return ( modulePath.endsWith('.ts') || modulePath.endsWith('.tsx') ) && !(modulePath.includes("__tests__") || modulePath.includes("__mocks__")) 
        }, 
        loader: "ts-loader"
      },
      {
        test: /\.(s*)css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      } 
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "public/",
    filename: "bundle.js"
  },
};