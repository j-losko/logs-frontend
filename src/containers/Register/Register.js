import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import authService from '../../api/authentication.api';

// eslint-disable-next-line no-useless-escape
const emailRegexRFC5322Standard = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Register(props) {
  const [firstName, setFirstName] = useInput({ label: "Imię:", type: "text" });
  const [lastName, setLastName] = useInput({ label: "Nazwisko:", type: "text" });
  const [login, setLogin] = useInput({ label: "Login:", type: "text" });
  const [email, setEmail] = useInput({ label: "Email:", type: "text" });
  const [password, setPassword] = useInput({ label: "Hasło:", type: "password" });
  const [rePassword, setRePassword] = useInput({ label: "Powtórz hasło:", type: "password" });

  const validate = () => {
    if (!firstName || !lastName || !login || !email || !password || !rePassword) {
      alert("Wypełnij wszystie pola!");
      return false;
    }

    if (email.match(emailRegexRFC5322Standard)) {
      alert("Wpisz poprawny email!");
      return false;
    }

    if (password !== rePassword) {
      alert("Hasło ma się zgadzać!");
      return false;
    }
    return true;
  };

  const signUp = () => {
    if (validate()) {
      const authorization =
        {
          "name": `${firstName.trim()} ${lastName.trim()}`,
          "username": `${login}`,
          "email": `${email}`,
          "password": `${password}`
        };
      console.log(authorization);
      //authService.signUp(authorization).then(resp => setNapisy(JSON.stringify(resp)));
    }
  };

  return <React.Fragment>
    {setFirstName}
    {setLastName}
    {setLogin}
    {setEmail}
    {setPassword}
    {setRePassword}
    <div onClick={signUp}>Rejestruj</div>
  </React.Fragment>;
}