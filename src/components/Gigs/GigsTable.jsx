import React, { Component } from "react";
import { Button, Overlay } from "react-bootstrap";
import GigModal from "./GigModal";
import styles from "./Gigs.module.css";

class GigsTable extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  state = {
    showModal: false,
    gig: {},
    showOverlay: false,
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
          <i className="fa fa-check-circle" style={{ color: "green" }}></i>
        );
      case "Pending":
        return (
          <i className="fa fa-question-circle" style={{ color: "orange" }}></i>
        );
      case "Cancelled":
        return <i className="fa fa-times-circle" style={{ color: "red" }}></i>;
      case "Happened":
        return <i className="fa fa-check-circle" style={{ color: "gray" }}></i>;
      default:
        return;
    }
  };

  render() {
    const { gigs, onDelete, onGigUpdate } = this.props;
    const { showModal } = this.state;

    if (gigs.length === 0) return <p>There are no gigs. :(</p>;

    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th className={styles.desktop}>Time</th>
              <th className={styles.desktop}>Venue</th>
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
                <td className={styles.desktop}>{gig.time}</td>
                <td className={styles.desktop}>{gig.venue}</td>
                <td>{gig.country}</td>
                <td>{this.getStatusIcon(gig.status)}</td>
                {/* <td>
                  <i
                    disabled={true}
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    style={{ cursor: "pointer" }}
                  />
                </td> */}
                <td>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      ref={this.ref}
                      onClick={() =>
                        this.setState({ showOverlay: !this.state.showOverlay })
                      }
                    >
                      <i className="fa fa-cog" aria-hidden="true"></i>
                    </Button>
                    <Overlay
                      target={this.ref.current}
                      show={this.state.showOverlay}
                      placement="top"
                    >
                      {({
                        placement,
                        arrowProps,
                        show: _show,
                        popper,
                        ...props
                      }) => (
                        <div
                          className={styles.overlay}
                          {...props}
                          style={{
                            borderRadius: 3,
                            ...props.style,
                          }}
                        >
                          <Button
                            variant="outline-primary"
                            className="m-1"
                            onClick={() => this.toggleShowModal(gig._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => onDelete(gig)}
                            variant="outline-danger"
                            className="m-1"
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Overlay>
                  </div>
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
