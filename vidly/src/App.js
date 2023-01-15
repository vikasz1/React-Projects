import { Route, Redirect, Switch, redirect } from "react-router-dom";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Movies from "./components/Movie";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logOut";
import Register from "./components/register";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar user={this.state.user} />
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
