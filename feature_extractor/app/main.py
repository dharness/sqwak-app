"""The Python implementation of the GRPC helloworld.Greeter server."""
from concurrent import futures
import time
import grpc
import sys
from generated import FeatureExtractor_pb2
from extract import extract
import struct
import tempfile

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Feature_Extractor(FeatureExtractor_pb2.Feature_ExtractorServicer):

  def GetFeatures(self, request_iterator, context):
    temp = tempfile.NamedTemporaryFile()
    for chunk in request_iterator:
      temp.write(chunk.data)
    temp.seek(0)
    feature_vector = [str(i) for i in extract(temp.name)]
    temp.close()
    return FeatureExtractor_pb2.FeatureListResponse(feature_vector=feature_vector)

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