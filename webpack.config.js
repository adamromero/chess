const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
   mode: "development",
   entry: "./src/chess.js",
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
               presets: ["@babel/preset-env"],
               plugins: ["transform-class-properties"]
            }
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               {
                  loader: "postcss-loader",
                  options: {
                     plugins: [
                        autoprefixer({
                           browsers: ["ie >= 8", "last 10 version"]
                        })
                     ],
                     sourceMap: true
                  }
               }
            ]
         },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               {
                  loader: "postcss-loader",
                  options: {
                     plugins: [
                        autoprefixer({
                           browsers: ["ie >= 8", "last 4 version"]
                        })
                     ],
                     sourceMap: true
                  }
               },
               "sass-loader"
            ]
         },
         {
            test: /\.(png|jpg|gif)$/i,
            use: [
               {
                  loader: "url-loader",
                  options: {
                     limit: 8192
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css"
      }),
      new OptimizeCssAssetsPlugin({
         assetNameRegxp: /\.css$/,
         cssProcessor: require("cssnano"),
         cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }]
         },
         canPrint: true
      })
   ]
};
