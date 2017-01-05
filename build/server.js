'use strict';

/*jslint node: true */
/*jshint esversion: 6 */
var path = require('path');
var os = require('os');
var fs = require('fs');
var Busboy = require('busboy');
var express = require('express');
var app = express();
app.port = 8e3;
// Express Routeur
app.route("/").get(function (req, res) {
  return app.getReceiver(req, res);
}).post(function (req, res) {
  return app.postReceiver(req, res);
});
/**
 * [response from GET http json]
 * @method getReceiver
 * @param  {[array]}    req [request]
 * @param  {[array]}    res [response]
 * @return {[objet]}        [json]
 */
app.getReceiver = function (req, res) {
  res.json({
    message: "you will get nothing here"
  });
  res.end();
};
/**
 * [response from POST Request]
 * @method postReceiver
 * @param  {[array]}    req [request]
 * @param  {[array]}    res [response]
 * @return {[type]}         [busboy]
 */
app.postReceiver = function (req, res) {
  // -- Busboy -- init capture req.headers
  var busboy = new Busboy({
    headers: req.headers
  });
  // -- Busboy -- on -- file
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('Filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    // -- Busboy -- on -- data
    // file.on('data', data => {
    // console.log('Filename [' + filename + '] got ' + data.length + ' bytes');
    // });
    // -- Busboy -- end --
    file.on('end', function () {
      console.log('Filename [' + filename + '] Finished');
    });
    // SaveFolder dir, filemane
    var saveTo = path.join(os.tmpdir(), path.basename(filename));
    // File piping => writeStreamFile
    file.pipe(fs.createWriteStream(saveTo));
  });
  // -- Busboy -- finish
  busboy.on('finish', function () {
    // Return writeHead
    res.writeHead(200, {
      'Connection': 'close'
    });
    // Return end
    res.end('Upload is Finished!');
  });
  // Req.pipe(busboy)
  return req.pipe(busboy);
};
// Express up app.port
app.listen(app.port);
// for debug support
module.exports = app;
