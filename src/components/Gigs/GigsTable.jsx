import React, { Component } from "react";
import { Button } from "react-bootstrap";
import GigModal from "./GigModal";

class GigsTable extends Component {
  state = {
    showModal: false,
    gig: {},
  };

  toggleShowModal = (id) => {
    if (id) {
      const gig = this.props.gigs.filter((g) => g._id === id);
      this.setState({ gig: gig[0] });
    }
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { gigs, onDelete, onGigUpdate } = this.props;
    const { showModal } = this.state;
    const pending = "gray";
    const cancelled = "red";
    const approved = "green";

    if (gigs.length === 0) return <p>There are no gigs. :(</p>;

    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Country</th>
              <th>Status</th>
              {/* <th></th> */}
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {gigs.map((gig) => (
              <tr key={gig._id}>
                <td>{gig.name}</td>
                <td>{gig.date}</td>
                <td>{gig.time}</td>
                <td>{gig.venue}</td>
                <td>{gig.country}</td>
                <td
                  style={
                    gig.status === "Approved"
                      ? { color: approved }
                      : { color: "black" } && gig.status === "Cancelled"
                      ? { color: cancelled }
                      : { color: "black" } && gig.status === "Pending"
                      ? { color: pending }
                      : { color: "black" }
                  }
                >
                  {gig.status}
                </td>
                {/* <td>
                  <i
                    disabled={true}
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    style={{ cursor: "pointer" }}
                  />
                </td> */}
                <td>
                  <Button
                    className="btn-sm"
                    onClick={() => this.toggleShowModal(gig._id)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <button
                    onClick={() => onDelete(gig)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <GigModal
          gig={this.state.gig}
          onClose={this.toggleShowModal}
          isOpen={showModal}
          onGigUpdate={onGigUpdate}
        />
      </React.Fragment>
    );
  }
}

export default GigsTable;
