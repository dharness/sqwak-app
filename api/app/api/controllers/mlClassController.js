const classController = require('express').Router({mergeParams: true});
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const loadApp = require('./../policies/loadApp');
const formidable = require('formidable');
const featureExtractor = require('./../services/featureExtractor');
const fileUploadHandler = require('./../services/fileUploadHandler');
const { MlClass } = require('./../models/MlClass');


classController.use(hasValidToken);
classController.use(loadUser);
classController.use(loadApp);

classController.get('/', (req, res) => {
  res.send(req.currentApp.model.classes);
});

classController.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  let formParsed;

  const writeStream = featureExtractor.extract((featureVector) => {
    if (formParsed.then) {
      return formParsed.then(className => {

        let mlClass = new MlClass({
          className,
          packageName: `${req.user._id}.${req.currentApp.appName}`,
          samples: [{features: featureVector}]
        });

        mlClass = mlClass.toObject();
        delete mlClass["_id"];

        req.currentApp.model.classes.push(mlClass);
        req.user.save((err, user)=>{
          res.send(req.currentApp.model.classes.pop());
        });
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
    }
    res.sendStatus(500);
  });

  form.onPart = function(part) {
    // let formidable handle all non-file parts
    if (!part.filename) {
      form.handlePart(part);
      return;
    }
    part.on('data', (chunk) => writeStream.write({ data: new Uint8Array(chunk) }));
    part.on('end', () => writeStream.end());
    part.on('error', (err) => res.send(err));
  };

  form.parse(req, (err, fields, files) => {
    formParsed = new Promise ((resolve, reject) => {
      if (err) { return reject(err); }
      if (fields.className) {
        resolve(fields.className)
      } else {
        res.send(400);
      }
    });

  });

});

module.exports = classController;