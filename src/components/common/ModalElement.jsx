import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ModalElement extends Component {
  render() {
    // let classes = false;
    // if (!this.props.show) classes = true;
    return (
      <React.Fragment>
        <Button className="btn-sm" onClick={this.props.onClick}>
          Modal
        </Button>
        <Modal show={this.props.show}>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Modal Body</Modal.Body>
          <Modal.Footer>
            <Button>Close Modal</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalElement;
