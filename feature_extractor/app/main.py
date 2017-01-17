"""The Python implementation of the GRPC helloworld.Greeter server."""
from concurrent import futures
import time
import grpc
import sys
from generated import FeatureExtractor_pb2

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Feature_Extractor(FeatureExtractor_pb2.Feature_ExtractorServicer):

  def GetFeatures(self, request, context):
    sys.stdout.write("GetFeatures1\n")
    sys.stdout.flush()
    return FeatureExtractor_pb2.FeatureListResponse(message='Testing testing, im just suggesting')

  def GetFeatures2(self, request_iterator, context):
    file_contents = ""
    for request in request_iterator:
      file_contents += request.data
      sys.stdout.write(file_contents)
      sys.stdout.write("--\n")
      sys.stdout.flush()

    file_contents += "<style>h1 {color: green;}</style>"
    return FeatureExtractor_pb2.FeatureListResponse(message=file_contents)

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