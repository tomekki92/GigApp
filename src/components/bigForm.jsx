import React, { Component } from "react";
import Input from "./common/input";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { getGig, saveGig } from "../services/fakeData";
import { getStatus } from "../services/fakeStatus";

class BigForm extends Component {
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

  validateForm = () => {
    const errors = {};
    const { name, date, time, venue, country } = this.state.data;

    if (name.trim() === "")
      errors.name = "Please fill in the input field above";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  doSubmit = () => {
    saveGig(this.state.data);

    this.props.history.push("/gigs");
  };

  validateProperty = ({ name, value }) => {
    const charLength = [4, 10, 5];
    const titles = ["name", "date", "time"];
    if (name === titles[0]) {
      if (value.length > charLength[0])
        return `Name should be less than ${charLength[0]} characters long.`;
    }
    if (name === titles[1]) {
      if (value.length > charLength[1] || value.length < 10)
        return `Date should be 10 characters long.`;
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.state.errors;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = this.state.data;
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validateForm()} className="btn btn-primary my-4">
        {label}
      </button>
    );
  }

  renderCancelButton() {
    return (
      <Link to="/gigs" className="btn btn-danger m-3">
        Cancel
      </Link>
    );
  }

  renderInput(name, label, placeholder, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  render() {
    return (
      <div>
        <h1>Gig Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "gig00")}
          {this.renderInput("date", "Date", "YYYY-MM-DD")}
          {this.renderInput("time", "Time", "00:00 GMT+3")}
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

export default BigForm;
