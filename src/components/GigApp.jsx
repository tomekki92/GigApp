import React from "react";
import GigHeader from "./GigHeader";
import Gigs from "./Gigs";

const Gig = () => {
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
};

export default Gig;
