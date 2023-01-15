import React, { Component } from "react";
import withToolTip from "./withToolTip";

class Movies extends Component {
  render() {
    return <h1>Movies
    {this.props.showToolTip &&<div>Some showToolTip</div>}
    </h1>;
  }
}

export default withToolTip(Movies);
