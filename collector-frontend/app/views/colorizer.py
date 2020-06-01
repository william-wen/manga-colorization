import flask
import json
import os
import time
import shutil
from flask import Blueprint, request, render_template
from flask import current_app as app
from flask_cors import cross_origin
from app.models import db, Image, PredictedTags, ActualTags
from app.views.utils import tag_mappings, reverse_tag_mappings

colorizer = Blueprint("colorizer", __name__)

@colorizer.route("/")
@cross_origin()
def index():
    return "Welcome to the Manga Colorizer!"

@colorizer.route("/colorize", methods=["POST"])
@cross_origin()
def colorize():

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
        "image_directory": image_serial,
        "id": image_id
    }

    return colorized_img_and_tags

@colorizer.route("/model-output", methods=["GET"])
@cross_origin()
def model_output():
    image_id = request.args["id"]

    image = Image.query.filter_by(id=image_id).first()
    predicted_tags_query = PredictedTags.query.filter_by(image_id=image_id).all()
    predicted_tags = [tags.tag_number for tags in predicted_tags_query]

    return {
        "image_serial": image.image_serial,
        "predicted_main_tag": image.predicted_main_tag,
        "predicted_tags": predicted_tags
    }

@colorizer.route("/correct-output/<id>", methods=["PATCH"])
@cross_origin()
def correct_output(id):

    tag_information = json.loads(request.data)
    print("\n")
    print(tag_information)
    print("\n")
    
    # update the image with actual_main_tag
    image = Image.query.filter_by(id=id).first()
    image.actual_main_tag = tag_information["actual_main_tag"]
    insert_db(image)

    # places values in actual_tags table
    for tag_number in tag_information.get("tags"):
        actual_tags = ActualTags(image_id=image.id, tag_name=tag_mappings.get(tag_number), tag_number=tag_number)
        insert_db(actual_tags)

    # copy the file from uploads to ground_truth
    shutil.copyfile(
        "src/img_storage/uploads/{}".format(image.image_serial), 
        "src/img_storage/ground_truth/{}".format(image.image_serial)
    )

    return ""

@colorizer.route("/incorrect-output", methods=["POST"])
@cross_origin()
def incorrect_output():

    tag_information = json.loads(request.data)
    
    # update the image with actual_main_tag
    image = Image.query.filter_by(id=id).first()
    image.actual_main_tag = tag_information["actual_main_tag"]
    insert_db(image)

    # places values in actual_tags table
    for tag_number in tag_information.get("tags"):
        actual_tags = ActualTags(image_id=image.id, tag_name=tag_mappings.get(tag_number), tag_number=tag_number)
        insert_db(actual_tags)

    # upload the image to ground truth folder
    file = request.files.get("image")
    file.save(os.path.join(app.config["GROUND_TRUTH"], image.image_serial))

    return ""

@colorizer.route("/test", methods=["GET"])
@cross_origin()
def test():
    
    print("\n\n\n")
    print(request.data)
    print(request.files)
    print(request.form)
    print(request.args["id"])
    print(request.json)
    print("\n\n\n")

    return "success"

# Helper Functions
def insert_db(item):
    db.session.add(item)
    db.session.commit()