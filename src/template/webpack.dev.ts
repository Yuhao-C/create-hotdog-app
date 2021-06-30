import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const getDevConfig = (): webpack.Configuration & {
  devServer: WebpackDevServer.Configuration;
} => ({
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
});

export default getDevConfig;
