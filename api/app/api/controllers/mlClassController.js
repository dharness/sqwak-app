const classController = require('express').Router({mergeParams: true});
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const loadApp = require('./../policies/loadApp');
const formidable = require('formidable');
const validators = require('./../validators/mlClass');
const featureExtractor = require('./../services/featureExtractor');
const { MlClass } = require('./../models/MlClass');
const multer  = require('multer');
const fileStreamer = require('./../services/fileStreamer');


classController.use(hasValidToken);
classController.use(loadUser);
classController.use(loadApp);

classController.get('/', (req, res) => {
  res.send(req.currentApp.mlClasses);
});


function onFeaturesExtracted(req, res, next, featureVector) {
  const className = req.body.className;
  let mlClass = new MlClass({
    className,
    packageName: `${req.user._id}.${req.currentApp.appName}`,
    samples: [{features: featureVector}]
  });

  mlClass = mlClass.toObject();
  delete mlClass["_id"];

  req.currentApp.mlClasses.push(mlClass);
  req.user.save((err, user) => {
    res.send(req.currentApp.mlClasses.pop());
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

classController.post('/', [middleware.initWriteStream, middleware.initMulter], () => {});


classController.put('/:classId/move', validators.move, (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  let fromCollection = req.currentApp.mlModel.mlClasses;
  let toCollection = req.currentApp.mlClasses;
  if (from === 'mlClasses') {
    toCollection = req.currentApp.mlModel.mlClasses;
    fromCollection = req.currentApp.mlClasses;
  }

  const classToMove = fromCollection.find(mlClass => {
    return mlClass._id.toString() === req.params.classId;
  }); 

  if (!classToMove) { return res.send(404); }

  toCollection.push(classToMove.toObject());
  classToMove.remove();
  req.user.save((err, user) => {
    if (err) { return res.send(err); }
    res.send(req.currentApp);
  });

})

classController.delete('/:classId', (req, res) => {
  const classToRemove = req.currentApp.mlClasses
    .find(mlClass => mlClass._id.toString() === req.params.classId);

  if (!classToRemove) { return res.send(404); }
  classToRemove.remove();
  req.user.save((err, user) => {
    if (err) { return res.send(err); }
    res.send(user);
  });
});

module.exports = classController;