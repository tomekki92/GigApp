import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import Input from "../common/Input";
import Select from "../common/Select";
import { gigStatuses } from "../common/contstants";

class GigModal extends Component {
  state = {
    currentGig: {},
  };

  handleInputChange = (e) => {
    const currentGig = this.state.currentGig;
    currentGig[e.target.name] = e.target.value;
    this.setState({ currentGig: { ...this.props.gig, ...currentGig } });
    console.log(currentGig);
  };

  render() {
    const { isOpen, onClose, gig, onGigUpdate } = this.props;
    const { currentGig } = this.state;
    const { name, date, time, venue, country, status } = this.state.currentGig;
    return (
      <Modal show={isOpen}>
        <Modal.Header>
          {gig && gig._id ? "Edit Gig" : "Create Gig"}
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={() => {}}>
              <Input
                name="name"
                onChange={this.handleInputChange}
                label="Name"
                type="text"
                placeholder="Gig Name"
                defaultValue={(gig && gig.name) || ""}
                value={currentGig.name}
              />
              <Input
                name="date"
                onChange={this.handleInputChange}
                label="Date"
                type="date"
                defaultValue={(gig && gig.date) || ""}
                value={currentGig.date}
              />
              <Input
                name="time"
                onChange={this.handleInputChange}
                label="Time"
                type="time"
                defaultValue={(gig && gig.time) || ""}
                value={currentGig.time}
              />
              <Input
                name="venue"
                onChange={this.handleInputChange}
                label="Venue"
                type="text"
                defaultValue={(gig && gig.venue) || ""}
                value={currentGig.venue}
              />
              <Input
                name="country"
                onChange={this.handleInputChange}
                label="Country"
                type="text"
                placeholder="City, Country"
                defaultValue={(gig && gig.country) || ""}
                value={currentGig.country}
              />
              <Select
                name="status"
                label="Status"
                onChange={this.handleInputChange}
                options={gigStatuses}
                defaultValue={(gig && gig.status) || ""}
                value={currentGig.status}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              onClose();
            }}
            variant="outline-danger"
          >
            Cancel
          </Button>
          <Button
            disabled={!(name && date && time && venue && country && status)}
            onClick={() => {
              onGigUpdate(this.state.currentGig);
              this.setState({ currentGig: {} });
              onClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GigModal;
