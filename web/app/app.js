const express = require('express');
const app = express();
const featureExtractor = require('./services/featureExtractor');
const modelManager = require('./services/modelManager');


app.get('/', (req, res) => {
  res.send('All systems operational, capn\'n');
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

app.listen(3000, function() {
    console.log('listening at 3000')
})
