import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import ImageInsert from "./components/ImageInsert"
import Confirmation from "./components/Confirmation"
import Correction from "./components/Correction"
import ThankYou from "./components/ThankYou"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact strict component={ImageInsert} />
          <Route path="/confirmation/:id" exact strict render={({ match }) => (
            <Confirmation id={match.params.id} />
          )} />
          <Route path="/correction/:id" exact strict render={({ match }) => (
            <Correction id={match.params.id} />
          )} />
          <Route path="/thank-you" exact strict component={ThankYou} />
        </div>
      </Router>
    );
  }
}

export default App;
