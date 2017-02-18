from flask_marshmallow import Marshmallow
from models import User, MlApp, MlClass, AudioSample
ma = Marshmallow()


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class MlAppSchema(ma.ModelSchema):
    class Meta:
        model = MlApp

    def num_samples(self, obj):
        return 100

ml_app_schema = MlAppSchema()
ml_apps_schema = MlAppSchema(many=True)

class MlClassSchema(ma.ModelSchema):
    class Meta:
        model = MlClass

ml_class_schema = MlClassSchema()
ml_classes_schema = MlClassSchema(many=True)

class AudioSampleSchema(ma.ModelSchema):
    class Meta:
        model = AudioSample

audio_sample_schema = AudioSampleSchema()
audio_samples_schema = AudioSampleSchema(many=True)