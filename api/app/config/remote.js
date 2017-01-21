const FEATURE_EXTRACTOR_PROTO_PATH = __dirname + '/../protos/FeatureExtractor.proto';
const MODEL_MANAGER_PROTO_PATH = __dirname + '/../protos/ModelManager.proto';
const grpc = require('grpc');


const sqwakPackage = Object.assign({},
  grpc.load(FEATURE_EXTRACTOR_PROTO_PATH).sqwak,
  grpc.load(MODEL_MANAGER_PROTO_PATH).sqwak);



module.exports = function(sqwak) {
    return new Promise((resolve, reject) => {
        const featureExtractor = new sqwakPackage.Feature_Extractor('feature_extractor:50051', grpc.credentials.createInsecure());
        const modelManager = new sqwakPackage.Model_Manager('model_manager:50051', grpc.credentials.createInsecure());
        resolve({featureExtractor, modelManager});
    });
};