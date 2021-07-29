import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBarPlugin from 'webpackbar';
import StylelingPlugin from 'stylelint-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const commonConfig: webpack.Configuration = {
  entry: './src/index.tsx',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint: { name: string }) => `runtime-${entrypoint.name}`,
    },
    minimizer: [new CssMinimizerPlugin()], // by default works in produciton only
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new StylelingPlugin({
      fix: true,
      extensions: ['css', 'scss', 'sass', 'less'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new WebpackBarPlugin({}),
  ],
  stats: 'errors-only',
};

export default commonConfig;
