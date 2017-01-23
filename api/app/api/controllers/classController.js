const classController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const formidable = require('formidable');
const featureExtractor = require('./../services/featureExtractor');
const classModel = require('./../models/class');


classController.use(hasValidToken);
classController.use(loadUser);

classController.get('/', (req, res) => {
  classModel.getAll().then((classList) => {
    res.send(classList);
  })
  .catch(err => {
    console.log(err);
    res.send(err.message);
  });
});

classController.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  let formParsed;

  const writeStream = featureExtractor.extract((featureVector) => {
    if (formParsed.then) {
      return formParsed.then(className => {
        const newClass = {
          className,
          samples: [{featureVector}],
          createdBy: req.userId
        };
        classModel.create(newClass).then((newObject) => {
          res.send(newObject);
        });
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
    }
    res.send(500);
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