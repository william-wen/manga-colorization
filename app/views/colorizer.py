import flask
import json
from flask import Blueprint, request
from app.models import db, Image, Tags

colorizer = Blueprint("colorizer", __name__)

@colorizer.route("/")
def index():
    return "Welcome to the Manga Colorizer"

@colorizer.route("/colorize", methods=["POST"])
def colorize():
    obj = json.loads(request.data)
    # new_image = Image(name=name, number=number, base_64=base_64)

    # print("Able to make Image Class")
    # db.session.add(new_image)
    # db.session.commit()
    # print("Able to commit to db!")

    return obj

@colorizer.route("/colorize-bulk")
def colorize_bulk():
    return "In Progress"

@colorizer.route("/correction")
def correction():
    return "In Progress"