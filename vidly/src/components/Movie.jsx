import React, { Component } from "react";
import "../services/fakeMovieService";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService"
import _ from "lodash";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' }
  };
  componentDidMount() {
    const genres = [{ name: "All Genre", _id: "xyz" }, ...getGenres()]
    this.setState({ movies: getMovies(), genres: genres })
  }
  handleDelete = movie => {

    const movies = this.state.movies.filter((entry) => entry._id !== movie._id);
    this.setState({ movies: movies });
  }
  handleLike = movie => {
    console.log(this.state.movies);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }
  handleSort = sortColumn => {

    this.setState({
      sortColumn: { path: sortColumn.path, order: sortColumn.order },
    });
  }
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;
    
    const filtered = selectedGenre && selectedGenre._id !== "xyz" ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize);
    const curr_movies = [...movies]

    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <div className="row">
        <div className="col-2 ml-5">
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={curr_movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort} />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
