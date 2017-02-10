import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    email = db.Column(db.String(64), nullable=False)
    ml_apps = db.relationship('MlApp', backref='user', lazy='dynamic')

class MlApp(db.Model):
    __tablename__ = 'ml_app'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.String, db.ForeignKey("user.id"), nullable=False)
    app_name = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    query_url = db.Column(db.String)