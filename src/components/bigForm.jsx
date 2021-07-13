import React, { Component } from "react";
import Input from "./common/input";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { getGig, saveGig } from "../services/fakeData";
import { getStatus } from "../services/fakeStatus";
import { inputs } from "./common/contstants";

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
    const { name, venue, date, time, country, statusId } = this.state.data;
    const message = "Please fill in the input field above";

    if (
      name.trim() === "" ||
      venue.trim() === "" ||
      country.trim() === "" ||
      date === "" ||
      time === "" ||
      statusId === ""
    )
      errors.name = message;
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
    const charLength = 4;
    if (name === "name") {
      if (value.length > charLength)
        return `Name should be less than ${charLength} characters long.`;
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
          {inputs.map((inputProps) => (
            <Input
              value={this.state.data[inputProps.name]}
              onChange={this.handleChange}
              error={
                this.state.errors[inputProps.name]
                //   ? invalidInputMessage
                //   : undefined
              }
              {...inputProps}
            />
          ))}

          {this.renderSelect("statusId", "Status", this.state.status)}

          <button
            disabled={this.validateForm()}
            className="btn btn-primary my-4"
          >
            Save
          </button>

          <Link to="/gigs" className="btn btn-danger m-3">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

export default BigForm;
