from flask_marshmallow import Marshmallow
from models import User, MlApp
ma = Marshmallow()


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class MlAppSchema(ma.ModelSchema):
    class Meta:
        model = MlApp

ml_app_schema = MlAppSchema()
ml_apps_schema = MlAppSchema(many=True)