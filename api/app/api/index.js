const api = require('express').Router();
const fs = require('fs');
const classController = require('./controllers/classController');
const bearerToken = require('express-bearer-token');
const responses = require('./responses');

api.use(bearerToken());

/**
 * Attach custom error handling methods
 * to our req
 */
api.use(function(req, res, next) {
  responses.forEach((responseHandler) => {
    res[responseHandler.name] = () => {
      responseHandler(req, res, next);
    }
  });
  next();
});

api.use('/class', classController);

api.get('/', (req, res) => {
  res.send({
    data: "All is well, pal. But you may want to check the microservices...",
    config: sqwak.config
  });
});

module.exports = api;