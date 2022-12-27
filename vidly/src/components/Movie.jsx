import React, { Component } from "react";
import "../services/fakeMovieService";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };
  handleDelete(movie) {
    console.log(movie);
    const movies = this.state.movies.filter((entry) => entry._id !== movie._id);
    this.setState({ movies: movies });
  }
  handleLike(movie) {
    const movies = [...this.state.movies];
    // console.log(movies);
    const index = movies.indexOf(movie);
    // console.log(index);
    console.log(movies[index]);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    console.log(movies[index]);
    this.setState({ movies: movies });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
 
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    const curr_movies = [...movies]
    console.log(curr_movies);
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Like?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {curr_movies.map((movie) => {
              console.log(movie.title)
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.like}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </>
    );
  }
}
export default Movies;
