import React, { useState } from 'react';
import authService from '../../api/authentication.api';
import Style from './Start.module.css';
import userService from '../../api/users.api';
import Register from '../Register/Register';
import Login from '../Login/Login';
import CalendarComponent from '../../components/Calendar/Calendar';

export default function Start(props) {
  const [route, setRoute] = useState('');
  const [napisy, setNapisy] = useState('placeholder');

  const signIn = () => {
    setRoute('login');
    //const authorization = { "usernameOrEmail": 'admin', "password": 'test123!' };
    //authService.signIn(authorization).then(resp => setNapisy(JSON.stringify(resp)));
  };

  const signUp = () => {
    setRoute('register');
    // const authorization =
    //   {
    //     "name": "Marcin Migdał",
    //     "username": "admin",
    //     "email": "m.migdal@gmail.com",
    //     "password": "test123!"
    //   };
    // authService.signUp(authorization).then(resp => setNapisy(JSON.stringify(resp)));
  };

  const getCurrentUser = () => {
    userService.getCurrentUser().then(resp => setNapisy(JSON.stringify(resp)));
  };

  return (
    <div className={Style.container}>
      {route === 'register' && <Register />}
      {route === 'login' && <Login />}
      {!route && <React.Fragment>
        <div className={Style.button} onClick={signIn}>Logowanie</div>
        <div className={Style.button} onClick={signUp}>Rejestracja</div>
        <div className={Style.button} onClick={getCurrentUser}>Get Current User</div>
        <div className={Style.text}>{napisy}</div>
      </React.Fragment>}
      <CalendarComponent />
    </div>
  );
}