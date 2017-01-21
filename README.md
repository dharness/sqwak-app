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


### API

``` javascript
var class = {
    
    lastUpdated: "",
    created: "",
    classID: 123
}

var sample = {
    classID: 123,
    label: "Dog Barking",
    features: [1,2,3.4],
    original_filename: "ok.wav",
    extraction_method: "urban_sound_1"
}

var model = {

}
```

``` javascript
var class = {
    type: "public",
    name: "Dog barking",
    lastUpdated: "",
    created: "",
    classID: 1,
    samples:[{
        features: [1,2,3.4],
        label: "Dog Barking",
        original_filename: "ok.wav",
        extraction_method: "urban_sound_1"
    }]
}

var user = {}
var app = {}

var model = {
    classIds: [],

}

```
