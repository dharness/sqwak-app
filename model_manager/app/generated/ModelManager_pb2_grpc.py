import grpc
from grpc.framework.common import cardinality
from grpc.framework.interfaces.face import utilities as face_utilities

import ModelManager_pb2 as ModelManager__pb2
import ModelManager_pb2 as ModelManager__pb2
import ModelManager_pb2 as ModelManager__pb2
import ModelManager_pb2 as ModelManager__pb2


class Model_ManagerStub(object):

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.GetFeatures = channel.unary_unary(
        '/sqwak.Model_Manager/GetFeatures',
        request_serializer=ModelManager__pb2.FeatureListRequest.SerializeToString,
        response_deserializer=ModelManager__pb2.FeatureListResponse.FromString,
        )
    self.CreateModel = channel.unary_unary(
        '/sqwak.Model_Manager/CreateModel',
        request_serializer=ModelManager__pb2.CreateModelRequest.SerializeToString,
        response_deserializer=ModelManager__pb2.CreateModelResponse.FromString,
        )


class Model_ManagerServicer(object):

  def GetFeatures(self, request, context):
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def CreateModel(self, request, context):
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_Model_ManagerServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'GetFeatures': grpc.unary_unary_rpc_method_handler(
          servicer.GetFeatures,
          request_deserializer=ModelManager__pb2.FeatureListRequest.FromString,
          response_serializer=ModelManager__pb2.FeatureListResponse.SerializeToString,
      ),
      'CreateModel': grpc.unary_unary_rpc_method_handler(
          servicer.CreateModel,
          request_deserializer=ModelManager__pb2.CreateModelRequest.FromString,
          response_serializer=ModelManager__pb2.CreateModelResponse.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'sqwak.Model_Manager', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
