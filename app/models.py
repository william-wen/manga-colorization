from . import db

class Image(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    number = db.Column(db.String(200), unique=True, nullable=False)
    base_64 = db.Column(db.String(200), nullable=False)
    colorized = db.Column(db.String(200))
    tags = db.relationship("Tags", backref="image", lazy=True)

    def __repr__(self):
        return "Image Name: {}, Image Number: {}".format(self.name, self.number)

class Tags(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, db.ForeignKey("image.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    number = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "Tag Name: {}, Tag Number{}".format(self.name, self.number)