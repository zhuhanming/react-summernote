const path = require('path');
const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    'react-summernote': path.join(src, 'Summernote.jsx'),
  },
  output: {
    path: dist,
    filename: 'react-summernote.js',
    library: 'ReactSummernote',
    libraryTarget: 'umd',
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      jquery: {
        root: '$',
        commonjs2: 'jquery',
        commonjs: 'jquery',
        amd: 'jquery',
      },
      jQuery: {
        root: '$',
        commonjs2: 'jquery',
        commonjs: 'jquery',
        amd: 'jquery',
      },
    },
  ],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyPlugin({
      patterns: [{ from: 'node_modules/summernote/dist/lang', to: '../lang' }],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
};
