import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = {
  mode: 'development',
  output: {
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.s(a|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve('public'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    host: '0.0.0.0',
    useLocalIp: true,
  },
};

export default merge(commonConfig, devConfig);
