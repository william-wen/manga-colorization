from os import environ, path

class Config:
    # Flasks Configuration Variables
    SECRET_KEY = environ.get("SECRET_KEY")
    FLASK_ENV = "development"
    FLASK_APP = "app"
    FLASK_DEBUG = 1

    # Flask-SQLAlchemy Database Configs
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:Willlu5963!@localhost:3306/colorizer"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # my own env variables
    CORS_HEADERS = "Content-Type"
    UPLOAD_FOLDER = "app/uploads/"
    MODEL_UPLOAD_FOLDER = "app/model_outputs/"
    GROUND_TRUTH = "app/ground_truth"