import React, { Component } from 'react';

class Confirmation extends Component {
    render() {
        // initialize variables
        const { data } = this.props.location;
        let response = null;
        let path = null;
        let image = null;
        if (data) {
            response = data["data"]
            path = "../../app/" + response["image_directory"]
        }
        console.log(this.props.location);
        console.log(data);
        console.log(path);

        // check if the image can be imported from the directory
        try {
            image = require(path);
        }
        catch (e) {
            console.log("Image not found.")
        }

        return (
            <div className="confirmation">
                <h1>Is your manga page an acceptable color?</h1>
                <img src={image} alt="Colorized Image" />
            </div>
        );
    }
}

export default Confirmation;