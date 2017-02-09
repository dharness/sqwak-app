from sqlalchemy import Column, Integer, String
from sqwak.database import Base

class User(Base):
    __tablename__ = 'user'
    id = Column(String, primary_key=True)