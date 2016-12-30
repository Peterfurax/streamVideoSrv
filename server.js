const http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs'),
    Busboy = require('busboy')

http.createServer((req, res) => {
    if (req.method === 'POST') {
        const busboy = new Busboy({
            headers: req.headers
        })
        console.log(req.headers)
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log('filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
            file.on('data', data => {
                console.log('filename [' + filename + '] got ' + data.length + ' bytes')
            })
            file.on('end', () => {
                console.log('filename [' + filename + '] Finished')
            })
            // console.log('file :', file,'fieldname :', fieldname,  'filename :', filename, 'encoding :', encoding, 'mimetype :', mimetype)
            const saveTo = path.join(os.tmpDir(), path.basename(filename))
            // file.resume()
            file.pipe(fs.createWriteStream(saveTo))
        })
        busboy.on('finish', () => {
            res.writeHead(200, {
                'Connection': 'close'
            })
            res.end("Upload is Finished!")
        })
        return req.pipe(busboy)
    }
    res.writeHead(404)
    res.end()
}).listen(8000, function() {
    console.log('waiting on port 8000')
})
