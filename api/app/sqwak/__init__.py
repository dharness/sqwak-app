from flask import Flask, request, make_response, jsonify
from sqwak.routes.user import user_controller
from sqwak.routes.ml_class import ml_class_controller
from sqwak.routes.ml_app import ml_app_controller
from sqwak.database import db_session, init_db
from flask_marshmallow import Marshmallow


app = Flask(__name__)
ma = Marshmallow(app)

app.register_blueprint(ml_class_controller, url_prefix='/api/v0/ml_class')
app.register_blueprint(ml_app_controller, url_prefix='/api/v0/ml_app')
app.register_blueprint(user_controller, url_prefix='/api/v0/user')

init_db()

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()