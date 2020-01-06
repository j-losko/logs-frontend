import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Logs from './containers/Logs/Logs';
import Style from './App.module.css';
import { LinkButton } from './components/LinkButton/LinkButton';

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
            <div className={Style.text}>
              Serwis logowania czynności oraz poświęconego na nią czasu pracy
            </div>
            <LinkButton to="/login" text="Logowanie" />
            <LinkButton to="/register" text="Zarejestruj się" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
