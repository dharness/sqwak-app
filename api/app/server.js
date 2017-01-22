const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./api');
const server = express();
const bodyParser = require('body-parser');
require('./index.js');



server.use(bodyParser.urlencoded({ extended: false }))
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', (req, res) => {
  var collection = sqwak.db.collection('class');
  collection.find({}).toArray((err, docs) => {
    res.send(docs);
  });
});

server.use('/api/v0', api);

server.get('/model_manager', (req, res) => {
  modelManager.extract((message) => {
    res.send(message);
  });
});

module.exports = server;