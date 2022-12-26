import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Counters from "./components/counters";
import NavBar from "./components/navBar";
class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 100 },
    ],
  };
  constructor(props){
    super(props)
    console.log("App Constructor");
  }
  componentDidMount(){
    //Ajax calls and set states
    // this.setState({})
    console.log("app mounted");
  }
  handleDelete = (counterId) => {
    // console.log("Delete invoked", counterId);
    this.state.counters = this.state.counters.filter(
      (entry) => entry.id != counterId
    );
    this.setState({ counters: this.state.counters });
  };
  handleIncrement = (counter) => {
    console.log(counter);
    counter = counter.value++;
    this.setState({ counter: counter });
  };
  handleDecrement = (counter)=>{
    if (counter.value>0)   counter = counter.value--;
    
    this.setState({counter:counter});
  }
  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: counters });
  };
  render() {
    console.log("app rendered");
    return <>
      <NavBar totalCounters = {this.state.counters.filter((c)=>c.value>0).length}/>
      <main className="container">
        <Counters
          counters = {this.state.counters}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onReset={this.handleReset}
        />
      </main>
    </>
  }
}

export default App;
