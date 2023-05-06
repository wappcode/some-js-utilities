const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',

  entry: {
    'stringutilities': {
        import:  './public/string-fn.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'stringutilities',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'imageutilities': {
        import:  './public/image-fn.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'imageutilities',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'index': {
        import:  './public/index.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'index',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 4200,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: 'public/index.html'
      },
      {
        filename: 'string-functions.html',
        template: 'public/string-functions.html'
      },
      {
        filename: 'image-functions.html',
        template: 'public/image-functions.html'
      }

    )
  ]
  ,
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    
  },
};
