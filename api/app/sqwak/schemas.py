from flask_marshmallow import Marshmallow
from db import User
ma = Marshmallow()


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)