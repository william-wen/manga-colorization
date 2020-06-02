import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import ImageInsert from "./components/ImageInsert"
import Confirmation from "./components/Confirmation"
import Correction from "./components/Correction"
import ThankYou from "./components/ThankYou"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact strict component={ImageInsert} />
        <Route path="/confirmation/:id" exact strict render={({ match }) => (
          <Confirmation id={match.params.id} />
        )} />
        <Route path="/correction/:id" exact strict render={({ match }) => (
          <Correction id={match.params.id} history={this.props.history} />
        )} />
        <Route path="/thank-you" exact strict component={ThankYou} />
      </div>
    );
  }
}

export default withRouter(App);
