import React, { Component } from "react";
import { Button } from "react-bootstrap";
import GigModal from "./GigModal";
import styles from "./Gigs.module.css";

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

  getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return (
          <i
            className="fa fa-check"
            style={{ color: "green", fontSize: "1.3rem" }}
          ></i>
        );
      case "Pending":
        return (
          <i
            className="fa fa-question"
            style={{ color: "darkorange", fontSize: "1.3rem" }}
          ></i>
        );
      case "Cancelled":
        return (
          <i
            className="fa fa-times"
            style={{ color: "red", fontSize: "1.3rem" }}
          ></i>
        );
      case "Happened":
        return (
          <i
            className="fa fa-check-circle"
            style={{ color: "black", fontSize: "1.3rem" }}
          ></i>
        );
      default:
        return;
    }
  };

  render() {
    const { gigs, onDelete, onGigUpdate } = this.props;
    const { showModal } = this.state;

    if (gigs.length === 0)
      return <p className={styles.nogigs}>There are no gigs. :(</p>;

    return (
      <React.Fragment>
        <table className="table">
          <thead className={styles.font}>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th className={styles.desktop}>Time</th>
              <th className={styles.desktop}>Venue</th>
              <th>Country</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody className={styles.font}>
            {gigs.map((gig) => (
              <tr key={gig._id}>
                <td>{gig.name}</td>
                <td>{gig.date}</td>
                <td className={styles.desktop}>{gig.time}</td>
                <td className={styles.desktop}>{gig.venue}</td>
                <td>{gig.country}</td>
                <td>{this.getStatusIcon(gig.status)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className={styles.button}
                    onClick={() => this.toggleShowModal(gig._id)}
                  >
                    <i
                      className="fa fa-cog"
                      aria-hidden="true"
                      style={{
                        fontSize: "1.2rem",
                      }}
                    ></i>
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => onDelete(gig)}
                    size="sm"
                    variant="outline-danger"
                    className={styles.button}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </Button>
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
