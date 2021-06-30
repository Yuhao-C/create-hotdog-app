import path from 'path';
import fs from 'fs-extra';
import { cyan } from 'chalk';

const { log } = console;

const copyPublicFolder = () => {
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = (relativePath: string) =>
    path.resolve(appDirectory, relativePath);
  fs.copySync(resolveApp('public'), resolveApp('dist'), {
    dereference: true,
    filter: file => file !== resolveApp('public/index.html'),
  });
};

const promptServe = () => {
  log(`The ${cyan('dist')} folder is ready to be deployed.\n`);
  log(`You may serve it locally by running:\n`);
  log(`  ${cyan('yarn')} serve\n`);
};

copyPublicFolder();
promptServe();
