import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import authService from '../../api/authentication.api';

export default function Login(props) {
  const [login, setLogin] = useInput({ label: "Login lub mail:", type: "text" });
  const [password, setPassword] = useInput({ label: "Hasło:", type: "password" });

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
      console.log(authorization);
      authService.signIn(authorization).then(resp => alert("Login poprawny! " + JSON.stringify(resp)));
      //authService.signIn(authorization).then(resp => setNapisy(JSON.stringify(resp)));
    }
  };

  return <React.Fragment>
    {setLogin}
    {setPassword}
    <div onClick={signUp}>Zaloguj się</div>
  </React.Fragment>;
}