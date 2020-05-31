import flask
import json
import os
import time
from flask import Blueprint, request, render_template
from flask import current_app as app
from flask_cors import cross_origin
from app.models import db, Image, PredictedTags, ActualTags
from app.views.utils import tag_mappings, reverse_tag_mappings

colorizer = Blueprint("colorizer", __name__)

@colorizer.route("/")
@cross_origin()
def index():
    return "Welcome to the NHK"

@colorizer.route("/time")
def get_current_time():
    return {"time": time.time()}

@colorizer.route("/colorize", methods=["POST"])
@cross_origin()
def colorize():
    """
    Colorizes 1 or more images.

    Return the colorized image, the predicted main tag, and the predicted side tags.
    """

    file = request.files.get("image")
    print("\n\n\n")
    print(request.files)
    print("\n\n\n")

    original_name = file.filename

    # get image_serial of last inserted value so we can add 1 to name the new image
    image = Image.query.order_by(Image.id).all()
    try:
        last_inserted_img = image[-1]
        last_mono_id = os.path.splitext(last_inserted_img.image_serial)[0]
        image_serial = "{}.jpg".format(str(int(last_mono_id) + 1))
    except IndexError:
        # existing database goes up to 7099999, new image_serials should be greater
        image_serial = "7100000.jpg"

        # for later detection
        last_inserted_img = None

    # save the file
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], image_serial))

    """
    Call the model here. Get the new image back. Save the new image in the right folder.
    """
    predicted_tags = [27, 31, 30]
    predicted_main_tag = 27

    # save a reference to the file in the db
    new_image = Image(original_name=original_name, image_serial=image_serial, predicted_main_tag=predicted_main_tag)
    insert_db(new_image)

    # get the ID of the last inserted image to create foreign key
    if last_inserted_img:
        image_id = last_inserted_img.id + 1
    else:
        image_id = 1

    for tag_number in predicted_tags:
        pt = PredictedTags(image_id=image_id, tag_name=tag_mappings.get(tag_number), tag_number=tag_number)
        insert_db(pt)

    colorized_img_and_tags = {
        "predicted_main_tag": predicted_main_tag,
        "predicted_tags": predicted_tags,
        "image_directory": "model_outputs/{}".format(image_serial)
    }

    return colorized_img_and_tags

@colorizer.route("/correction", methods=["POST"])
def correction():
    """
    File: The correct image
    Tags: The rest of the tags for that Image.

    Adds the ground truth tags to the MySQL database and the image to the correct folder.
    """
    img_tags = json.loads(request.data)
    
    # extract the image row 
    image = Image.query.filter_by(image_serial=img_tags.get("image_serial")).first()
    image_id = image.id

    for tag_number in img_tags.get("tags"):
        actual_tags = ActualTags(image_id=image_id, tag_name=tag_mappings.get(tag_number), tag_number=tag_number)
        insert_db(actual_tags)

    return "Success"

@colorizer.route("/correct-tags/<id>", methods=["PATCH"])
def correct_tags(id):
    """
    Tag: The main tag for that image.
    """
    print(id)
    print(request.form["data"])

    return "In Progress"

# Helper Functions
def insert_db(item):
    db.session.add(item)
    db.session.commit()