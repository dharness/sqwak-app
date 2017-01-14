const express = require('express');
const app = express();

app.get('/', function(req, res, next) {
  res.send('Dylan is the best');
});

app.listen(3000, function() {
    console.log('listening at 3000')
})
