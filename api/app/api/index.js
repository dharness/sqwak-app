const api = require('express').Router();
const uploadController = require('./uploadController');


api.use('/upload', uploadController);

api.get('/', (req, res) => {
  res.send({
    data: "All is well, pal. But you may want to check the microservices..."
  });
});

module.exports = api;