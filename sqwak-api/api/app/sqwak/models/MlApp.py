import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqwak.database import Base

class MlApp(Base):
    __tablename__ = 'ml_app'
    id = Column(Integer, primary_key=True)
    owner_id = Column(String, ForeignKey("user.id"))
    app_name = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)
    query_url = Column(String)