const api = require('express').Router();
const fs = require('fs');
const mlClassController = require('./controllers/mlClassController');
const mlAppController = require('./controllers/mlAppController');
const premadeClassController = require('./controllers/premadeClassController');
const userController = require('./controllers/userController');
const bearerToken = require('express-bearer-token');
const responses = require('./responses');
const bodyParser = require('body-parser');


api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
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

api.use('/premade-class', premadeClassController);
api.use('/app/:appId/class', mlClassController);
api.use('/app', mlAppController);
api.use('/user', userController);

api.get('/', (req, res) => {
  res.send({
    data: "All is well, pal. But you may want to check the microservices...",
    config: sqwak.config
  });
});

module.exports = api;