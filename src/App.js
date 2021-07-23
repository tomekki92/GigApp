import React, { Component } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import GigApp from "./components/Gigs";
import Login from "./components/Login";
import { AuthProvider, PrivateRoute } from "./contexts/AuthContext";
import { GIG_APP_ROUTE } from "./components/common/contstants";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path={GIG_APP_ROUTE} component={GigApp} />
            <Route exact path="/login" component={Login} />
            <Redirect from="/*" to="/login" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
