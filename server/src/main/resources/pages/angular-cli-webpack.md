# Configure Webpack with Angular CLI

The remarkable goal of Angular CLI is speed up the development hiding all the configuration tasks to the developer.

This is very good to start up a new project but it becomes quickly a limitation when the project become more complicated.

Many developers asked to be able to edit directly Webpack for their project because the hidden configuration of Angular CLI was not compatible with their requirements.

A debate arose in the community, you can find the discussion [here](https://github.com/angular/angular-cli/issues/1656#issuecomment-240171375).

## When to eject Webpack?

If you need to tune or customize your production environment. I suggest that you try to stick as much as possible with Angular CLI and try investigate deeply the problem before to eject the project.

## Eject the Webpack configuration

If you generate your webpack configuration you will lose many feature of Angular CLI.
For a good reason the Angular CLI development team cannot take the responsibilities for your changes.
Save / commit / version your project before the ejection process.
You will have to manage the webpack for yourself, the present of Angular CLI is a 400-500 lines of code file.

If you really need to configure webpack ```ng eject``` you can generate the file with the configuration.

You will receive a message similar to this:

``` terminal
`==========================================================================================
Ejection was successful.

To run your builds, you now need to do the following commands:
   - "npm run build" to build.
   - "npm test" to run unit tests.
   - "npm start" to serve the app using webpack-dev-server.
   - "npm run e2e" to run protractor.

Running the equivalent CLI commands will result in an error.

==========================================================================================
Some packages were added. Please run "npm install".
```

Angular CLI is now gone, don't call it again, if you try to use ng serve you will receive this error

```terminal
An ejected project cannot use the build command anymore.
```

you should run ```npm install``` as recommended by Angular CLI

Now you will find in your frontend root package a new file: _webpack.config.js_
