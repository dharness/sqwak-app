from flask import Blueprint, request, abort, jsonify, json
from sqwak.models.User import User
from sqwak.database import db_session

user_controller = Blueprint('user', __name__)


@user_controller.route("", methods=['GET', 'POST'])
def user():
    if request.method == 'POST':
        user_id = request.form['user_id'].split('|')[1]
        user = User(id=user_id)
        db_session.add(user)
        db_session.commit()
        return user_id
    else:
      users = User.query.all()
      return str(users)


@user_controller.route("/<string:user_id>", methods=['GET'])
def user_apps(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404)
    return jsonify({
        "id": user.id
    })