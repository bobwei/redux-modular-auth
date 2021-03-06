import path from 'path';

const SRC_PATH = path.join(__dirname, 'src');
const LIB_PATH = path.join(__dirname, 'lib');

const config = {
  entry: [SRC_PATH],
  output: {
    path: LIB_PATH,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  externals: {
    ramda: 'ramda',
    'redux-actions': 'redux-actions',
    reselect: 'reselect',
    'react-redux': 'react-redux',
    recompose: 'recompose',
    react: 'react',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader', 'remove-flow-types-loader'],
        include: SRC_PATH,
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
