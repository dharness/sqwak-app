from sqlalchemy import Column, Integer, String
from sqwak.database import Base

class User(Base):
    __tablename__ = 'user'
    id = Column(String, primary_key=True)


class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('email', 'date_created', '_links')
    # Smart hyperlinking
    _links = ma.Hyperlinks({
        'self': ma.URLFor('author_detail', id='<id>'),
        'collection': ma.URLFor('authors')
    })

user_schema = UserSchema()
users_schema = UserSchema(many=True)