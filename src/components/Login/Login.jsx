import React from "react";
import Button from "react-bootstrap/Button";
import firebase from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect, withRouter } from "react-router-dom";
import { GIG_APP_ROUTE } from "../common/contstants";
import styles from "./Login.module.css";

const Login = ({ history }) => {
  const handleGoogleLogin = React.useCallback(
    async (event) => {
      event.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            const user = result.user.toJSON();
            const db = firebase.firestore();
            const usersRef = db.collection("users");

            usersRef
              .doc(firebase.auth().currentUser.uid)
              .get()
              .then((doc) => {
                if (!doc.exists) {
                  usersRef
                    .doc(firebase.auth().currentUser.uid)
                    .set({ username: user.displayName });
                }
              });
          });
        history.push(GIG_APP_ROUTE);
      } catch {}
    },
    [history]
  );

  const { currentUser } = React.useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={GIG_APP_ROUTE} />;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className="my-5">Gig App</h1>
        <p className="mt-5 pt-4 mb-0">
          Gig management app for entertainment acts
        </p>
        <Button variant="danger" className="my-5" onClick={handleGoogleLogin}>
          <i className="fa fa-google"></i>{" "}
          <span className={styles.google}>Login with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Login);
