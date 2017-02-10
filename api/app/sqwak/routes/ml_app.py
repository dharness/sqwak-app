from flask import Blueprint, request, abort, jsonify, json
from sqwak.models import MlApp
from sqwak.database import db_session

ml_app_controller = Blueprint('ml_app', __name__)


@ml_app_controller.route("", methods=['GET', 'POST'])
def user():
    if request.method == 'POST':
        return 'ml_app_controller'
    return "APPS"
