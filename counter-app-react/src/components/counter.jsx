import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
  };
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        {console.log(this.props)}
        <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-small"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "badge m-4 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "zero" : count;
  }
}

export default Counter;
