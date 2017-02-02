function createModel(mlClasses, cb) {

  ml_classes = mlClasses.map((mlClass, i) => {
    mlClass = mlClass.toObject();
    let samples = mlClass.samples.map(sample => {
        return {features: new Int32Array([1.0, 2.2, 3.2, 4.2])}
    })
    return {
      label: i,
      samples
    };
  });

  console.log(ml_classes);

  const mlModel = {
    model_id: '19',
    ml_classes: ml_classes
    // ml_classes: [
    //   {
    //     label: 1,
    //     samples: [
    //       {
    //         features: [1,2,2,3]
    //       }
    //     ]
    //   }
    // ]
  }

  return sqwak.modelManager.createModel(mlModel, (err, response) => {
    console.log('got response')
    cb(response);
  });
}

module.exports = { createModel };
