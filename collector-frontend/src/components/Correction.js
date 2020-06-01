import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Checkbox from "@material-ui/core/Checkbox";

class Correction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedCheckBoxes: {
                "option1": false,
                "option2": false,
                "option3": false
            }
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
        console.log("Main Tag", this.state.selectedOption);
    }

    renderRadios = () => {
        let options = ["option1", "option2", "option3"]
        let radios = options.map((option, index) => (
            <div className="radio">
                <label>
                    <input
                        key={index}
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
        let checkbox = ["checkbox1", "checkbox2", "checkbox3"]
        let checkboxes = checkbox.map((checkbox, index) => (
            <div className="checkbox">
                <label>
                    <input
                        key={index}
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
        console.log(this.props.id)
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h2>Please upload the correctly colored image.</h2>
                    <h2>Which one is the main tag?</h2>
                    {this.renderRadios()}
                    <h2>What are the other tags associated with the image?</h2>
                    {this.renderCheckboxes()}
                    <button className="btn btn-default" type="submit">Save</button>
                </form>
            </div>
        );
    }
}

export default Correction;