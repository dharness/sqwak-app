const api = require('express').Router();
const uploadController = require('./controllers/uploadController');
const classController = require('./controllers/classController');


api.use('/upload', uploadController);
api.use('/class', classController);

api.get('/', (req, res) => {
  res.send({
    data: "All is well, pal. But you may want to check the microservices...",
    config: sqwak.config
  });
});

module.exports = api;