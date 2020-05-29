from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")

    db.init_app(app)

    # import all the blueprints
    from app.views.colorizer import colorizer
    app.register_blueprint(colorizer)

    with app.app_context():
        db.create_all()

    return app