
class BaseConfig(object):
  DEBUG=False
  SQLALCHEMY_DATABASE_URI='postgresql://postgres@db:5432/postgres'

class DevelopmentConfig(BaseConfig):
  DEBUG=True

class ProductionConfig(BaseConfig):
  DEBUG=False