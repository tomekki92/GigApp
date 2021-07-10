import React, { Component } from "react";
import GigHeader from "./gigHeader";
import GigTable from "./gigTable";

class Gig extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <GigHeader />
        <GigTable />
      </React.Fragment>
    );
  }
}

export default Gig;
