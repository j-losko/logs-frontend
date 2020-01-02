import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import Logs from '../Logs/Logs';

export default function Login(props) {
  const [login, setLogin] = useInput({ label: "Login lub mail:", type: "text" });
  const [password, setPassword] = useInput({ label: "Hasło:", type: "password" });
  const [error, setError] = useState("");
  const history = useHistory();

  const validate = () => {
    if (!login) {
      alert("Wypełnij login!");
      return false;
    }
    if (!password) {
      alert("Wypełnij hasło!");
      return false;
    }
    return true;
  };

  const signUp = () => {
    if (validate()) {
      const authorization = { "usernameOrEmail": `${login}`, "password": `${password}` };
      authService.signIn(authorization)
        .then(resp => history.replace("/logs"))
        .catch(e => setError(
          <div>
            Niepowodzenie podczas logowania!<br/>
            Sprawdź poprawność loginu i hasła.
          </div>
        ));
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <div>
            {setLogin}
            {setPassword}
            <div onClick={signUp}>Zaloguj się</div>
            {error && error}
          </div>
        </Route>
        <Route path="/logs">
          <Logs />
        </Route>
      </Switch>
    </Router>
  );
}