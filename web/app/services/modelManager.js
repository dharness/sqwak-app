var PROTO_PATH = __dirname + '/helloworld.proto';
var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;


var client = new hello_proto.Greeter('model_manager:50051', grpc.credentials.createInsecure());

function main(cb) {

  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }

  client.sayHello({name: user}, function(err, response) {
    cb(response.message);
  });
}

module.exports = {
  extract: main
};
