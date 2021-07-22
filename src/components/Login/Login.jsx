import React from "react";
import Button from "react-bootstrap/Button";
import firebase from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect, withRouter } from "react-router-dom";
import { GIG_APP_ROUTE } from "../common/contstants";

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
    <Button variant="danger" onClick={handleGoogleLogin}>
      <i className="fa fa-google"></i> Login with google
    </Button>
  );
};

export default withRouter(Login);
