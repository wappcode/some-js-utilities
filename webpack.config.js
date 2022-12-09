const path = require('path');
const nodeExternals = require( "webpack-node-externals" );
module.exports = {
  mode: 'production',
  entry: {
    'stringutilities': {
        import:  './src/string-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'canvasutilities': {
        import:  './src/canvas-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'colorutilities': {
        import:  './src/color-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'generalutilities': {
        import:  './src/general-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'imageutilities': {
        import:  './src/image-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'peridoutilities': {
        import:  './src/period-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'storageutilities': {
        import:  './src/storage-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
            umdNamedDefine: true,
          },
    },
    'urlutilities': {
        import:  './src/url-utilities.ts',
        library: {
            // all options under `output.library` can be used here
            name: 'percent-chart',
            type: 'umd',
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [ nodeExternals() ], // excluye las librerias de node al compilar
  output: {
    filename: 'src/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};