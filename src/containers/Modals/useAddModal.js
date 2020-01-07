import React from 'react';
import useInput from '../../hooks/useInput';
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
        createLog(activity, activityTime, currentDay);
        hideAddModal();
      };

      return (
        <ReactModal isOpen ariaHideApp={false} style={modalContainerStyle}>
          <p className={Style.title}>Dodawanie log'a</p>
          <div className={Style.inputContainer}>
            {setActivity}
            {setActivityTime}
          </div>
          <button type="button" className="link-button" onClick={hideAddModal}>
            Wstecz
          </button>
          <button type="button" className="link-button" onClick={addLog}>
            Dodaj
          </button>
        </ReactModal>
      );
    });
  return showAddModal;
}