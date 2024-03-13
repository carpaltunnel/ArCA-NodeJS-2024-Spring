# nodemon
[nodemon](https://nodemon.io/) is a convenient utility for development that will monitor your code files and automatically restart your application when changes are made.  There's really not much to say here except that this is designed for **development**, not for a production environment.  I find it most helpful for web applications where I'm changing multiple files in multiple locations like controllers, coordinators, and models.  It's also very convenient for UI work.

## Install
While I generally avoid installing Node packages globally, `nodemon` is a good example of one that I will.  The reason for this is that I can then use it on any of my projects without installing it as a dev dependency on every one.  Plus, the `nodemon` command then lands in your path so you can invoke it without having to reference the `node_modules/nodemon/bin` path.  Note that you may need elevated permissions to be able to do global installs, depending on your OS and local configuration.
`npm install -g nodemon`

## Usage
Usage is extremely easy, simply use `nodemon` instead of `node` to start your application.  Assuming an Express application with an entry point of `index.js`, you'd just execute : 
`nodemon index.js`

When a file change is detected, you'll see a log message from nodemon that indicates a restart/reload : 
```
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
[development] Listening on http://localhost:8000
```

There are a variety of [configuration items](https://github.com/remy/nodemon#config-files) to customize nodemon usage but the defaults have usually worked for me.