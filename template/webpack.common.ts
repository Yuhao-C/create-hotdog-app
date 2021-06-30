import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBarPlugin from 'webpackbar';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import StylelingPlugin from 'stylelint-webpack-plugin';
import getDevConfig from './webpack.dev';
import getProdConfig from './webpack.prod';

// the public URL address of the output files when referenced in a browser
const PUBLIC_URL = '/';

const commonConfig: webpack.Configuration = {
  entry: './src/index.tsx',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint: { name: string }) => `runtime-${entrypoint.name}`,
    },
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: PUBLIC_URL.replace(/\/$/, ''), // remove trailing slash here
    }),
  ],
  stats: 'errors-only',
};

module.exports = (_: Record<string, string>, args: Record<string, string>) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, getDevConfig());
    case 'production':
      return merge(commonConfig, getProdConfig(PUBLIC_URL));
    default:
      throw new Error('No matching configuration was found!');
  }
};
