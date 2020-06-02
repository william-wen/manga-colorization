import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class ThankYou extends Component {
    render() {
        return (
            <div>
                <h1 style={{ paddingTop: "300px" }}>Thank you for using the Manga Colorizer</h1>
                <Link to={"/"}>
                    <Button variant="outline-primary" onClick={this.noHandler}>
                        Go Back
                    </Button>
                </Link>
            </div>
        );
    }
}

export default ThankYou;