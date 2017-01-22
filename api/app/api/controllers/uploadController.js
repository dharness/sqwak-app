const uploadController = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const featureExtractor = require('./../services/featureExtractor');



uploadController.post('/', function(req, res){
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/../uploads');

  const writeStream = featureExtractor.extract((featureVector) => {
    res.send(featureVector);
  });

  form.onPart = function(part) {
    // let formidable handle all non-file parts
    if (!part.filename) {
        form.handlePart(part);
        return;
    }
    part.on('data', (chunk) => writeStream.write({ data: new Uint8Array(chunk) }));

    part.on('end', () => writeStream.end());

    part.on('error', (err) => res.send(err));
  }

  form.parse(req);
});



module.exports = uploadController;