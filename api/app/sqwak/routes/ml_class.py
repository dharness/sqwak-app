from flask import Blueprint, request, jsonify, json
from werkzeug import secure_filename
from sqwak.services import feature_extractor
from sqwak.models import db, MlClass, AudioSample
from sqwak.schemas import ma, ml_class_schema, ml_classes_schema
from slugify import slugify
from sqwak.forms.MlClass import MlClassForm, MlClassFile
from sqwak.errors import InvalidUsage

ml_class_controller = Blueprint('ml_class', __name__)


UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['wav'])

@ml_class_controller.route("", methods=['GET', 'POST'])
def ml_class_collection(user_id, app_id):
    form = MlClassForm(request.form)
    file_form = MlClassFile(request.files)
    if request.method == 'POST':
        if form.validate() and file_form.validate():
            f = file_form.file.data
            class_name = form.class_name.data
            
            path = '/usr/src/app/sqwak/uploads/' + secure_filename(f.filename)
            f.save(path)
            features = feature_extractor.extract(path)

            ml_class = MlClass(
                ml_app_id=app_id,
                class_name=class_name,
                package_name=str(app_id) + "." + class_name)
            db.session.add(ml_class)
            db.session.flush()
            audio_sample = AudioSample(
                ml_class_id=ml_class.id,
                label=slugify(class_name),
                features=features,
                extraction_method="urban_sound_1"
            )
            db.session.add(audio_sample)
            db.session.commit()
            return ml_class_schema.jsonify(ml_class)

        elif form.errors.items() or file_form.errors.items():
            errors = dict(file_form.errors, **form.errors); 
            for fieldName, errorMessages in errors.iteritems():
                for err in errorMessages:
                    raise InvalidUsage(err, status_code=400)

    else:
        ml_class = MlClass.query.filter_by(ml_app_id=app_id).all()
        return ml_classes_schema.jsonify(ml_class)

@ml_class_controller.route("/<int:class_id>", methods=['GET', 'PATCH', 'DELETE'])
def ml_class(user_id, app_id, class_id):
    if request.method == 'GET':
        ml_class = MlClass.query.filter_by(id=class_id, ml_app_id=app_id).first_or_404()
        return ml_class_schema.jsonify(ml_class)
    elif request.method == 'PATCH':
        ml_class = MlClass.query.filter_by(id=class_id, ml_app_id=app_id).first_or_404()
        # Process the samples to add
        f = request.files['file']
        path = '/usr/src/app/sqwak/uploads/' + secure_filename(f.filename)
        f.save(path)
        features = feature_extractor.extract(path)
        audio_sample = AudioSample(
            ml_class_id=ml_class.id,
            label=slugify(ml_class.class_name),
            features=features,
            extraction_method="urban_sound_1"
        )
        db.session.add(audio_sample)
        db.session.commit()
        return ml_class_schema.jsonify(ml_class)
    else:
        ml_class = MlClass.query.filter_by(id=class_id, ml_app_id=app_id).first_or_404()
        db.session.delete(ml_class)
        db.session.commit()
        return json.dumps({'success':True}), 204, {'ContentType':'application/json'} 