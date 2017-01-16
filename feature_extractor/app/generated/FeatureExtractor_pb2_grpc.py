import grpc
from grpc.framework.common import cardinality
from grpc.framework.interfaces.face import utilities as face_utilities

import FeatureExtractor_pb2 as FeatureExtractor__pb2
import FeatureExtractor_pb2 as FeatureExtractor__pb2
import FeatureExtractor_pb2 as FeatureExtractor__pb2
import FeatureExtractor_pb2 as FeatureExtractor__pb2


class Feature_ExtractorStub(object):

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.GetFeatures = channel.unary_unary(
        '/sqwak.Feature_Extractor/GetFeatures',
        request_serializer=FeatureExtractor__pb2.FeatureListRequest.SerializeToString,
        response_deserializer=FeatureExtractor__pb2.FeatureListResponse.FromString,
        )
    self.GetFeatures2 = channel.stream_unary(
        '/sqwak.Feature_Extractor/GetFeatures2',
        request_serializer=FeatureExtractor__pb2.AudioFileChunk.SerializeToString,
        response_deserializer=FeatureExtractor__pb2.FeatureListResponse.FromString,
        )


class Feature_ExtractorServicer(object):

  def GetFeatures(self, request, context):
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def GetFeatures2(self, request_iterator, context):
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_Feature_ExtractorServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'GetFeatures': grpc.unary_unary_rpc_method_handler(
          servicer.GetFeatures,
          request_deserializer=FeatureExtractor__pb2.FeatureListRequest.FromString,
          response_serializer=FeatureExtractor__pb2.FeatureListResponse.SerializeToString,
      ),
      'GetFeatures2': grpc.stream_unary_rpc_method_handler(
          servicer.GetFeatures2,
          request_deserializer=FeatureExtractor__pb2.AudioFileChunk.FromString,
          response_serializer=FeatureExtractor__pb2.FeatureListResponse.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'sqwak.Feature_Extractor', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
