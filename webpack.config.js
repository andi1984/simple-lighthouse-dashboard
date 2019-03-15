// 1. npm init
// 2. npm install --save webpack webpack-dev-server babel-loader babel-preset-es2015
// 3. mkdir dist && touch index.html
// 4. Include `<script src="/bundle.js"></script>` inside index.html
// 5. mkdir src && touch src/index.js
// 6. Add some code to index.js (e.g. `console.log('Hello, World!'))
// 7. npm start
// 8. Browse to http://localhost:8080/dist/

const webpack = require("webpack");
const path = require("path");
module.exports = {
  entry: {
    radial: "./src/radial.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000
  }
};
