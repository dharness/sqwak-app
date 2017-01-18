var PROTO_PATH = __dirname + '/../protos/FeatureExtractor.proto';
var grpc = require('grpc');
var sqwak = grpc.load(PROTO_PATH).sqwak;


var client = new sqwak.Feature_Extractor('feature_extractor:50051', grpc.credentials.createInsecure());

function extract(cb) {
  const writeStream = client.getFeatures(function(err, response) {
    if (err) {
      console.log(err)
      return cb(err)
    }
    var featureVector = response.feature_vector.map(item => parseFloat(item, 10));
    cb(featureVector);
  });
  return writeStream;
}

module.exports = { extract };
