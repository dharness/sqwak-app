const mlAppController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const validators = require('./../validators/mlApp');
const MlApp = require('./../models/MlApp');
const multer  = require('multer');
const featureExtractor = require('./../services/featureExtractor');
const modelManager = require('./../services/modelManager');
const fileStreamer = require('./../services/fileStreamer');


mlAppController.use(hasValidToken);
mlAppController.use(loadUser);

mlAppController.get('/', (req, res) => {
    console.log(req.user);
    if (!req.user) { return res.sendStatus(404); }
    res.send(req.user.apps);
});

mlAppController.post('/', validators.create,  (req, res) => {
    req.user.apps.push({
        appName: req.body.appName
    });
    req.user.save((err, user) => {
        if (err) { return console.log(err);}
        res.send(user.apps.pop());
    });
});

mlAppController.get('/:appId', (req, res) => {
    const app = req.user.apps.find(app => app._id.toString() === req.params.appId);
    if (app) {
        res.send(app);
    } else {
        res.sendStatus(404);
    }
});

mlAppController.put('/:appId', validators.create,  (req, res) => {
    const app = req.user.apps.find(app => app._id.toString() === req.params.appId);
    req.user.save((err, user) => {
        if (err) { return console.log(err);}
        res.send(user.apps);
    });
});

mlAppController.post('/:appId/train',  (req, res) => {
    const currentApp = req.user.apps.find(app => app._id.toString() === req.params.appId);
    if (!currentApp) { return res.send(404); }
    const mlClasses = currentApp.mlModel.mlClasses;
    modelManager.createModel(mlClasses, (model) => {
        currentApp.mlModel.modelFile = model.pickled_classifier;
        req.user.save((err, user) => {
            if (err) { return console.log(err);}
            res.send(currentApp);
        });
    });
});


function onFeaturesExtracted(req, res, next, featureVector) {
    const currentApp = req.user.apps.find(app => app._id.toString() === req.params.appId);
    modelManager.predict(featureVector, currentApp.mlModel.modelFile, (predictions) => {
        res.send(predictions);
    });
}

var middleware = {
    initWriteStream: function(req, res, next) {
      const writeStream = featureExtractor.extract(featureVector => {
        onFeaturesExtracted(req, res, next, featureVector);
      });
      req.writeStream = writeStream;
      next();
    },
    initMulter: function(req, res, next){
      const storage = fileStreamer({ writeStream: req.writeStream });
      const upload = multer({ storage });
      upload.single('audio_file')(req, res, next);
    }
};

mlAppController.post('/:appId/predict', [middleware.initWriteStream, middleware.initMulter], () => {});

mlAppController.delete('/:appId', (req, res) => {
    const app = req.user.apps.find(app => app._id.toString() === req.params.appId);
    app.remove();
    req.user.save((err, msg)=> {
        if (err) { return res.send(err); }
        res.send(msg);
    });
});

module.exports = mlAppController;