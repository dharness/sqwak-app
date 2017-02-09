const express = require('express');
const path = require('path');
const fs = require('fs');
// const api = require('./api');
const api2 = require('./api.v1');
const server = express();
const cors = require('cors')
const bodyParser = require('body-parser');
require('./index.js');



server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/', (req, res) => {
  var collection = sqwak.db.collection('class');
  collection.find({}).toArray((err, docs) => {
    res.send(docs);
  });
});

server.use('/api/v1', api2);

server.get('/model_manager', (req, res) => {
  modelManager.extract((message) => {
    res.send(message);
  });
});

module.exports = server;