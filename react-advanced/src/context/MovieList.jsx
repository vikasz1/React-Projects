import React, { Component } from "react";
import MovieRow from "./MovieRow";
import UserContext from "./userContext";
class MovieList extends Component {
  render() {
    return (
      // consumer expects a function as a child
      <UserContext.Consumer>
        {(userContext) => (
          <div>
            MovieList {userContext.name} <MovieRow />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default MovieList;
