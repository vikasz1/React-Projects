import React, { Component } from "react";
import "../services/fakeMovieService";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete(movie) {
    console.log(movie);
    const movies = this.state.movies.filter((entry)=> entry._id!==movie._id)
    this.setState({movies:movies})
  }
  renderItems() {
    const movies = this.state.movies;
    return movies.map((entry) => {
      return (
          <tr key={entry._id}>
            <td>{entry.title}</td>
            <td>{entry.genre.name}</td>
            <td>{entry.numberInStock}</td>
            <td>{entry.dailyRentalRate}</td>
            <td>
              <button
                onClick={() => this.handleDelete(entry)}
                className="btn btn-danger"
              >
                Delete
              </button>{" "}
            </td>
          </tr>
      );
    });
  }
  render() {
    // console.log(getMovies());
    const movies = this.state.movies;
    if (this.state.movies.length===0) return <p>There are no movies in the database.</p>
    return (
      <>
    <p>Showing {this.state.movies.length} movies in the database.</p>        
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderItems()}</tbody>
        </table>
      </>
    );
  }
}

export default Movies;
