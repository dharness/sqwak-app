function extract(cb) {
  const writeStream = sqwak.featureExtractor.getFeatures((err, response) => {
    if (err) { return cb(err); }
    const featureVector = response.feature_vector.map(item => parseFloat(item, 10));
    cb(featureVector);
  });
  return writeStream;
}

module.exports = { extract };
