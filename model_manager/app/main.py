from concurrent import futures
import time
import grpc
import sys
import numpy as np
from generated import ModelManager_pb2
import create_model
import pickle
_ONE_DAY_IN_SECONDS = 60 * 60 * 24



class Model_Manager(ModelManager_pb2.Model_ManagerServicer):

    def CreateModel(self, request, context):
        classifier = create_model.create_model(request.ml_classes)
        return ModelManager_pb2.CreateModelResponse(pickled_classifier=pickle.dumps(classifier))

    def Predict(self, request, context):
        classifier = pickle.loads(request.model_file)
        predictions = classifier.predict(request.sample.features)
        return ModelManager_pb2.PredictionResponse(predictions=str(predictions))





def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ModelManager_pb2.add_Model_ManagerServicer_to_server(Model_Manager(),
                                                         server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()