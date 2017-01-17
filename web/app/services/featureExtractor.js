var PROTO_PATH = __dirname + '/../protos/FeatureExtractor.proto';
var grpc = require('grpc');
var sqwak = grpc.load(PROTO_PATH).sqwak;


var client = new sqwak.Feature_Extractor('feature_extractor:50051', grpc.credentials.createInsecure());

function main(cb) {

  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }

  client.getFeatures({name: user}, function(err, response) {
    if (err) {
      return cb(err)
    }
    cb(response.message);
  });
}

function extract2(cb) {
  const writeStream = client.getFeatures2(function(err, response) {
    if (err) {
      console.log(err)
      return cb(err)
    }
    var featureVector = response.feature_vector.map(item => parseFloat(item, 10));
    cb(featureVector);
  });
  return writeStream;
}

module.exports = {
  extract: main,
  extract2: extract2
};
