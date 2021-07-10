import React, { Component } from "react";
import { getGigs } from "../services/fakeData";
import "font-awesome/css/font-awesome.css";

class GigTable extends Component {
  state = {
    gigs: getGigs(),
  };

  render() {
    if (this.state.gigs.length === 0) return <p>There are no gigs.</p>;
    let gigCount = this.state.gigs.length;

    return (
      <table className="table">
        <thead className="position-relative">
          <h6 className="my-1">
            <span className="badge bg-secondary pad">
              Gig Count: {gigCount}
            </span>
          </h6>
          <button className="btn btn-primary btn-sm position-absolute top-0 end-0 my-1">
            + New Gig
          </button>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Country</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {this.state.gigs.map((gig) => (
            <tr>
              <td>{gig.name}</td>
              <td>{gig.date}</td>
              <td>{gig.time}</td>
              <td>{gig.venue}</td>
              <td>{gig.country}</td>
              <td style={{ color: gig.status.color }}>{gig.status.title}</td>
              <td>
                <i
                  class="fa fa-pencil-square-o"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GigTable;
