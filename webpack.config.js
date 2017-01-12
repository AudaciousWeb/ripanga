const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/src'),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-decorators-legacy', 'transform-runtime'],
          presets: ['latest', 'react', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css?localIdentName=[name]__[local]___[hash:base64:5]&modules&importLoaders=1!autoprefixer?browsers=last 2 versions!sass',
      },
    ],
  },

  output: {
    path: './',
    filename: 'index.js',
    // publicPath: '/build/',  NOT NEEDED? Ben 161121
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  externals: {
    react: 'umd react',
    'react-dom': 'umd react-dom',
  },
};
