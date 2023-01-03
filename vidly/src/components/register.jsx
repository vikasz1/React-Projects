import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username/Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    console.log("Registration Successful!!!");
  };
  render() {
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username/Email", "text")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name", "text")}
        {this.renderButton("Register")}
        </form>
      </>
    );
  }
}

export default Register;
