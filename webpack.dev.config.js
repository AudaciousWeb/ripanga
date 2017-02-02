const path = require('path');

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/src'),
          path.join(__dirname, '/sandbox'),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-decorators-legacy', 'transform-runtime'],
          presets: ['latest', 'react', 'stage-0'],
        },
      },
      {
        test: /\.s?[ca]ss$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]__[path][name]__[hash:base64:5]',
          },
        }, {
          loader: 'autoprefixer-loader',
          options: {
            browsers: 'last 2 versions',
          },
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },

  output: {
    path: './',
    filename: 'index.js',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
