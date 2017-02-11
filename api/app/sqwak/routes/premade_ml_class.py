from flask import Blueprint, request, jsonify, json
from sqwak.models import db, MlClass
from sqwak.schemas import ma, ml_class_schema, ml_classes_schema


premade_ml_class_controller = Blueprint('premade_ml_class', __name__)


@premade_ml_class_controller.route("", methods=['GET'])
def ml_class_collection():
  premade_ml_classes = MlClass.query.filter_by(ml_app_id=None).all()
  return ml_classes_schema.jsonify(premade_ml_classes)