import React, { Component } from 'react';
import '../styles/ImageInsert.css';
import axios from "axios";

class ImageInsert extends Component {
    state = {
        selectedFile: null,
        displayWarning: false
    }

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        if (this.state.selectedFile) {
            const fd = new FormData();
            fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
            console.log(fd)
            axios.post("http://localhost:5000/colorize", fd)
                .then(res => {
                    this.props.history.push({
                        pathname: "/confirmation/" + res["data"]["id"],
                    });
                }).catch(e => {
                    console.log(e)
                });
        } else {
            this.setState({
                displayWarning: true
            })
        }
    }

    render() {
        let warning = this.state.displayWarning ?
            <p style={{ color: "red", fontSize: "20px" }}> Please upload a file. </p> :
            null
        return (
            <div className="App">
                <header className="App-header">
                    <div className="centered-box">
                        <h1>Welcome to the Manga Colorizer</h1>
                        <input type="file" onChange={this.fileSelectedHandler} />
                        <button onClick={this.fileUploadHandler}>Upload</button>
                        {warning}
                    </div>
                </header>
            </div>
        );
    }
}

export default ImageInsert;
