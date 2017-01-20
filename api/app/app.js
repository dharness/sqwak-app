const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const api = require('./api');
const PORT = process.env.PORT || 8080;



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/v0', api);

app.get('/model_manager', (req, res) => {
  modelManager.extract((message) => {
    res.send(message);
  });
});

app.listen(PORT, function() {
    console.log(`listening at ${PORT}`)
})
