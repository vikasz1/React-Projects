import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        {console.log(this.props)}
        <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
        <button
          onClick={()=>this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-small"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "badge m-4 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "zero" : value;
  }
}

export default Counter;
