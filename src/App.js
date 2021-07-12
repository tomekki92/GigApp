import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Gig from "./components/gigApp";
import NotFound from "./components/notFound";
import BigForm from "./components/bigForm";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/gigs/:id" component={BigForm}></Route>
          <Route path="/gigs" component={Gig}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/gigs" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
