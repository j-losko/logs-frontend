import React, { useEffect, useState } from 'react';
import Style from './Logs.module.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEditModal } from '../Modals/useEditModal';
import moment from 'moment';
import logsService from '../../api/logs.api';

function formatRequestDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export default function LogList({currentDay}) {
  const [logs, setLogs] = useState([]);

  const editLog = (id, activity, time) => {
    const editedLog = {
      logId: id,
      activity: activity,
      activityTime: time
    };
    logsService.editLog(editedLog).then(resp => getLogs());
  };

  const deleteLog = (id) => {
    logsService.deleteById(id).then(resp => getLogs());
  };

  const getLogs = () => {
    logsService.getLogsByDate(formatRequestDate(currentDay.date)).then(resp => {
      setLogs(resp);
    });
  };

  useEffect(() => {
    logsService.getLogsByDate(formatRequestDate(currentDay.date))
      .then(resp => setLogs(resp));
  }, [currentDay]);

  const showEditModal = useEditModal(editLog, deleteLog);

  const logList = logs.map((log) => {
    const activityTime = moment.duration(log.activityTime, 'milliseconds')
      .format("h[h] m[m] s[s] S[ms]", { trim: 'both' });

    return <div key={log.id} onClick={() => showEditModal(log)} className={Style.log}>
      {log.activity}<br />
      Czas: {activityTime}
    </div>
  });


  return (
    <div className={Style.logList}>
    <PerfectScrollbar options={{ suppressScrollX: true }}>
      {logList}
    </PerfectScrollbar>
  </div>
  );
}