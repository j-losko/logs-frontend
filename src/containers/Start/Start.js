import React, { useState } from 'react';
import authService from '../../api/authentication.api';
import Style from './Start.module.css';
import userService from '../../api/users.api';

export default function Start(props) {
  const [napisy, setNapisy] = useState('placeholder');

  const signIn = () => {
    const authorization = { "usernameOrEmail": 'admin', "password": 'test123!' };
    authService.signIn(authorization).then(resp => setNapisy(JSON.stringify(resp)));
  };

  const signUp = () => {
    const authorization =
      {
        "name": "Marcin Migdał",
        "username": "admin",
        "email": "m.migdal@gmail.com",
        "password": "test123!"
      };
    authService.signUp(authorization).then(resp => setNapisy(JSON.stringify(resp)));
  };

  const getCurrentUser = () => {
    userService.getCurrentUser().then(resp => setNapisy(JSON.stringify(resp)));
  };


  return (
    <div className={Style.container}>
      <div className={Style.button} onClick={signIn}>Logowanie</div>
      <div className={Style.button} onClick={signUp}>Rejestracja</div>
      <div className={Style.button} onClick={getCurrentUser}>Get Current User</div>
      <div className={Style.text}>{napisy}</div>
    </div>
  );
}