from flask import Blueprint, request, jsonify, json
from sqwak.models import db, MlClass, MlApp, AudioSample
from sqwak.schemas import ma, ml_class_schema, ml_classes_schema


premade_ml_class_controller = Blueprint('premade_ml_class', __name__)


@premade_ml_class_controller.route("", methods=['GET'])
def ml_class_collection():
  premade_ml_classes = MlClass.query.filter_by(ml_app_id=None).all()
  return ml_classes_schema.jsonify(premade_ml_classes)

@premade_ml_class_controller.route("/<int:class_id>/copy", methods=['POST'])
def copy(class_id):
  premade_ml_class = MlClass.query.filter_by(id=class_id, ml_app_id=None).first_or_404()
  
  ml_app_id = request.json['to_app_id']
  ml_app = MlApp.query.filter_by(id=ml_app_id).first_or_404()

  # Copy the class
  ml_class = MlClass(
      ml_app_id=ml_app_id,
      class_name=premade_ml_class.class_name,
      package_name=str(ml_app_id) + "." + premade_ml_class.class_name)
  db.session.add(ml_class)
  db.session.flush()

  # copy over all the samples
  audio_samples = premade_ml_class.audio_samples.all()
  for premade_sample in audio_samples:
    db.session.add(AudioSample(
        ml_class_id=ml_class.id,
        label=premade_sample.label,
        features=premade_sample.features,
        extraction_method=premade_sample.extraction_method
    ))

  db.session.commit()
  return ml_class_schema.jsonify(ml_class)