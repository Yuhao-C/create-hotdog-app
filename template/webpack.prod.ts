import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SizePlugin from 'size-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { green, cyan } from 'chalk';
import commonConfig from './webpack.common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

// the pathanme of the output files when referenced in a browser
let publicPath = '/';

try {
  const homepagePath = new URL(packageJson.homepage).pathname;
  publicPath =
    homepagePath[homepagePath.length - 1] === '/'
      ? homepagePath
      : `${homepagePath}/`;
} catch (e) {
  // invalid homepage URL, resume with default public path "/"
}

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

const prodConfig: webpack.Configuration = {
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
    new SizePlugin({ writeFile: false }),
    new CleanWebpackPlugin(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: publicPath.replace(/\/$/, ''), // remove trailing slash here
    }),
    {
      apply: (compiler: webpack.Compiler): void => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          const { log } = console;
          log(
            `The project is built assuming it is hosted at ${green(
              publicPath,
            )}`,
          );
          log(
            `You can control this with the ${green(
              'homepage',
            )} field in your ${cyan('package.json')}.\n`,
          );
          log(`The ${cyan('dist')} folder is ready to be deployed.\n`);

          // copy public folder
          const appDirectory = fs.realpathSync(process.cwd());
          const resolveApp = (relativePath: string) =>
            path.resolve(appDirectory, relativePath);
          fs.copySync(resolveApp('public'), resolveApp('dist'), {
            dereference: true,
            filter: file => file !== resolveApp('public/index.html'),
          });
        });
      },
    },
  ],
  devtool: 'source-map',
};

export default merge(commonConfig, prodConfig);
