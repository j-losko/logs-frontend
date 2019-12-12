import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Logs from './containers/Logs/Logs';
import Style from './App.module.css';

function App() {
  return (
    <Router>
      <div className={Style.container}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/logs">
            <Logs />
          </Route>
          <Route path="/">
            <div className={Style.button}>
              <Link to="/login">Login</Link>
            </div>
            <div className={Style.button}>
              <Link to="/register">Register</Link>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
