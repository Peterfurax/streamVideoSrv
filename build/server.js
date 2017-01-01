'use strict';

var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs'),
    Busboy = require('busboy');
var HTTP_PORT = 8000;
// http createServer
http.createServer(function (req, res) {
  // POST req.methode
  if (req.method === 'POST') {
    // busboy init capture req.headers
    var busboy = new Busboy({
      headers: req.headers
    });
    console.log(req.headers);
    // busboy init on file datastream type
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      console.log('Filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      // busboy on progress
      file.on('data', function (data) {
        console.log('Filename [' + filename + '] got ' + data.length + ' bytes');
      });
      // busboy end transfert, error
      file.on('end', function () {
        console.log('Filename [' + filename + '] Finished');
      });
      // saveFolder dir, filemane
      var saveTo = path.join(os.tmpDir(), path.basename(filename));
      // file piping => writeStreamFile
      file.pipe(fs.createWriteStream(saveTo));
    });
    // busboy finish
    busboy.on('finish', function () {
      // writeHead
      res.writeHead(200, {
        'Connection': 'close'
      });
      // return res by .end('string')
      res.end('Upload is Finished!');
    });
    // busboy pipe request
    return req.pipe(busboy);
  }
  // GET PUT ... return 404
  res.writeHead(404);
  // no return res
  res.end();
  // open http server on HTTP_PORT
}).listen(HTTP_PORT, function () {
  console.log('Waiting on port', HTTP_PORT);
});
