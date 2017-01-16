#### Feature Extractor

To generate the protos run:
``
docker-compose exec feature_extractor sh ./generate.sh
``

#### Model Manager

To generate the protos run:
``
docker-compose exec model_manager sh ./generate.sh
``

To restart the process on code changes run:
``
docker-compose exec model_manager supervisorctl
``

This will enter you into the supervisorctl shell. Now you can run:

``
restart model_manager
``

Any time you'd like to restart the grpc server