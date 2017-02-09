function createModel(mlClasses, cb) {

  ml_classes = mlClasses.map((mlClass, i) => {
    mlClass = mlClass.toObject();
    let samples = mlClass.samples.map(sample => {
        return {features: sample.features};
    })
    return {
      label: i,
      samples
    };
  });

  const mlModel = {
    model_id: '19',
    ml_classes: ml_classes
  }

  return sqwak.modelManager.createModel(mlModel, (err, response) => {
    cb(response);
  });
}

function predict(features, modelFile, cb) {
  const predictionRequest = {
    model_file: modelFile,
    sample: { features }
  };
  sqwak.modelManager.predict(predictionRequest, (err, response) => {
      cb(response);
    });
}

module.exports = { createModel, predict };
