import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Gig from "./components/gigApp";
import NotFound from "./components/notFound";
import GigForm from "./components/gigForm";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Switch>
          {/* <Route path="/gigs/new" component={GigForm}></Route> */}
          <Route path="/gigs/:id" component={GigForm}></Route>
          <Route path="/gigs" component={Gig}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/gigs" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
