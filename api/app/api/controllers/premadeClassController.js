const premadeClassController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const PremadeClass = require('./../models/PremadeClass');


premadeClassController.use(hasValidToken);

premadeClassController.get('/', (req, res) => {
  PremadeClass
    .find({})
    .select({ "samples": 0})
    .exec((err, premadeClasses) => {
      res.send(premadeClasses);
    });
});

module.exports = premadeClassController;