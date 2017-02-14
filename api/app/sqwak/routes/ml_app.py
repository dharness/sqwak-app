from flask import Blueprint, request, abort, jsonify, json
from werkzeug import secure_filename
from sqwak.models import db, MlApp, User
from sqwak.schemas import ma, ml_app_schema, ml_apps_schema, ml_class_schema, ml_classes_schema, audio_samples_schema
from sqwak.forms.MlApp import NewMlAppForm
from sqwak.errors import InvalidUsage
from sqwak.services import model_manager
from sqwak.services import feature_extractor


ml_app_controller = Blueprint('ml_app', __name__)


@ml_app_controller.route("", methods=['GET', 'POST'])
def all_apps(user_id):
    form = NewMlAppForm(request.form)
    if request.method == 'POST' and form.validate():
        # CREATE THE APP IN THE DB
        user = User.query.filter_by(id=user_id).first_or_404()
        ml_app = MlApp(app_name=form.app_name.data, owner_id=user_id)
        db.session.add(ml_app)
        db.session.commit()
        return ml_app_schema.jsonify(ml_app)
        
    elif form.errors.items():
        for fieldName, errorMessages in form.errors.iteritems():
            for err in errorMessages:
                raise InvalidUsage(err, status_code=400)
    else:
        ml_app = MlApp.query.filter_by(owner_id=user_id).all()
        return ml_apps_schema.jsonify(ml_app)

@ml_app_controller.route("/<int:app_id>", methods=['GET', 'DELETE'])
def one_app(user_id, app_id):
    if request.method == 'GET':
        ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
        ml_classes = ml_app.ml_classes.all()
        res = ml_app_schema.dump(ml_app).data
        ml_classes_dict = ml_classes_schema.dump(ml_classes).data
        res['ml_classes'] = ml_classes_dict
        res.pop('working_model', None)
        return jsonify(res)
    else:
        ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
        db.session.delete(ml_app)
        db.session.commit()
        return jsonify({"status_code": 204})

@ml_app_controller.route("/<int:app_id>/train", methods=['POST'])
def train(user_id, app_id):
    ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
    ml_classes = ml_app.ml_classes.all()
    formated_ml_classes = []
    for ml_class in ml_classes:
        audio_samples = ml_class.audio_samples.all()
        if ml_class.in_model:
            ml_class = ml_class_schema.dump(ml_class).data
            ml_class['audio_samples'] = audio_samples_schema.dump(audio_samples).data
            formated_ml_classes.append(ml_class)

    pickled_model = model_manager.create_model(formated_ml_classes)
    ml_app.working_model = pickled_model;
    db.session.commit()
    return ml_app_schema.jsonify(ml_app)

@ml_app_controller.route("/<int:app_id>/predict", methods=['POST'])
def predict(user_id, app_id):
    ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
    file = request.files['file']
    path = '/usr/src/app/sqwak/uploads/' + secure_filename(file.filename)
    file.save(path)
    features = feature_extractor.extract(path)
    predictions = model_manager.predict(ml_app.working_model, features)
    return jsonify({
        'label': predictions[0]
    })

@ml_app_controller.route("/<int:app_id>/publish", methods=['POST'])
def publish(user_id, app_id):
    ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
    if (ml_app.working_model):
        ml_app.published_model = ml_app.working_model

    return ml_app_schema.jsonify(ml_app)