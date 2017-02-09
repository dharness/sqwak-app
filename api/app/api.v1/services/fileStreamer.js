var fs = require('fs')

function getDestination (req, file, cb) {
  cb(null, '/dev/null');
}

function getWriteStream () {
  const path = '/dev/null';
  const writeStream = fs.createWriteStream(path);
  return writeStream;
}

function FileStreamer (opts) {
  opts = opts || {};
  this.getDestination = (opts.destination || getDestination);
  this.writeStream = (opts.writeStream || getWriteStream());
}

FileStreamer.prototype._handleFile = function _handleFile (req, file, cb) {
  this.getDestination(req, file,  (err, path) => {
    if (err) { return cb(err) };

    file.stream.on('data', chunk => this.writeStream.write({ data: new Uint8Array(chunk)}));
    file.stream.on('end', () => this.writeStream.end());
    this.writeStream.on('error', cb);

    this.writeStream.on('finish', () => {
      cb(null, {
        path: path,
        size: this.writeStream.bytesWritten
      });
    });
  });
}

FileStreamer.prototype._removeFile = function _removeFile (req, file, cb) {
  fs.unlink(file.path, cb)
}

module.exports = function (opts) {
  return new FileStreamer(opts)
}