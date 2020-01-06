import React, { useEffect, useState } from 'react';
import Style from '../Logs/Logs.module.css';
import userService from '../../api/users.api';
import moment from 'moment';
import 'moment-duration-format';
import logsService from '../../api/logs.api';
import { Button } from '../../components/Button/Button';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactModal from 'react-modal';
import useModalWithData from '../../hooks/useModalWithData';
import { useModal } from 'react-modal-hook';
import useInput from '../../hooks/useInput';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '270px',
  }
};

function formatDisplayDate(date) {
  return moment(date).format("DD.MM.YYYY");
}

function formatRequestDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export default function Logs(props) {
  const [napisy, setNapisy] = useState('placeholder');
  const [currentDay, setCurrentDay] = useState({
    date: new Date(),
    formattedDate: formatDisplayDate(new Date())
  });
  const [logs, setLogs] = useState([]);

  const [showAddModal, hideAddModal] = useModal(function AddModal() {
    const [activity, setActivity] = useInput({ label: "Nazwa czynności:", type: "text" });
    const [activityTime, setActivityTime] = useInput({ label: "Czas poświęcony:", type: "text" });

    return (
      <ReactModal isOpen ariaHideApp={false} style={customStyles}>
        <p>Dodawanie log'a {currentDay.formattedDate}</p>
        {setActivity}
        {setActivityTime}
        <button type="button" className="link-button" onClick={hideAddModal}>
          Wstecz
        </button>
      </ReactModal>
    );
  }, [currentDay]);

  const [showEditModal, hideEditModal] = useModalWithData((log = null) => function EditModal() {
    const [activity, setActivity] = useInput({ label: "Nazwa czynności:", type: "text", initialValue: log.activity });
    const [activityTime, setActivityTime] = useInput({
      label: "Czas poświęcony:",
      type: "text",
      initialValue: log.activityTime
    });

    return (
      <ReactModal isOpen ariaHideApp={false} style={customStyles}>
        {setActivity}
        {setActivityTime}
        <p>log {JSON.stringify(log)}</p>
        <button type="button" className="link-button" onClick={hideEditModal}>
          Wstecz
        </button>
      </ReactModal>
    );
  });

  const getLogs = () => {
    logsService.getLogsByDate(formatRequestDate(currentDay.date)).then(resp => {
      setNapisy(JSON.stringify(resp));
      setLogs(resp);
    });
  };

  useEffect(() => {
    getLogs();
  }, [currentDay]);

  const setNextDay = () => {
    const nextDay = moment(currentDay.date).add(1, 'days').toDate();
    setCurrentDay({ date: nextDay, formattedDate: formatDisplayDate(nextDay) });
  };

  const setPrevDay = () => {
    const prevDay = moment(currentDay.date).subtract(1, 'days').toDate();
    setCurrentDay({ date: prevDay, formattedDate: formatDisplayDate(prevDay) });
  };

  const getCurrentUser = () => {
    userService.getCurrentUser().then(resp => setNapisy(JSON.stringify(resp)));
  };

  const createLog = () => {
    const newLog = {
      date: formatRequestDate(currentDay.date),
      activity: 'Dodawanie CSS\'ów',
      activityTime: 3962452
    };
    logsService.createLog(newLog).then(resp => {
      setNapisy(JSON.stringify(resp));
      getLogs();
    });
  };

  const logList = logs.map((log) => {
    const activityTime = moment.duration(log.activityTime, 'milliseconds')
      .format("h[h] m[m] s[s] S[ms]", { trim: 'both' });

    return <div key={log.id} onClick={() => showEditModal(log)} className={Style.log}>
      {log.activity}<br />
      Czas: {activityTime}
    </div>
  });

  return (
    <div className={Style.container}>
      <Button onClick={() => showAddModal(currentDay)} text="Dodaj loga" />
      <div className={Style.dayButtons}>
        <Button onClick={() => setPrevDay()} text="Poprzedni dzień" />
        <Button onClick={() => setNextDay()} text="Następny dzień" />
      </div>
      <div>{currentDay.formattedDate}</div>
      <div className={Style.logList}>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <div onClick={() => getCurrentUser()}>DEV: Get Current User</div>
          <div onClick={() => createLog()}>DEV: Create log</div>
          <div>DEV: {napisy}</div>
          {logList}
        </PerfectScrollbar>
      </div>
    </div>
  )
}