# Modern app seed for legacy Angular apps (1.x) 

[![Build Status](https://travis-ci.org/zxbodya/angular-webpack-seed.svg?branch=master)](https://travis-ci.org/zxbodya/angular-webpack-seed)
[![Coverage Status](https://coveralls.io/repos/zxbodya/angular-webpack-seed/badge.svg?branch=master&service=github)](https://coveralls.io/github/zxbodya/angular-webpack-seed?branch=master)
[![codecov.io](https://codecov.io/github/zxbodya/angular-webpack-seed/coverage.svg?branch=master)](https://codecov.io/github/zxbodya/angular-webpack-seed?branch=master)

It is quite opinionated, so feel free - to make suggestions to improve it.

Includes following:

 - [Webpack 2](https://webpack.js.org/) (modules, assets bundling)
 - [babel](http://babeljs.io/) (ES2015 support)
 - [ng-annotate](https://github.com/olov/ng-annotate)
 - karma test runner configuration with code coverage reports
 - [node-sass](https://github.com/sass/node-sass) for styles + AutoPrefixer 


Requirements:
 
- NodeJS 6+ is required.
- [Yarn](https://yarnpkg.com) is optional to use, but I recommend using it. (if no - npm is ok).  

### Usage

1. Install dependencies `yarn i`
2. Start dev server `yarn yarn dev` open [http://localhost:2992](http://localhost:2992)
3. Lint your code `yarn run lint`
4. Run unit tests `yarn run test`
5. Create build for deployment `yarn run build` for production build, or `yarn run build-dev` for development build

To analyze your bundle size - I recommend using [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer)

---

## Getting started

[Angular Guide](https://docs.angularjs.org/guide)

At first be sure that you are familiar with ES2015, some useful materials:

 - [tutorial from BabelJS](http://babeljs.io/docs/learn-es2015/)
 - [Exploring ES6: Upgrade to the next version of JavaScript by Dr. Axel Rauschmayer](http://exploringjs.com/)
  
Read [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) - it is important to know, what is good and what is not, and why.

At least briefly read [webpack documentation](http://webpack.github.io/docs/) it is crucial to understand how it works in general. 

---

## Usage advice 

### Directory layout

    ├── build              # build stats
    ├── public             # public folder (webroot for dev server)
    │   ├── _assets        # build results - assets packed by webpack
    │   └── index.html     # one of app entry points, for dev server
    └── src                # app sources
        ├── demo           # one of app modules
        ├── index.js       # app entry module
        ├── index.scss     # 
        └── index.test.js  # entry point for test karma

### Styleguide

Except my notes below(which can be incomplete and outdated), I highly encourage you to check out:

- [Angular Style Guide, by John Papa](https://github.com/johnpapa/angular-styleguide)
- [Angular 1.x styleguide, by Todd Motto](https://github.com/toddmotto/angular-styleguide)

---

### Angular specific conventions

Application organisation rules:

1. Split app into angular "modules" 
    - every module should have own folder, and should be defined in one file which will require all module components and will export module name 
    - module can have nested modules
    - module can require other modules which are direct siblings of it or parent modules, or modules nested in it (if you need to require module that is nested in "sibling" - you you should move it up by hierarchy before requiring it)
2. Keep modules small - if module is too big, maybe it should be few modules 
3. Every file should have only one entity inside it, for example if there is directive which has controller and template - there should be three files, plus likely two for unit tests   
4. Group related resources by folders
5. Name files with suffixes `Directive`, `Controller`, `Factory`, `Service`, `Provider`
6. Use `.test` suffix for test file names

### Directives

1. Prefer to use isolated scopes
2. Use controllerAs syntax 
3. Controller should act as ViewModel, use $scope only if you need it
4. All model layer (data fetching, business logic) should be in services
