# NPM Scripts (Tasks)
We've talked about how to use NPM for package/dependency management but there's a bit more to it.  You can define "scripts" (AKA tasks) to automate work for you.  These are commonly used for preparing the environment, executing tests, running the linter, or running your project.  Grunt (and Gulp), which we'll talk about in the future, are more powerful and flexible but if you can accomplish what you need with NPM then you can forego the additional libraries.

## Scripts
Scripts are defined in the `scripts` portion of your `package.json`.  Basically you give it a name and a command (or commands) to execute.
```javascript
{
  "name": "task-example",
  "version": "1.0.0",
  "description": "Example of using NPM tasks/scripts",
  "main": "index.js",
  "scripts": {
    "test": "node ./utils/db-setup.js; node ./utils/tests.js",
    "start": "node index.js",
    "dbSetup": "node ./utils/db-setup.js"
  },
  "author": "",
  "license": "ISC"
}
```

You can define any name you want, then execute it with `npm run <name>`.  However, there are builtin lifecycle stages that you can reference directly.  `npm test` and `npm start` probably being the most common.


## Lifecycle Stages
1. pack
   1. prepack
   2. prepare
   3. postpack
2. publish
   1. prepublishOnly
   2. prepack
   3. prepare
   4. postpack
   5. publish
   6. postpublish
3. rebuild
   1. preinstall
   2. install
   3. postinstall
   4. prepare
4. restart
   1. prerestart
   2. restart
   3. postrestart
5. start
   1. prestart
   2. start
   3. poststart
6. stop
   1. prestop
   2. stop
   3. poststop
7. test
   1. pretest
   2. test
   3. posttest
   