import React, { useState } from 'react';
import Style from '../Start/Start.module.css';
import CalendarComponent from '../../components/Calendar/Calendar';
import userService from '../../api/users.api';

export default function Logs(props) {
  const [napisy, setNapisy] = useState('placeholder');

  const getCurrentUser = () => {
    userService.getCurrentUser().then(resp => setNapisy(JSON.stringify(resp)));
  };

  return (
    <div>
      <div>Log list</div>
      <div className={Style.button} onClick={getCurrentUser}>Get Current User</div>
      <div className={Style.text}>{napisy}</div>
      <CalendarComponent />
    </div>
  )
}