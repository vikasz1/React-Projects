import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "components have been updated",
      prevProps,
      "prevState",
      prevState
    );
    if (prevProps.counter.value != this.props.counter.value) {
      //make ajax call and update the value
      console.log("props changed");
    }
  }
  componentWillUnmount() {
    console.log("component removed");
  }
  render() {
    console.log("counter rendered");
    return (
      <div className="container">
        <div className="row">
          <div className="col-1">
            <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
          </div>
          <div className="col">
            <button
              onClick={() => this.props.onIncrement(this.props.counter)}
              className="btn btn-secondary btn-small btn-sm"
            >
              +
            </button>
            <button
              onClick={() => this.props.onDecrement(this.props.counter)}
              className="btn btn-secondary btn-sm m-2"
              disabled={this.props.counter.value === 0 ? true : false}
            >
              -
            </button>
            <button
              onClick={() => this.props.onDelete(this.props.counter.id)}
              className="btn btn-danger btn-sm ml-4"
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "badge m-4 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
  // getCounterClasses(){
  //   let classes = 'btn btn-secondary'
  //   classes+=this.props.counter.value === 0 ? "btn-lg" : ""
  //   return classes;
  // }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "zero" : value;
  }
}

export default Counter;
