import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    console.log("countersss rendered!");
    const { onReset, onIncrement, onDelete, counters, onDecrement } =
      this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-3">
          Reset
        </button>
        {counters.map((counter) => {
          return (
            <Counter
              key={counter.id}
              onDelete={onDelete}
              counter={counter}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          );
        })}
      </div>
    );
  }
}

export default Counters;
