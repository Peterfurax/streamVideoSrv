const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const express = require('express');
const bodyParser =  require('body-parser');
const app = express();
const HTTP_PORT = 8000;

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
// app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));
app.route("/")
.get((req, res) => getReceiver(req, res))
.post((req, res) => postReceiver(req, res));

function getReceiver(req, res) {
  res.json({
    message: "you will get nothing here"
  });
  res.end();
}

function postReceiver(req, res) {
  // busboy init capture req.headers
  const busboy = new Busboy({
    headers: req.headers
  });
  // console.log(req.headers);
  // busboy init on file datastream type
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('Filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    // busboy on progress
    file.on('data', data => {
      // console.log('Filename [' + filename + '] got ' + data.length + ' bytes');
    });
    // busboy end transfert, error
    file.on('end', () => {
      console.log('Filename [' + filename + '] Finished');
    });
    // saveFolder dir, filemane
    const saveTo = path.join(os.tmpdir(), path.basename(filename));
    // file piping => writeStreamFile
    file.pipe(fs.createWriteStream(saveTo));
  });
  // busboy finish
  busboy.on('finish', () => {
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
app.listen(HTTP_PORT);
module.exports = app;
