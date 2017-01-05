"use strict";
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const express = require('express');
const app = express();
app.port = 8e3;
// Express Routeur
app.route("/").get((req, res) => app.getReceiver(req, res)).post((req, res) => app.postReceiver(req, res)).put((req, res) => app.postReceiver(req, res));
/**
 * [GET response from http req return a json message]
 * @method getReceiver
 * @param  {[array]}    req [request]
 * @param  {[array]}    res [response]
 * @return {[objet]}        [message: "you will get nothing here"]
 */
app.getReceiver = (req, res) => {
  console.log(req);
  // response Json res
  res.json({
    message: "you will get nothing here"
  });
  // response ending
  res.end();
};
/**
 * [response from POST Request]
 * @method postReceiver
 * @param  {[array]}    req [request]
 * @param  {[array]}    res [response]
 * @return {[type]}         [busboy]
 */
app.postReceiver = (req, res) => {
  // -- Busboy -- init capture req.headers
  const busboy = new Busboy({
    headers: req.headers
  });
  console.log(req.headers);
  // -- Busboy -- on -- file
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('Filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    // -- Busboy -- on -- progress data
    // file.on('data', data => {
    //   console.log('Filename [' + filename + '] got ' + data.length + ' bytes');
    // });
    // -- Busboy -- end --
    file.on('end', () => {
      console.log('Filename [' + filename + '] Finished');
    });
    // SaveFolder dir, filemane
    const saveTo = path.join(os.tmpdir(), path.basename(filename));
    // File piping => writeStreamFile
    file.pipe(fs.createWriteStream(saveTo));
  });
  // -- Busboy -- finish
  busboy.on('finish', () => {
    // response writeHead
    res.writeHead(200, {
      'Connection': 'close'
    });
    // response end
    res.end('Upload is Finished!');
  });
  // init a .pipe on the req to busboy()
  return req.pipe(busboy);
};
// Express up htpp on app.port
app.listen(app.port);
// for debug support
module.exports = app;
