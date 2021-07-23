import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import firebase from "../../firebase";

const GigHeader = ({ history, gigsCount, onCreateGig }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Gigs ({gigsCount})</Navbar.Brand>
        <div>
          <Button onClick={onCreateGig} className="m-2">
            + New Gig
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              firebase.auth().signOut();
              history.replace("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default GigHeader;
