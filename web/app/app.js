const express = require('express');
const app = express();
const featureExtractor = require('./grpc_client/greeter_client');

app.get('/', (req, res) => {
  res.send('All systems operational, capn\'n');
});

app.get('/features', (req, res) => {
  featureExtractor.extract((message) => {
    res.send(message);
  });
})

app.listen(3000, function() {
    console.log('listening at 3000')
})
