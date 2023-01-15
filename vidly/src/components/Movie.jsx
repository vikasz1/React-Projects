import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";


class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genre", _id: "xyz" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((entry) => entry._id !== movie._id);
    this.setState({ movies: movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Movie not found");

      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    console.log(this.state.movies);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({
      sortColumn: { path: sortColumn.path, order: sortColumn.order },
    });
  };
  handleSearch = (query) => {
    this.getPageData();
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase)
      );
    else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: [...movies], sorted };
  };
  render() {

    const { length: totalCount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;
    const {user} = this.props;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    const curr_movies = [...movies];
    // const { totalCount, data: curr_movies, sorted } = this.getPageData();
    // const { sortColumn, pageSize, currentPage } = this.state;
    if (totalCount === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-2 ml-5">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>}
          {console.log(user)}

          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={curr_movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={sorted.length}
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
