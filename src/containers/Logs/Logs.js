import React, { useState } from 'react';
import Style from '../Logs/Logs.module.css';
import userService from '../../api/users.api';
import moment from 'moment';
import 'moment-duration-format';
import logsService from '../../api/logs.api';

export default function Logs(props) {
  const [napisy, setNapisy] = useState('placeholder');
  const [logs, setLogs] = useState([]);

  const getCurrentUser = () => {
    userService.getCurrentUser().then(resp => setNapisy(JSON.stringify(resp)));
  };

  const createLog = () => {
    const newLog = {
      date: moment(new Date()).format("YYYY-MM-DD"),
      activity: 'Spotkanie code review',
      activityTime: 3962452
    };
    logsService.createLog(newLog).then(resp => setNapisy(JSON.stringify(resp)));
  };

  const getLogs = () => {
    logsService.getLogsByDate(moment(new Date()).format("YYYY-MM-DD")).then(resp => {
      setNapisy(JSON.stringify(resp));
      setLogs(resp);
    });
  };

  const logList = logs.map((log) => {
    const activityTime = moment.duration(log.activityTime, 'milliseconds')
      .format("h[h] m[m] s[s] S[ms]", { trim: 'both' });
    return <div key={log.id} className={Style.button}>
      {log.activity}<br />
      {activityTime}
    </div>

  });

  return (
    <div>
      <div>Log list</div>
      <div className={Style.button} onClick={getCurrentUser}>Get Current User</div>
      <div className={Style.button} onClick={createLog}>Create log</div>
      <div className={Style.button} onClick={getLogs}>Get logs from today</div>
      <div className={Style.text}>{napisy}</div>
      <br />
      <br />
      <br />
      <div className={Style.container}>
        {logList}
      </div>
    </div>
  )
}