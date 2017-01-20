var PROTO_PATH = __dirname + '/../protos/ModelManager.proto';
var grpc = require('grpc');
var sqwak = grpc.load(PROTO_PATH).sqwak;


var client = new sqwak.Model_Manager('model_manager:50051', grpc.credentials.createInsecure());


function main(cb) {

  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else { user = 'world'; }

  client.getFeatures({name: user}, function(err, response) {
    if (err) { return cb(err); }
    cb(response.message);
  });
}

module.exports = {
  extract: main
};
