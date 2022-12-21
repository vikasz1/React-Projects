import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0, title: "hello" },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 4 },
    ],
  };
  handleDelete = (counterId) => {
    console.log("Delete invoked",counterId);
  };
  render() {
    return (
      <>
        {this.state.counters.map((entry) => {
          return (
            <Counter key={entry.id} value={entry.value} id ={entry.id} onDelete={this.handleDelete}/>
          );
        })}
      </>
    );
  }
}

export default Counters;
