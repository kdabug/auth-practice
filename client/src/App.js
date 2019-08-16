import React from "react";
import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <main>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </main>
    </div>
  );
}

export default App;
