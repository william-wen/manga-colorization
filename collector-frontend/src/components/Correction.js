import React, { Component } from 'react';
import axios from "axios";
import '../styles/Correction.css';

class Correction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedCheckBoxes: {
                "女の子": false,
                "獣娘": false,
                "泣カセテミロ": false,
                "MIKUMIKUDANCE": false,
                "アナログ": false,
                "落書キ": false,
                "イクシオンサーガコンテスト": false,
                "擬人化": false,
                "ソードアートアバター&武器コンテスト": false,
                "ハイペリオン": false
            },
            selectedFile: null,
            displayWarning: false
        }
    }

    handleOptionChange = (e) => {
        let selectedCheckBoxes = this.state.selectedCheckBoxes;
        selectedCheckBoxes[e.target.value] = !selectedCheckBoxes[e.target.value];
        this.setState({
            selectedCheckBoxes
        })
    }

    handleCheckboxChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.selectedOption && this.state.selectedFile) {
            let formData = new FormData();
            let radio = this.state.selectedOption;

            let checkList = Object.keys(this.state.selectedCheckBoxes);
            let filteredCheckList = checkList.filter(box => this.state.selectedCheckBoxes[box]);

            formData.set("actual_main_tag", radio);
            formData.set("tags", filteredCheckList);
            formData.append("image", this.state.selectedFile, this.state.selectedFile.name);

            axios({
                method: "patch",
                url: "http://localhost:5000/incorrect-output/" + this.props.id,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            }).then(res => {
                this.props.history.push("/thank-you");
            }).catch(e => {
                console.log(e);
            });
        } else {
            this.setState({
                displayWarning: true
            })
        }
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    renderRadios = () => {
        let options = ["女の子", "獣娘", "泣カセテミロ", "MIKUMIKUDANCE", "アナログ",
            "落書キ", "イクシオンサーガコンテスト", "擬人化", "ソードアートアバター&武器コンテスト",
            "ハイペリオン"]
        let radios = options.map((option, index) => (
            <div className="radio">
                <label>
                    <input
                        key={index}
                        className="ticks"
                        type="radio"
                        value={option}
                        checked={this.state.selectedOption == option}
                        onChange={this.handleCheckboxChange}
                    />
                    {option}
                </label>
            </div>
        ))
        return radios;

    }

    renderCheckboxes = () => {
        let checkbox = ["女の子", "獣娘", "泣カセテミロ", "MIKUMIKUDANCE", "アナログ",
            "落書キ", "イクシオンサーガコンテスト", "擬人化", "ソードアートアバター&武器コンテスト",
            "ハイペリオン"]
        let checkboxes = checkbox.map((checkbox, index) => (
            <div className="checkbox">
                <label>
                    <input
                        key={index}
                        className="ticks"
                        type="checkbox"
                        value={checkbox}
                        checked={this.state.selectedCheckBoxes[checkbox]}
                        onChange={this.handleOptionChange}
                    />
                    {checkbox}
                </label>
            </div>
        ))
        return checkboxes;
    }

    render() {
        let warning = this.state.displayWarning ?
            <p style={{ color: "red", fontSize: "20px" }}> Please upload a file. </p> :
            null
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h2 style={{ marginTop: "20px" }}>Which one is the main tag?*</h2>
                    {this.renderRadios()}
                    <h2>What are the other tags associated with the image?</h2>
                    {this.renderCheckboxes()}
                    <h2>Please upload the correctly colored image.*</h2>
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <button className="btn btn-default" type="submit">Save</button>
                    {warning}
                </form>
            </div>
        );
    }
}

export default Correction;