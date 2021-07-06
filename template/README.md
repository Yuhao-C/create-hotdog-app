This project is created with [Create Hotdog App](https://github.com/Yuhao-C/create-hotdog-app).

## Setup

This project requires [Visual Studio Code](https://code.visualstudio.com/) and [Yarn 1](https://classic.yarnpkg.com/en/docs/install).

### VS Code extensions

Open the project with VS Code, and installed the recommended extensions following the pop-up prompt. Alternatively, go to the extension tab on the left and search `@recommended`, then click `Install Workspace Recommended Extensions`.

## Scripts

### dev

Start a development server at <http://localhost:3000> using [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)

```bash
yarn dev
```

### build

Builds the app for production to the `dist` folder using [Babel](https://babeljs.io/) and [Webpack](https://webpack.js.org/)

> Make sure to fill in the `homepage` field in `package.json`. The build script will use the homepage path to generate urls to static files in index.html. The dafault path is `/` if `homepage` field is not specified.

```bash
yarn build
```

## serve

Serve the production code locally at <http://localhost:5000> after `yarn build`.

```bash
yarn serve
```
