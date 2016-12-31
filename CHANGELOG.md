- 1.0.1
## NEW
### Task runner
#### Grunt
Install globlaly for easy use `$ npm install -g grunt-cli` or use `/node_modules/$gruntPath`
###### Task(s) added
   - Default Task `$ grunt` or `$ grunt default`
     - JsHint

        Jshint files
     ```javascript
        { files: ['Gruntfile.js', '<%= pkg.main %>'] }
     ```
       - Options

         ```javascript
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
     - Livereload `$ grunt default` on save  `# ./src/server.js`

- 1.0.0
 - init
