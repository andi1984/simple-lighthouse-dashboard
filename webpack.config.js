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
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    simpleDashboard: "./src/simple-dashboard.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "themes/default/assets/fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./.env")
    }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          warnings: false,
          ie8: false,
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
