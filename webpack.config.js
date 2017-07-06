var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname, './');
var APP_PATH = path.resolve(ROOT_PATH, './src');
var BUILD_PATH = path.resolve(ROOT_PATH, './dist');


process.env.BABEL_ENV = TARGET;

var common = {
  entry: path.resolve(APP_PATH, './main.jsx'),
  resolve: { extensions: ['.js', '.jsx', '.json'] },
  output: { path: BUILD_PATH, filename: 'bundle.js', publicPath: '/dist/' },
  module: {
    rules: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], include: APP_PATH },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },      
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },      
      { test: /\.scss$/,
          use: [
            { loader: 'style-loader' }, 
            { loader: 'css-loader' }, 
            { loader: 'sass-loader'}
          ]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
          use: [
            { loader: 'url-loader',
                options: {
                  limit: 10000,
                  minetype:  'application/font-woff' 
                  }
            }
          ]
      },
      { test   : /\.(png|jpg)$/, loader : 'url-loader' }, 
        
    ]
  },  
  plugins: [
    new HtmlwebpackPlugin({ 
      title: 'Sample Application',
      template: path.resolve(ROOT_PATH, './index.html') 
    }),
    // new ExtractTextPlugin('gallery.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};

  
if(TARGET === 'start' || !TARGET) {  
  module.exports = merge(common, {
    
    devtool: 'source-map', 
    devServer: {
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      inline: true,
      port:8081,
      proxy: {
      '/api/*': {
        host: '0.0.0.0',
        target: 'http://jsonplaceholder.typicode.com',
        pathRewrite: {
          '/api' : '',
        }
      }
    }
      
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
else{
   module.exports = common;
}

// devtool: 'source-map', 
// devtool: 'eval-source-map', 