import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import SizePlugin from 'size-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

type FileName = Required<webpack.Configuration>['output']['filename'];
const getFileName =
  (type: 'js' | 'css'): FileName =>
  pathData => {
    const prefix = `static/${type}`;
    const { chunk, contentHashType } = pathData;
    if (!chunk) {
      return '';
    }
    const { id, name, hash, contentHash } = chunk;
    const computedHash =
      contentHashType && contentHash
        ? contentHash[contentHashType].substr(0, 8)
        : hash;
    if (!name) {
      return `${prefix}/vendors_${id}.${computedHash}.${type}`; // vendors chunk
    }
    return `${prefix}/${name}_${id}.${computedHash}.${type}`; // entry chunk
  };

const getProdConfig = (publicPath: string): webpack.Configuration => ({
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName('js'),
    chunkFilename: 'static/js/chunk_[id].[contenthash:8].js', // dynamic import chunk
    publicPath,
    assetModuleFilename: 'static/assets/[name].[contenthash:8][ext]',
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.s(a|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
      chunkFilename: 'static/css/chunk_[id].[contenthash:8].css',
    }),
    new CssMinimizerPlugin(),
    new SizePlugin({ writeFile: false }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
});

export default getProdConfig;
