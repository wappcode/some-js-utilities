const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    somejsutilities: {
      import: './src/somejsutilities.ts',
      library: {
        type: 'umd2',
        name: 'somejsutilities',
        umdNamedDefine: true,
      },
    },
    'string-utilities': {
      import: './src/string-utilities.ts',
      library: {
        type: 'umd2',
        name: 'string-utilities',
        umdNamedDefine: true,
      },
    },
    'canvas-utilities': {
      import: './src/canvas-utilities.ts',
      library: {
        name: 'canvas-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
    'color-utilities': {
      import: './src/color-utilities.ts',
      library: {
        name: 'color-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
    'general-utilities': {
      import: './src/general-utilities.ts',
      library: {
        name: 'general-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
    'image-utilities': {
      import: './src/image-utilities.ts',
      library: {
        name: 'image-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
    'perid-utilities': {
      import: './src/period-utilities.ts',
      library: {
        name: 'perid-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
    'storage-utilities': {
      import: './src/storage-utilities.ts',
      library: {
        name: 'storage-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
    'url-utilities': {
      import: './src/url-utilities.ts',
      library: {
        name: 'url-utilities',
        type: 'umd2',
        umdNamedDefine: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/package.json', to: 'src' },
        { from: 'README.md', to: 'src' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [nodeExternals()], // excluye las librerias de node al compilar
  output: {
    filename: 'src/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    globalObject: 'this',
  },
};
