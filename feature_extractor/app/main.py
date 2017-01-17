"""The Python implementation of the GRPC helloworld.Greeter server."""
from concurrent import futures
import time
import grpc
import sys
from generated import FeatureExtractor_pb2
from extract import extract
import struct

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Feature_Extractor(FeatureExtractor_pb2.Feature_ExtractorServicer):

  def GetFeatures(self, request, context):
    sys.stdout.write("GetFeatures1\n")
    sys.stdout.flush()
    return FeatureExtractor_pb2.FeatureListResponse(message='Testing testing, im just suggesting, %s!' % request.name)

  def GetFeatures2(self, request_iterator, context):
    with open('out.wav','wb') as f:
      for chunk in request_iterator:
        f.write(chunk.data)
    feature_vector = [str(i) for i in extract('out.wav')]
    return FeatureExtractor_pb2.FeatureListResponse(message='Get Features 2', feature_vector=feature_vector)

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  FeatureExtractor_pb2.add_Feature_ExtractorServicer_to_server(Feature_Extractor(), server)
  server.add_insecure_port('[::]:50051')
  server.start()
  try:
    while True:
      time.sleep(_ONE_DAY_IN_SECONDS)
  except KeyboardInterrupt:
    server.stop(0)

if __name__ == '__main__':
    serve()