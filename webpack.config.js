var path = require('path');
var HtmlWebpackPlugin = require('webpack-html-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
  devtool: "source-map",
  entry: [
    './public/index.js'
  ],
  output: {
    path: __dirname + '/public',
    //publicPath: 'https://github.com/genestd/portfolio',
    filename: "index_bundle.js"
  },
  devServer: {
    publicPath: '/',
    contentBase: __dirname + '/public'
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
      { test: /\.js$/, include: [path.resolve(__dirname, 'public')], loader: "babel-loader"},
      { test: /\.css/, loader: ExtractTextPlugin.extract("css")},
      { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]},
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
/*    new CopyWebpackPlugin([
            { from: './src/icons', to: 'icons' },
            { from: './src/styles/entypo', to: 'styles/entypo'},
            { from: './src/js/', to: 'js'}
        ]),*/
    new ExtractTextPlugin("styles.css"),
  ]
};
