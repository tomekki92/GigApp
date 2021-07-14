import React, { Component } from "react";
import Pagination from "./common/Pagination";
import GigsTable from "./GigsTable";
import { getGigs } from "../services/fakeData";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";

class Gigs extends Component {
  state = {
    gigs: {},
    currentPage: 1,
    pageSize: 5, //number of gigs per page
  };

  componentDidMount() {
    getGigs().then((gigs) => this.setState({ gigs }));
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (gig) => {
    const gigs = this.state.gigs.filter((g) => g._id !== gig._id);
    this.setState({ gigs });
  };

  render() {
    const { length: count } = this.state.gigs;
    const { currentPage, pageSize, gigs: allGigs } = this.state;

    if (count === 0) return <p>There are no gigs.</p>;

    const gigs = paginate(allGigs, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="position-relative p-0">
          <p className="my-1">
            <span className="badge bg-secondary p-2">Gig Count: {count}</span>
          </p>
          <Link to="/gigs/new">
            <span className="btn btn-primary btn-sm position-absolute top-0 end-0 my-1">
              + New Gig
            </span>
          </Link>
        </div>
        <GigsTable gigs={gigs} onDelete={this.handleDelete} />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Gigs;
