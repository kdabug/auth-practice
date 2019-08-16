import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, Link } from "react-router-dom";
import { login, getProfile } from "./services/apiService";
import ProtectedRoute from "./components/ProtectedRoute";
import authService from "./services/authService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      user: {}
    };

    this.loginUser = this.loginUser.bind(this);
  }

  async componentDidMount() {
    // fetch user data on page refresh
    try {
      const fetchedUser = await getProfile();

      this.setState({
        isSignedIn: authService.isAuthenticated(),
        user: fetchedUser
      });
    } catch (e) {
      // throw e
      console.log("Issue fetching token");
    }
  }

  async loginUser(credentials) {
    try {
      console.log("credentials in loginUser", credentials);
      const user = await login(credentials);

      // if login request is a success
      // update state to store user and set
      // isSignedIn to true
      this.setState({
        isSignedIn: true,
        user: user
      });
    } catch (e) {
      throw e;
    }
  }

  signOutUser() {
    authService.signOut();
    this.setState({
      isSignedIn: false,
      user: {}
    });
  }

  render() {
    const { isSignedIn, user } = this.state;

    return (
      <div className="App">
        <nav>
          <div>
            <Link to="/">Home</Link>
          </div>

          {!isSignedIn && (
            <div className="nav-section">
              <Link to="/login">Login</Link>
            </div>
          )}

          {isSignedIn && (
            <div className="nav-section">
              <Link to="/dashboard">Dashboard</Link>

              <button onClick={this.signOutUser}> Sign out</button>
            </div>
          )}
        </nav>

        <main>
          <Route exact path="/" component={Home} />

          {/* <ProtectedRoute> to "protect" our <Dashboard> component  */}
          <ProtectedRoute path="/dashboard" user={user} component={Dashboard} />

          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                handleLogin={this.loginUser}
                isSignedIn={isSignedIn}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
