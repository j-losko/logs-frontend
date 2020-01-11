import React, { useState } from 'react';
import Style from '../Logs/Logs.module.css';
import moment from 'moment';
import 'moment-duration-format';
import logsService from '../../api/logs.api';
import { Button } from '../../components/Button/Button';
import { useAddModal } from '../Modals/useAddModal';
import LogList from './LogList';

function formatDisplayDate(date) {
  return moment(date).format("DD.MM.YYYY");
}

function formatRequestDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export default function Logs(props) {
  const [currentDay, setCurrentDay] = useState({
    date: new Date(),
    formattedDate: formatDisplayDate(new Date())
  });

  const createLog = (activity, time, currentDay) => {
    const newLog = {
      date: formatRequestDate(currentDay.date),
      activity: activity,
      activityTime: time
    };
    logsService.createLog(newLog).then(resp => setCurrentDay({
      date: currentDay.date,
      formattedDate: currentDay.formattedDate
    }));
  };

  const showAddModal = useAddModal(createLog);

  const changeDay = (amount) => {
    const nextDay = moment(currentDay.date).add(amount, 'days').toDate();
    setCurrentDay({ date: nextDay, formattedDate: formatDisplayDate(nextDay) });
  };

  return (
    <div className={Style.container}>
      <Button onClick={() => showAddModal(currentDay)} text="Dodaj loga" />
      <div className={Style.dayButtons}>
        <Button onClick={() => changeDay(-1)} text="Poprzedni dzień" />
        <Button onClick={() => changeDay(+1)} text="Następny dzień" />
      </div>
      <div>{currentDay.formattedDate}</div>
      <LogList currentDay={currentDay}/>
    </div>
  )
}