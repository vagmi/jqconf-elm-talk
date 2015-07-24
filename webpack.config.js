var path = require("path");
var webpack = require("webpack");
var publicPath = "bundle/js/";
var devEntryPoints = [
    "webpack-dev-server/client?http://localhost:4000",
    "webpack/hot/only-dev-server"
];
var entryPoints = ["./client/app"];
var  loaders = ["babel"];
if(process.env.NODE_ENV !== "production"){
  publicPath = "http://localhost:4000/" + publicPath;
  entryPoints = devEntryPoints.concat(entryPoints);
  loaders = ["react-hot", "babel"];
}
module.exports = {
  devtool: "eval",
  entry: entryPoints,
  output: {
    path: path.join(__dirname, "public/bundle/js"),
    filename: "app.js",
    publicPath: publicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.woff(\?.*)?$|\.woff2(\?.*)?$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.svg(\?.*)?$|\.jpg$|\.png$|\.gif$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.ttf(\?.*)?$|\.eot(\?.*)?$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jsx?$/,
        loaders: loaders,
        include: path.join(__dirname, "client")
      },
      {
        test: /\.css$/,
        loader: "!style!css"
      },
      {
        test: /\.less$/,
        loader: "!style!css!less"
      }]
  }
};
