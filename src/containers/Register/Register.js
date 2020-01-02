import React from 'react';
import useInput from '../../hooks/useInput';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import Logs from '../Logs/Logs';

// eslint-disable-next-line no-useless-escape
const emailRegexRFC5322Standard = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Register(props) {
  const [firstName, setFirstName] = useInput({ label: "Imię:", type: "text" });
  const [lastName, setLastName] = useInput({ label: "Nazwisko:", type: "text" });
  const [login, setLogin] = useInput({ label: "Login:", type: "text" });
  const [email, setEmail] = useInput({ label: "Email:", type: "text" });
  const [password, setPassword] = useInput({ label: "Hasło:", type: "password" });
  const [rePassword, setRePassword] = useInput({ label: "Powtórz hasło:", type: "password" });
  const history = useHistory();

  const validate = () => {
    if (!firstName || !lastName || !login || !email || !password || !rePassword) {
      alert("Wypełnij wszystie pola!");
      return false;
    }

    if (!email.match(emailRegexRFC5322Standard)) {
      alert("Wpisz poprawny email!");
      return false;
    } else if (email.trim().length > 40) {
      alert("Email jest zbyt długi!");
      return false;
    }

    if (password !== rePassword) {
      alert("Hasło się nie zgadza!");
      return false;
    } else if (password.length < 6) {
      alert("Hasło jest zbyt krótkie!");
      return false;
    } else if (password.length > 20) {
      alert("Hasło jest zbyt długie!");
      return false;
    }

    if ((firstName.trim().length + lastName.trim().length) < 4) {
      alert("Imię i Nazwisko jest za krótkie!");
      return false;
    } else if ((firstName.trim().length + lastName.trim().length) > 40) {
      alert("Imię i Nazwisko jest za długie!");
      return false;
    }

    if (login.trim().length < 3) {
      alert("Login jest zbyt krótki!");
      return false;
    } else if (login.trim().length > 15) {
      alert("Login jest zbyt długi!");
      return false;
    }

    return true;
  };

  const signUp = () => {
    if (validate()) {
      const authorization =
        {
          "name": `${firstName.trim()} ${lastName.trim()}`,
          "username": `${login.trim()}`,
          "email": `${email}`,
          "password": `${password}`
        };
      authService.signUp(authorization).then(resp => {
        history.replace("/login");
        alert("Konto zostało założone!");
      });
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <div>
            {setFirstName}
            {setLastName}
            {setLogin}
            {setEmail}
            {setPassword}
            {setRePassword}
            <div onClick={signUp}>Rejestruj</div>
          </div>
        </Route>
        <Route path="/logs">
          <Logs />
        </Route>
      </Switch>
    </Router>
  )

}