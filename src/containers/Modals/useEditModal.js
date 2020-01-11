import React from 'react';
import useInput from '../../hooks/useInput';
import moment from 'moment';
import { Button } from '../../components/Button/Button';
import parseHumanizedDuration from '../../utils/parseHumanizedDuration';
import ReactModal from 'react-modal';
import useModalWithData from '../../hooks/useModalWithData';
import { modalContainerStyle } from './Modal.style';
import Style from './Modal.module.css';

export function useEditModal(editLogRequest, deleteLogRequest) {
  const [showEditModal, hideEditModal] = useModalWithData((log = null) =>
    function EditLogModal() {
      const [activity, setActivity] = useInput({
        label: "Nazwa czynności:",
        type: "text",
        initialValue: log.activity
      });
      const [activityTime, setActivityTime] = useInput({
        label: "Czas poświęcony:",
        type: "text",
        initialValue: moment.duration(log.activityTime, 'milliseconds')
          .format("h[h] m[m] s[s] S[ms]", { trim: 'both' })
      });

      const editLog = () => {
        const timestamp = parseHumanizedDuration(activityTime);
        if (timestamp) {
          editLogRequest(log.id, activity, timestamp);
          hideEditModal();
        } else {
          alert("Błędny czas poświęcony!");
        }
      };

      const deleteLog = () => {
        deleteLogRequest(log.id);
        hideEditModal();
      };

      return (
        <ReactModal isOpen ariaHideApp={false} style={modalContainerStyle}>
          <p className={Style.title}>Log "{log.activity}"</p>
          <div className={Style.inputContainer}>
            {setActivity}
            {setActivityTime}
          </div>
          <Button onClick={editLog} text="Edytuj log'a" style={{ margin: 'auto' }} />
          <br />
          <div className={Style.buttonContainer}>
            <div style={{ flex: '1' }} />
            <button type="button" className={`link-button ${Style.button}`} onClick={hideEditModal}>
              Wstecz
            </button>
            <button type="button" className={`link-button ${Style.button}`} onClick={() => deleteLog()}>
              Usuń Log'a
            </button>
          </div>
        </ReactModal>
      );
    });
  return showEditModal;
}