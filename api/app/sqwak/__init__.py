from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from sqwak.routes.user import user_controller
from sqwak.routes.ml_class import ml_class_controller
from sqwak.routes.audio_sample import audio_sample_controller
from sqwak.routes.premade_ml_class import premade_ml_class_controller
from sqwak.routes.ml_app import ml_app_controller
from sqwak.models import db
from sqwak.errors import InvalidUsage
from sqwak.schemas import ma


app = Flask(__name__)
app.config.from_object('config')


CORS(app)

migrate = Migrate(app, db)
db.init_app(app)
ma.init_app(app)

app.register_blueprint(user_controller, url_prefix='/api/v0/user')
app.register_blueprint(premade_ml_class_controller, url_prefix='/api/v0/premade')
app.register_blueprint(ml_app_controller, url_prefix='/api/v0/user/<string:user_id>/ml_app')
app.register_blueprint(ml_class_controller, url_prefix='/api/v0/user/<string:user_id>/ml_app/<int:app_id>/ml_class')
app.register_blueprint(audio_sample_controller, url_prefix='/api/v0/user/<string:user_id>/ml_app/<int:app_id>/ml_class/<int:class_id>/audio_sample')


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)

@app.errorhandler(500)
def not_found(error):
    return make_response(jsonify({'error': 'Internal Server Error'}), 500)

@app.errorhandler(405)
def not_found(error):
    return make_response(jsonify({'error': 'Method not allowed'}), 405)

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

with app.app_context():
    db.create_all()
    print("Database created!")