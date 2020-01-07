import React from 'react';
import useInput from '../../hooks/useInput';
import ReactModal from 'react-modal';
import useModalWithData from '../../hooks/useModalWithData';
import parseHumanizedDuration from '../../utils/parseHumanizedDuration';
import { modalContainerStyle } from './Modal.style';
import Style from './Modal.module.css';
import moment from 'moment';

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
        editLogRequest(log.id, activity, activityTime);
        hideEditModal();
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
          <button type="button" onClick={() => editLog()}>
            Edytuj log'a
          </button>
          <br />
          <button type="button" className="link-button" onClick={hideEditModal}>
            Wstecz
          </button>
          <button type="button" className="link-button" onClick={() => deleteLog()}>
            Usuń Log'a
          </button>
        </ReactModal>
      );
    });
  return showEditModal;
}