import React, { Component } from "react";
import Pagination from "../common/Pagination";
import GigsTable from "./GigsTable";
import { paginate } from "../../utils/paginate";
import { GigsContext } from "../../contexts/GigsContext";
import firebase from "../../firebase";
import GigModal from "./GigModal";
import Loading from "../common/Loading";
import { withRouter } from "react-router-dom";
import GigHeader from "./GigHeader";

const db = firebase.firestore();

class Gigs extends Component {
  state = {
    gigs: [],
    currentPage: 1,
    pageSize: 5, //number of gigs per page
    showModal: false,
    isLoading: true,
  };

  componentDidMount() {
    const data = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("gigs")
      .get();

    data.then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        if (!doc.exists) return;
        const gig = doc.data();
        this.setState({
          gigs: [...this.state.gigs, gig],
        });
      })
    );
    this.setState({ isLoading: false });
  }

  handleSave = (currentGig) => {
    const data = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("gigs");
    const gigs = this.state.gigs.length
      ? this.state.gigs.map((gig) => {
          if (gig._id === currentGig._id) {
            return currentGig;
          }
          return gig;
        })
      : [];

    if (currentGig._id) {
      data.doc(currentGig._id).set(currentGig);
    } else {
      currentGig._id = `${currentGig.name.replace(
        " ",
        "-"
      )}-${Date.now().toString()}`;
      data.doc(currentGig._id).set(currentGig);
      gigs.push(currentGig);
    }

    this.setState({ gigs });
  };

  //sets the class to active of clicked button
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //removes the gig which's id (from state) matches the clicked id
  handleDelete = (gig) => {
    const gigs = this.state.gigs.filter((g) => g._id !== gig._id);
    this.setState({ gigs });
    const data = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("gigs");
    data.doc(gig._id).delete();
  };

  toggleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { length: count } = this.state.gigs;
    const { currentPage, pageSize, gigs: allGigs, showModal } = this.state;

    const gigs = paginate(allGigs, currentPage, pageSize);

    if (this.state.isLoading) return <Loading />;

    return (
      <GigsContext.Provider value={db}>
        <GigHeader
          history={this.props.history}
          gigsCount={count}
          onCreateGig={this.toggleShowModal}
        />
        <div className="container">
          <GigsTable
            gigs={gigs}
            onDelete={this.handleDelete}
            onGigUpdate={this.handleSave}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <GigModal
            onClose={this.toggleShowModal}
            isOpen={showModal}
            onGigUpdate={this.handleSave}
          />
        </div>
      </GigsContext.Provider>
    );
  }
}

export default withRouter(Gigs);
