import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects import postgresql
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
    working_model = db.Column(db.String)
    working_model_dirty = db.Column(db.Boolean, default=True)
    published_model = db.Column(db.String)
    last_published = db.Column(db.DateTime)
    ml_classes = db.relationship('MlClass',
        backref="ml_app", 
        cascade="all, delete-orphan",
        lazy='dynamic')

    @hybrid_property
    def num_samples(self):
        row = db.session.execute("""SELECT COUNT(*) FROM (ml_app INNER JOIN ml_class ON (ml_app.id = ml_class.ml_app_id) INNER JOIN audio_sample ON (audio_sample.ml_class_id = ml_class.id)) WHERE ml_app.id = 2;""")
        return row.fetchone()[0]

class MlClass(db.Model):
    __tablename__ = 'ml_class'
    id = db.Column(db.Integer, primary_key=True)
    ml_app_id = db.Column(db.Integer, db.ForeignKey("ml_app.id"))
    class_name = db.Column(db.String, nullable=False)
    img_name = db.Column(db.String, nullable=True)
    package_name = db.Column(db.String, nullable=False)
    is_edited = db.Column(db.Boolean, default=False)
    in_model = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    audio_samples = db.relationship('AudioSample', 
        backref="ml_class", 
        cascade="all, delete-orphan",
        lazy='dynamic')

class AudioSample(db.Model):
    __tablename__ = 'audio_sample'
    id = db.Column(db.Integer, primary_key=True)
    ml_class_id = db.Column(db.Integer, db.ForeignKey("ml_class.id"), nullable=False)
    features = db.Column(postgresql.ARRAY(db.Integer), nullable=False)
    extraction_method = db.Column(db.String, nullable=False)
    label = db.Column(db.String, nullable=False)
    in_point = db.Column(db.Integer)
    out_point = db.Column(db.Integer)
    salience = db.Column(db.Integer)