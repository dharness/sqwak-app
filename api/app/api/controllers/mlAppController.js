const mlAppController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const validators = require('./../validators/mlApp');
const MlApp = require('./../models/MlApp');


mlAppController.use(hasValidToken);
mlAppController.use(loadUser);

mlAppController.get('/', (req, res) => {
    res.send({
        "appName": "Dog City",
        "id": "1u8uncuewh8y724b88duu",
        "updatedAt": "2011-04-18T23:23:56Z",
        "createdAt": "2011-04-18T23:23:56Z",
        "queryUrl": "https://sqwak.kingofthestack.com/apps/1u8uncuewh8y724b88duu/predict",
        "metrics": {},
        "model" : {}
    });
});

mlAppController.post('/', validators.create,  (req, res) => {
    const mlApp = new MlApp({
        userId: req.userId,
        appName: req.body.appName
    });
    mlApp.save((err, docs) => {
        if (err) { return console.log(err);}
        res.send(docs);
    });
});

module.exports = mlAppController;