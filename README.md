# create-hotdog-app

> A Buddhist goes to a hot dog vendor and the vendor asks him "Hey buddy what can I make ya?".
> "Make me one with everything" replies the Buddhist.

Production-ready all-in-one react typescript boilerplate, with babel, webpack, prettier, eslint, stylelint, commitlint, lint-staged, and husky.

## Get Started

### yarn

```bash
yarn create hotdog-app ./hotdog-app
```

### npx

```bash
npx create-hotdog-app ./hotdog-app
```

### folder structure

```bash
hotdog-app
├── .husky
│   ├── _
│   │   └── husky.sh
│   ├── .gitignore
│   ├── commit-msg
│   └── pre-commit
├── .vscode
│   ├── extensions.json // recommended VS Code extension
│   └── settings.json // recommended VS Code settings
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts
│   └── post-build.ts
├── src
│   ├── types
│   │   └── global.d.ts
│   ├── app.less
│   ├── app.tsx
│   └── index.tsx
├── .babelrc
├── .commitlintrc
├── .eslintrc
├── .gitignore
├── .prettierrc
├── .stylelintrc
├── package.json
├── README.md
├── tsconfig.eslint.json
├── tsconfig.json
├── webpack.common.ts
├── webpack.dev.ts
├── webpack.prod.ts
└── yarn.lock
```

## Project Setup

The created hot dog project requires [Visual Studio Code](https://code.visualstudio.com/) and [Yarn 1](https://classic.yarnpkg.com/en/docs/install).

### VS Code extensions

Open the project with VS Code, and installed the recommended extensions following the pop-up prompt. Alternatively, go to the extension tab on the left and search `@recommended`, then click `Install Workspace Recommended Extensions`.

## Project Scripts

### dev

Start a development server at <http://localhost:3000> using [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)

```bash
yarn dev
```

### build

Builds the app for production to the `dist` folder using [Babel](https://babeljs.io/) and [Webpack](https://webpack.js.org/)

```bash
yarn build
```

## serve

Serve the production code locally at <http://localhost:5000> after `yarn build`.

```bash
yarn serve 
```
