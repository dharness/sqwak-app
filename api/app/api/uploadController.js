const uploadController = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

uploadController.get('/', (req, res) => {
    res.render('upload')
});

uploadController.post('/', function(req, res){
  console.log(req.body);
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/../uploads');
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', function() {
    res.end('success');
  });
  form.parse(req);
});



module.exports = uploadController;