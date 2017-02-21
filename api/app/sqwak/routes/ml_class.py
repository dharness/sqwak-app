from flask import Blueprint, request, jsonify, json
from werkzeug import secure_filename
from sqwak.services import feature_extractor
from sqwak.models import db, MlClass, AudioSample, MlApp
from sqwak.schemas import ma, ml_class_schema, ml_classes_schema
from slugify import slugify
from sqwak.forms.MlClass import MlClassForm, MlClassFile
from sqwak.errors import InvalidUsage
import random


ml_class_controller = Blueprint('ml_class', __name__)


UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['wav'])
CLASS_IMG_SHAPES = ["cube", "diamond", "hex", "triangle"]
CLASS_IMG_COLOURS = ["blue", "green", "purple", "red", "teal", "yellow"]
    

@ml_class_controller.route("", methods=['GET', 'POST'])
def ml_class_collection(user_id, app_id):
    if request.method == 'POST':
        class_name = request.form['class_name']
        img_name = random.choice(CLASS_IMG_COLOURS) + "-" + random.choice(CLASS_IMG_SHAPES)

        ml_class = MlClass(
            ml_app_id=app_id,
            class_name=class_name,
            img_name=img_name,
            package_name=str(app_id) + "." + class_name)

        db.session.add(ml_class)
        db.session.commit()
        return ml_class_schema.jsonify(ml_class)

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
        ml_app = MlApp.query.filter_by(id=app_id).first_or_404()
        json_data = request.get_json(force=True)
        
        if 'class_name' in json_data:
            class_name = slugify(json_data['class_name'])
            ml_class.class_name = class_name
            ml_class.package_name = str(app_id) + "." + class_name
            ml_class.is_edited = True
            ml_app.working_model_dirty = True
            if (ml_class.in_model):
                ml_app.is_published = False
            db.session.add(ml_class)
        elif 'in_model' in json_data:
            ml_class.in_model = json_data['in_model']
            ml_class.is_edited = True
            ml_app.is_published = False
            ml_app.working_model_dirty = True
            db.session.add(ml_class)
        db.session.commit()
        return ml_class_schema.jsonify(ml_class)
    else:
        ml_class = MlClass.query.filter_by(id=class_id, ml_app_id=app_id).first_or_404()
        db.session.delete(ml_class)
        db.session.commit()
        return json.dumps({'success':True}), 204, {'ContentType':'application/json'} 