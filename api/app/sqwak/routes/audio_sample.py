from flask import Blueprint, request, jsonify, json
from werkzeug import secure_filename
from sqwak.services import feature_extractor
from sqwak.models import db, MlClass, AudioSample
from sqwak.schemas import ma, ml_class_schema, audio_sample_schema
import tempfile
from slugify import slugify
import ffmpy
import subprocess


audio_sample_controller = Blueprint('audio_sample', __name__)

ALLOWED_EXTENSIONS = set(['wav'])

@audio_sample_controller.route("", methods=['POST'])
def audio_sample_collection(user_id, app_id, class_id):
    ml_class = MlClass.query.filter_by(id=class_id, ml_app_id=app_id).first_or_404()
    file = request.files['file']

    ff = ffmpy.FFmpeg(
        inputs={'pipe:0': 'cat'},
        outputs={'pipe:1': 'echo'},
        global_options=['-y']
    )
    stdout, stderr = ff.run(input_data=file.read(), stdout=subprocess.PIPE)

    print(stdout)

    # Extract the features from the file without saving it
    with tempfile.NamedTemporaryFile() as temp:
        temp.write(file.read())
        temp.flush()
        features = feature_extractor.extract(temp.name)
        temp.close()
    
    audio_sample = AudioSample(
        ml_class_id=ml_class.id,
        label=slugify(ml_class.class_name),
        features=features,
        extraction_method="urban_sound_1"
    )
    db.session.add(audio_sample)
    db.session.commit()

    return ml_class_schema.jsonify(ml_class)