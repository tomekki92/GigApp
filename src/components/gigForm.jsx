import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGig, saveGig } from "../services/fakeData";
import { getStatus } from "../services/fakeStatus";

class GigForm extends Form {
  state = {
    data: {
      name: "",
      date: "",
      time: "",
      venue: "",
      country: "",
      statusId: "",
    },
    status: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(0).max(4).label("Name"),
    date: Joi.date().required().allow("-").iso().label("Date"),
    time: Joi.required().label("Time"),
    venue: Joi.string().required().label("Venue"),
    country: Joi.string().required().label("Country"),
    statusId: Joi.string().required().label("Status"),
  };

  componentDidMount() {
    const status = getStatus();
    this.setState({ status });

    const gigId = this.props.match.params.id;
    if (gigId === "new") return;

    const gig = getGig(gigId);
    if (!gig) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(gig) });
  }

  mapToViewModel(gig) {
    return {
      _id: gig._id,
      name: gig.name,
      date: gig.date,
      time: gig.time,
      venue: gig.venue,
      country: gig.country,
      statusId: gig.status._id,
    };
  }

  doSubmit = () => {
    saveGig(this.state.data);

    this.props.history.push("/gigs");
  };

  render() {
    return (
      <div>
        <h1>Gig Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "gig00")}
          {this.renderInput("date", "Date", "YYYY-MM-DD")}
          {this.renderInput("time", "Time", "00:00")}
          {this.renderInput("venue", "Venue")}
          {this.renderInput("country", "Country", "City, Country")}
          {this.renderSelect("statusId", "Status", this.state.status)}
          {this.renderButton("Save")}
          {this.renderCancelButton()}
        </form>
      </div>
    );
  }
}

export default GigForm;
