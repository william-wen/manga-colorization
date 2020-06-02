CREATE DATABASE colorizer;

USE colorizer;

DROP TABLE actual_tags;
DROP TABLE predicted_tags;
DROP TABLE image;

CREATE TABLE image (
	id INT NOT NULL AUTO_INCREMENT,
	original_name VARCHAR(200) NOT NULL,
    image_serial VARCHAR(200) NOT NULL UNIQUE,
    predicted_main_tag INT,
    actual_main_tag INT,
    PRIMARY KEY (id)
);
    
CREATE TABLE predicted_tags (
	id INT NOT NULL AUTO_INCREMENT,
    image_id INT NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    tag_number INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (image_id) REFERENCES image(id)
);

CREATE TABLE actual_tags (
	id INT NOT NULL AUTO_INCREMENT,
    image_id INT NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    tag_number INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (image_id) REFERENCES image(id)
);

SELECT * from image;
SELECT * from predicted_tags;
SELECT * from actual_tags;

INSERT INTO predicted_tags (image_id, tag_name, tag_number)
VALUES (2, "hello", 24);