from flask import Blueprint, request
from werkzeug import secure_filename
from sqwak.services import feature_extractor
from sqwak.models import db, MlClass
from sqwak.schemas import ma, ml_class_schema, ml_classes_schema

ml_class_controller = Blueprint('ml_class', __name__)


UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['wav'])

@ml_class_controller.route("", methods=['GET', 'POST'])
def all(user_id, app_id):
    if request.method == 'POST':
        f = request.files['file']
        path = '/usr/src/app/sqwak/uploads/' + secure_filename(f.filename)
        f.save(path)
        features = feature_extractor.extract(path)
        return str(features)
    else:
        ml_class = MlClass.query.filter_by(ml_app_id=app_id).all()
        return ml_classes_schema.jsonify(ml_class)