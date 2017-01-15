"""The Python implementation of the GRPC helloworld.Greeter server."""

from concurrent import futures
import time
import grpc
import server_reloader
from generated import FeatureExtractor_pb2

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Feature_Extractor(FeatureExtractor_pb2.Feature_ExtractorServicer):

  def GetFeatures(self, request, context):
    return FeatureExtractor_pb2.FeatureListResponse(message='Hello Node, I am Dool, %s!' % request.name)

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

def before_reload():
      print('Reloading code')

def main():
    server_reloader.main(
        serve,
        before_reload=before_reload
    )

if __name__ == '__main__':
    serve()