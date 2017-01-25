const mlAppController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const validators = require('./../validators/mlApp');
const MlApp = require('./../models/MlApp');


mlAppController.use(hasValidToken);
mlAppController.use(loadUser);

mlAppController.get('/', (req, res) => {
    res.send(req.user.apps);
});

mlAppController.post('/', validators.create,  (req, res) => {
    req.user.apps.push({
        appName: req.body.appName
    });
    req.user.save((err, user) => {
        if (err) { return console.log(err);}
        res.send(user.apps);
    });
});

mlAppController.put('/:appId', validators.create,  (req, res) => {
    const app = req.user.apps.find(app => app._id === req.params.appId);
    req.user.save((err, user) => {
        if (err) { return console.log(err);}
        res.send(user.apps);
    });
});

module.exports = mlAppController;