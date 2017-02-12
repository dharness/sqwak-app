from flask import Blueprint, request, jsonify, json
from werkzeug import secure_filename
from sqwak.services import feature_extractor
from sqwak.models import db, MlClass, AudioSample
from sqwak.schemas import ma, ml_class_schema, audio_sample_schema
from slugify import slugify

audio_sample_controller = Blueprint('audio_sample', __name__)


UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['wav'])

@audio_sample_controller.route("", methods=['POST'])
def audio_sample_collection(user_id, app_id, class_id):
    f = request.files['file']
    ml_class = MlClass.query.get(class_id)
    path = '/usr/src/app/sqwak/uploads/' + secure_filename(f.filename)
    f.save(path)
    features = feature_extractor.extract(path)

    audio_sample = AudioSample(
        ml_class_id=class_id,
        features=features,
        label=slugify(ml_class.class_name),
        extraction_method="urban_sound_1"
    )
    db.session.add(audio_sample)
    db.session.commit()
    return audio_sample_schema.jsonify(audio_sample)