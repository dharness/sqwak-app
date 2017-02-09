const premadeClassController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const loadApp = require('./../policies/loadApp');
const PremadeClass = require('./../models/PremadeClass');
const validators = require('./../validators/premadeClass');


premadeClassController.use(hasValidToken);
premadeClassController.use(loadUser(false));

premadeClassController.get('/', (req, res) => {
  PremadeClass
    .find({})
    .select({ "samples": 0})
    .exec((err, premadeClasses) => {
      res.send(premadeClasses);
    });
});

premadeClassController.get('/:classId', (req, res) => {
  PremadeClass
    .findOne({ _id: req.params.classId })
    .select({ "samples": 0})
    .exec((err, premadeClass) => {
      res.send(premadeClass);
    });
});

premadeClassController.put('/:classId/copy', validators.copy, (req, res) => {
  const toAppId = req.body.toAppId;
  const currentApp = req.user.apps
    .find(app => app._id.toString() === toAppId);
  if (!currentApp) { return res.sendStatus(404); }


  PremadeClass
    .findOne({ _id: req.params.classId })
    .exec((err, premadeClass) => {
      if (err) { return res.sendStatus(500); }
      let classToAdd = premadeClass.toObject();
      delete classToAdd.id;
      currentApp.mlClasses.push(classToAdd);

      req.user.save((err, user) => {
        if (err) {return res.send(err); }
        res.send({length: currentApp.mlClasses.length});
      });
    });

});

module.exports = premadeClassController;