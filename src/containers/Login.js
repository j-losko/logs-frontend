import React, { useState } from 'react';
import authService from '../api/authentication.api';
import Style from './Login.module.css';
import userService from '../api/users.api';

export default function Login(props) {
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
      <div onClick={signIn}>Logowanie</div>
      <div onClick={signUp}>Rejestracja</div>
      <div onClick={getCurrentUser}>Get Current User</div>
      <div>{napisy}</div>
    </div>
  );
}