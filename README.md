![logo](https://cloud.githubusercontent.com/assets/2873924/7519952/a8d365b4-f4e3-11e4-8bbc-67c4cc8512a2.png)
---
> Appshaper is a complete open source solution for building professional-quality web apps.

Appshaper is a modular library with an open architecture. It provides you with AMD modules that are
typically used when building web apps and exposes hooks that allow you to easily swap components.
This means you can use Appshaper modules to build your app, but it's also easy to combine Appshaper
modules with third party modules or your own custom modules.

Copyright &copy; 2015 Jeroen Reurings, all rights reserved.  
Licensed under the Apache License, see the [LICENSE file](https://github.com/appshaper/appshaper/blob/master/LICENSE)
in the root of the project.

####Requirements

Appshaper is build using AMD modules, so it requires an AMD compatible JavaScript module loader. We
use [RequireJS](https://github.com/jrburke/requirejs).

Appshaper is written in ECMAScript 5, which is supported in all recent browsers. If you need to
support older browsers (Internet Explorer 8 and lower), then we recommend including [es5-shim](https://github.com/es-shims/es5-shim)
into your project.

####Installation
Appshaper uses NPM for dependency management and [Grunt.js](http://gruntjs.com) for her build process.
In order to use NPM and install grunt, you first need to [download an install Node.js](https://nodejs.org/download).
Checkout or download the latest release of Appshaper into your localhost folder and go to the root
directory in your terminal. Here you type the following commands:

```
npm install
```
This instructs NPM to fetch all dependencies. They'll be placed in the 'node_modules' folder.

```
grunt
```
This instructs Grunt.js to build the project. It will put all build files in the 'dist' folder and
will also automatically create the project documentation based on the code comments. The generated
documentation will be put in the 'doc' folder.

####Documentation

You can read the Appshaper API reference documentation by going to the "doc" directory in the project.
Alternatively you can read the API reference documentation Online.

####Testing
To run the Appshaper unit tests (written using Jasmine). Go to appshaper in your browser (localhost) and
navigate to the test folder. f.e. http://localhost/appshaper/test.

####Used principles & practices

- Convention over configuration
- Composition over inheritance
- Test driven development

