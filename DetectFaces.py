import cv2
import sys
import os.path
import numpy as np
from shutil import copyfile

SOURCE = "image_17/"
DEST = "images_with_faces/"

def detect(filename, cascade_file = "lbpcascade_animeface.xml"):
    """
    Detects if an anime face exists inside an image.

    Parameters:
        filename: The file to detect faces for.
        cascade_file: Cascade file to detect faces.
    """
    if not os.path.isfile(cascade_file):
        raise RuntimeError("%s: not found" % cascade_file)

    cascade = cv2.CascadeClassifier(cascade_file)
    image = cv2.imread(filename, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    
    faces = cascade.detectMultiScale(gray,
                                     # detector options
                                     scaleFactor = 1.1,
                                     minNeighbors = 5,
                                     minSize = (24, 24))
    
    if isinstance(faces, np.ndarray):
        return True
    else:
        return False

    # draws rectangles around the detected faces
    # for (x, y, w, h) in faces:
    #     cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

    # shows the image and outputs it to a file
    # cv2.imshow("AnimeFaceDetect", image)
    # cv2.waitKey(0)
    # cv2.imwrite("out.png", image)

def main():
    # copy file into new directory if face is detected
    image_lists = os.listdir(SOURCE)
    for image in image_lists:
        if detect(SOURCE + image):
            copyfile(SOURCE + image, DEST + image)

if __name__ == "__main__":
    main()