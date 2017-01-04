# version - 1.0.3

02/01/2017

## Vulnerabilities runner (new)

### Snyk integration

# version - 1.0.2

01/01/2017

## Build runner (new)

### Travis

[Travis Project link](https://travis-ci.org/Peterfurax/streamVideoSrv)

```
$ nvm node 4 & 6
$ npm install
$ grunt default
$ node dist/server.min.js & mocha
```

## Unit Test (new)

- Mocha
- Chai
- Chai-http
- Should

# version - 1.0.1

30/12/2016

# New

## Task runner

### Grunt

Install globlaly for easy use `$ npm install -g grunt-cli` or use `/node_modules/grunt/bin/grunt <task>`

#### Task(s) added

- Default Task `$ grunt` or `$ grunt default`

  - JsHint

    Jshint files

    ```javascript
    { files: ['Gruntfile.js', '<%= pkg.main %>'] },    
      {
        "node": true,
        "esversion": 6
      }
    ```

  - Babel

    Babelify '<%= pkg.main %>' to build

    ```javascript
    "options": {
       "presets": ['es2015'],
       "sourceMap": false
     },
     dist: {
       files: [{
         "expand": true,
         "cwd": "src/",
         "src": ["<%= pkg.main %>"],
         "dest": "build/",
         "ext": ".js"
       }]
     }
    ```

  - Uglify

    Minify, uglify & drop console.* to `# ./dist/server.min.js`

    ```javascript
    {"drop_console": true}
    ```

- Watch Task `$ grunt watch`

  - Livereload `$ grunt default` on save `# ./src/server.js`

- 1.0.0

  - init
