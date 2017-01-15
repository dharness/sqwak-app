var PROTO_PATH = __dirname + '/feature_extractor.proto';
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

module.exports = {
  extract: main
};
