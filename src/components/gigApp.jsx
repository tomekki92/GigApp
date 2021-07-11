import React, { Component } from "react";
import GigHeader from "./gigHeader";
import Gigs from "./gigs";

class Gig extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <GigHeader />
          </div>
          <div className="row">
            <Gigs />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gig;
