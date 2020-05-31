import React, { Component } from 'react';
import '../styles/ImageInsert.css';
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Confirmation from "./Confirmation"

class ImageInsert extends Component {
    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
        console.log(fd)
        axios.post("http://localhost:5000/colorize", fd)
            .then(res => {
                this.props.history.push({
                    pathname: "/confirmation",
                    data: res
                });
            }).catch(e => {
                console.log(e)
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </header>
            </div>
        );
    }
}

export default ImageInsert;
