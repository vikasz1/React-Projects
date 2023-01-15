import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    //prevents the full page reload while submitting the form.
    e.preventDefault();
    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else errors[input.name] = "";
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data: data, errors } = this.state;
    return (
      <Input
        focus={true}
        name={name}
        type={type}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error = {errors[name]}
      />
    );
  };
}

export default Form;
