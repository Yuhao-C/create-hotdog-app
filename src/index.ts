import path from 'path';
import { cyan, green, red } from 'chalk';
import fs from 'fs-extra';
import commander from 'commander';
import { spawn, execSync } from 'child_process';
import {
  nodeYarnVersionCheck,
  dirNameCheck,
  appNameCheck,
  checkDirSafe,
  getPackageJsonFields,
  renameGitignore,
  updateReadme,
  updatePackageJson,
  printSuccessMessage,
  updateFile,
  parseSnakeCase,
} from './helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

const { log, error } = console;

const handleError = (err: Error, dir: string) => {
  error(red(`❌ ${err}`));
  fs.rm(dir, { recursive: true, force: true });
};

const main = async () => {
  let dirName = process.argv[2];
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(green('<project-directory>'))
    .action(name => {
      dirName = name;
    })
    .parse(process.argv);

  dirNameCheck(dirName, program.name());

  nodeYarnVersionCheck();

  dirName = dirName as unknown as string;

  const root = path.resolve(dirName);
  const appName = path.basename(root);
  appNameCheck(appName);

  fs.ensureDirSync(root);
  checkDirSafe(root, dirName);

  log();
  log(`Creating a new hotdog app in ${cyan(root)}.`);
  log();

  try {
    const packageJsonFields = await getPackageJsonFields(appName);
    const displayName = packageJsonFields.name || appName;
    const snakeCaseDisplayName = parseSnakeCase(displayName);

    // copy file to user directory
    const templateDir = path.resolve(__dirname, 'template');
    fs.copySync(templateDir, root);

    renameGitignore(root);

    updateReadme(displayName, root);

    updatePackageJson(packageJsonFields, root);

    updateFile(
      path.join(root, 'public', 'manifest.json'),
      {
        regex: /Hotdog App/,
        replacement: snakeCaseDisplayName,
      },
      {
        regex: /Create Hotdog App Sample/,
        replacement: snakeCaseDisplayName,
      },
    );

    updateFile(path.join(root, 'src', 'app.tsx'), {
      regex: /Hotdog App/,
      replacement: snakeCaseDisplayName,
    });

    updateFile(path.join(root, 'public', 'index.html'), {
      regex: /Hotdog App/,
      replacement: snakeCaseDisplayName,
    });

    packageJsonFields.desc &&
      updateFile(path.join(root, 'public', 'index.html'), {
        regex: /Website created using create-hotdog-app/,
        replacement: packageJsonFields.desc,
      });

    // initialize git and install dependencies
    execSync('git init -q', { cwd: root });
    log('\nInitialized a git repository.');
    log('\nInstalling packages. This might take a few minutes.\n');
    const yarnInstall = spawn('yarn', ['install', '--cwd', root], {
      stdio: 'inherit',
    });
    yarnInstall.on('error', err => handleError(err, root));
    yarnInstall.on('exit', code => {
      if (code === 0) {
        printSuccessMessage(packageJsonFields.name, root, dirName);
      } else {
        fs.rm(root, { recursive: true, force: true });
      }
    });
  } catch (err) {
    handleError(err, root);
  }
};

main();
