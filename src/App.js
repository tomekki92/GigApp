import React, { Component } from "react";
import "./App.css";
import Gig from "./components/gigApp";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Gig />
      </main>
    );
  }
}

export default App;
