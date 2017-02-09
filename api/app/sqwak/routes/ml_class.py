from flask import Blueprint, request
from werkzeug import secure_filename
from sqwak.services import feature_extractor

ml_class_controller = Blueprint('ml_class', __name__)


UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['wav'])

@ml_class_controller.route("", methods=['GET', 'POST'])
def all():
    if request.method == 'POST':
        f = request.files['file']
        path = '/usr/src/app/sqwak/uploads/' + secure_filename(f.filename)
        f.save(path)
        features = feature_extractor.extract(path)
        return str(features)
    else:
        return "Got.."