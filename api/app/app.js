const express = require('express');
const app = express();
const featureExtractor = require('./services/featureExtractor');
const modelManager = require('./services/modelManager');
const path = require('path');
const fs = require('fs');
const userController = require('./api/userController');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use('/login', userController);

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/dashboard', (req, res) => res.render('dashboard'));

app.get('/model_manager', (req, res) => {
  modelManager.extract((message) => {
    res.send(message);
  });
});

app.get('/transfer', (req, res) => {
  const readStream = fs.createReadStream('./uploads/audio.wav');
  const writeStream = featureExtractor.extract((featureVector) => {
    res.send(featureVector);
  });

  readStream.on('data', (chunk) => {
    writeStream.write({ data: new Uint8Array(chunk) });
  });

  readStream.on('end', code => {
    writeStream.end()
  });
});

app.listen(3000, function() {
    console.log('listening at 3000')
})
