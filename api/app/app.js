const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./api');
const initDb = require('./api/services/db');
const app = express();
require('./index.js');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  var collection = sqwak.db.collection('class');
  collection.find({}).toArray((err, docs) => {
    res.send(docs);
  });
});

app.use('/api/v0', api);

app.get('/model_manager', (req, res) => {
  modelManager.extract((message) => {
    res.send(message);
  });
});


module.exports = app;