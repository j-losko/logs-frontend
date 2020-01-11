import React from 'react';
import useInput from '../../hooks/useInput';
import parseHumanizedDuration from '../../utils/parseHumanizedDuration';
import ReactModal from 'react-modal';
import useModalWithData from '../../hooks/useModalWithData';
import { modalContainerStyle } from './Modal.style';
import Style from './Modal.module.css';

export function useAddModal(createLog) {
  const [showAddModal, hideAddModal] = useModalWithData((currentDay = null) =>
    function AddLogModal() {
      const [activity, setActivity] = useInput({ label: "Nazwa czynności:", type: "text" });
      const [activityTime, setActivityTime] = useInput({ label: "Czas poświęcony:", type: "text" });

      const addLog = () => {
        const timestamp = parseHumanizedDuration(activityTime);
        if (timestamp) {
          createLog(activity, timestamp, currentDay);
          hideAddModal();
        } else {
          alert("Błędny czas poświęcony!");
        }
      };

      return (
        <ReactModal isOpen ariaHideApp={false} style={modalContainerStyle}>
          <p className={Style.title}>Dodawanie log'a</p>
          <div className={Style.inputContainer}>
            {setActivity}
            {setActivityTime}
          </div>
          <br />
          <div className={Style.buttonContainer}>
            <div style={{ flex: '1' }} />
            <button type="button" className={`link-button ${Style.button}`} onClick={hideAddModal}>
              Wstecz
            </button>
            <button type="button" className={`link-button ${Style.button}`} onClick={addLog}>
              Dodaj
            </button>
          </div>
        </ReactModal>
      );
    });
  return showAddModal;
}