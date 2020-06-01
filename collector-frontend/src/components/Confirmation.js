import React, { Component } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: null
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/model-output", {
            params: {
                id: this.props.id
            }
        })
            .then(res => {
                console.log(res)
                this.setState({
                    imageData: res["data"]
                })
            }).catch(e => {
                console.log(e)
            });
    }

    yesHandler = () => {
        let id = this.props.id;
        let imageData = this.state.imageData;
        // calls uploads ground truth image and updates correct tags table
        axios.patch("http://localhost:5000/correct-output/" + id, {
            "actual_main_tag": imageData["predicted_main_tag"],
            "tags": imageData["predicted_tags"]
        })
            .then(res => {
                console.log(res)
            }).catch(e => {
                console.log(e)
            });
    }

    render() {
        // initialize variables
        console.log(this.state.imageData)
        const { imageData } = this.state;
        let image = null;

        if (imageData) {
            console.log("../img_storage/uploads/" + imageData["image_serial"])
            image = require("../img_storage/uploads/" + imageData["image_serial"])
        }

        return (
            <div className="confirmation">
                <h1>Is your manga page an acceptable color?</h1>
                <img src={image} alt="Colorized Image" />
                <Link to="/thank-you">
                    <Button variant="success" onClick={this.yesHandler}>
                        Yes
                    </Button>
                </Link>
                <Link to={"/correction/" + this.props.id}>
                    <Button variant="danger" onClick={this.noHandler}>
                        No
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Confirmation;