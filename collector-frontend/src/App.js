import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import ImageInsert from "./components/ImageInsert"
import Confirmation from "./components/Confirmation"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact strict component={ImageInsert} />
          <Route path="/confirmation" exact strict component={Confirmation} />
        </div>
      </Router>
    );
  }
}

export default App;
