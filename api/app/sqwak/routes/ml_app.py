from flask import Blueprint, request, abort, jsonify, json
from sqwak.models import db, MlApp, User
from sqwak.schemas import ma, ml_app_schema, ml_apps_schema
from sqwak.forms.MlApp import NewMlAppForm

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
        return jsonify(form.errors.items())
    else:
        ml_app = MlApp.query.filter_by(owner_id=user_id).all()
        return ml_apps_schema.jsonify(ml_app)

@ml_app_controller.route("/<int:app_id>", methods=['GET', 'DELETE'])
def one_app(user_id, app_id):
    if request.method == 'GET':
        ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
        return ml_app_schema.jsonify(ml_app)
    else:
        ml_app = MlApp.query.filter_by(owner_id=user_id, id=app_id).first_or_404()
        db.session.delete(ml_app)
        db.session.commit()
        return jsonify({"status_code": 204})