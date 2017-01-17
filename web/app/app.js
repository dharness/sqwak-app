const express = require('express');
const app = express();
const featureExtractor = require('./services/featureExtractor');
const modelManager = require('./services/modelManager');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');


app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.render('upload');
});

app.get('/features', (req, res) => {
  featureExtractor.extract((message) => {
    res.send(message);
  });
});

app.get('/model_manager', (req, res) => {
  modelManager.extract((message) => {
    res.send(message);
  });
});

app.get('/transfer', (req, res) => {
  const readStream = fs.createReadStream('./uploads/audio.wav');
  const writeStream = featureExtractor.extract2((message) => {
    res.send(message);
  });

  readStream.on('data', (chunk) => {
    writeStream.write({ data: new Uint8Array(chunk) });
  });

  readStream.on('end', code => {
    writeStream.end()
  });
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.listen(3000, function() {
    console.log('listening at 3000')
})
