## React Slingshot


### Originally forked from [react-slingshot](https://github.com/coryhouse/react-slingshot)


### Overview

#### This repo modifies and extends coryhouse/react-slingshot:
1. Mongooose + express for backend development.
2. Gulp as a task runner, instead of npm scripts.
3. Jasmine test runner, instead of Mocha.
4. Procfile for deployment on Heroku.
5. signin/singup using Passport and relevant React components.



### Usage

1. Make sure you have [Gulp 4 and gulp-cli installed](http://digitaldrummerj.me/installing-gulp-4/)
2. And [Mongo as well](https://www.mongodb.com/download-center#community)
2. Create a /data folder in project root for mongodb local server
3. `$mongod -dbpath="data"`
4. `$gulp`
5. That runs the default gulp task, which runs the browser-sync dev server with webpack watching files for changes and hot-module-replacing at localhost:3000, express server at localhost:3007, runs tests and re-runs on changes and launches your browser at the home page of the app.