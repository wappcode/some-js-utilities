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