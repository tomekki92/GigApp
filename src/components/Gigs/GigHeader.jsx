import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import firebase from "../../firebase";
import styles from "./Gigs.module.css";

const GigHeader = ({ history, gigsCount, onCreateGig }) => {
  return (
    <Navbar variant="light" style={{ backgroundColor: "whitesmoke" }}>
      <Container>
        <Navbar.Brand className={styles.navbar}>
          Gigs ({gigsCount})
        </Navbar.Brand>
        <div>
          <Button onClick={onCreateGig} className="m-2">
            <span className={styles.font}>+ New Gig</span>
          </Button>
          <Button
            className=""
            variant="outline-danger"
            onClick={() => {
              firebase.auth().signOut();
              history.replace("/login");
            }}
          >
            <span className={styles.font}>Logout</span>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default GigHeader;
