from flask import Blueprint, request, abort, jsonify, json
from sqwak.models.User import User
from sqwak.database import db_session
from urllib import urlencode
import requests

user_controller = Blueprint('user', __name__)


@user_controller.route("", methods=['GET', 'POST'])
def user():
    if request.method == 'POST':
        url = "https://kingofthestack.auth0.com/dbconnections/signup"
        options = {
            "client_id": "l4pxejOXhTOV32BHrZxASIHHuNq4urwh",
            "username": "dylan@kingofthestack.com",
            "password": "bluecakes",
            "connection": "Username-Password-Authentication"
        }
        payload = urlencode(options)
        headers = { 'content-type': "application/x-www-form-urlencoded" }

        response = requests.request("POST", url, data=payload, headers=headers)

        print(response.text)
    else:
      users = User.query.all()
      return str(users)


@user_controller.route("/login", methods=['POST'])
def login():
    url = "https://kingofthestack.auth0.com/oauth/ro"
    options = {
        "client_id": "l4pxejOXhTOV32BHrZxASIHHuNq4urwh",
        "username": "dylan@kingofthestack.com",
        "password": "bluecakes",
        "connection": "Username-Password-Authentication",
        "grant_type": "password",
        "scope": "openid"
    }

    payload = urlencode(options)
    headers = { 'content-type': "application/x-www-form-urlencoded" }
    response = requests.request("POST", url, data=payload, headers=headers).json()

    return jsonify(response)


@user_controller.route("/<string:user_id>", methods=['GET'])
def user_apps(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404)
    return jsonify({
        "id": user.id
    })