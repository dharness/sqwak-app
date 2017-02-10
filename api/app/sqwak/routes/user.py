from flask import Blueprint, request, abort, jsonify, json
from sqwak.models import User, db
from urllib import urlencode
from sqwak.schemas import ma, user_schema, users_schema
from sqwak.forms.User import UserForm
from sqwak.errors import InvalidUsage
import requests

user_controller = Blueprint('user', __name__)


@user_controller.route("", methods=['GET', 'POST'])
def user():
    form = UserForm(request.form)
    if request.method == 'POST': 
        if form.validate():
            url = "https://kingofthestack.auth0.com/dbconnections/signup"
            options = {
                "client_id": "l4pxejOXhTOV32BHrZxASIHHuNq4urwh",
                "email": form.email.data,
                "password": form.password.data,
                "connection": "Username-Password-Authentication"
            }
            payload = urlencode(options)
            headers = { 'content-type': "application/x-www-form-urlencoded" }

            r = requests.request("POST", url, data=payload, headers=headers)

            if r.status_code != 200:
                abort(r.status_code)
        
            # CREATE THE USER IN THE DB
            auth_0_user = r.json()
            user = User(
                id=auth_0_user.get('_id'),
                email=auth_0_user.get('email'))
            db.session.add(user)
            db.session.commit()

            return jsonify(auth_0_user)

        elif form.errors.items():
            for fieldName, errorMessages in form.errors.iteritems():
                for err in errorMessages:
                    raise InvalidUsage(err, status_code=400)
    else:
      users = User.query.all()
      return users_schema.jsonify(users)


@user_controller.route("/login", methods=['POST'])
def login():
    form = UserForm(request.form)
    if form.validate():
        url = "https://kingofthestack.auth0.com/oauth/ro"
        options = {
            "client_id": "l4pxejOXhTOV32BHrZxASIHHuNq4urwh",
            "username": form.email.data,
            "password": form.password.data,
            "connection": "Username-Password-Authentication",
            "grant_type": "password",
            "scope": "openid"
        }

        payload = urlencode(options)
        headers = { 'content-type': "application/x-www-form-urlencoded" }
        response = requests.request("POST", url, data=payload, headers=headers)

        if response.status_code != 200:
                abort(response.status_code)

        return jsonify(response.json())

    elif form.errors.items():
        for fieldName, errorMessages in form.errors.iteritems():
            for err in errorMessages:
                raise InvalidUsage(err, status_code=400)

@user_controller.route("/<string:user_id>", methods=['GET'])
def user_apps(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404)
    return user_schema.jsonify(user)