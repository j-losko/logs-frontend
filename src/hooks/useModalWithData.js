import { useCallback, useMemo, useState } from 'react';
import { useModal } from 'react-modal-hook';

export default function useModalWithData(modalFactory) {
  const [modalData, setModalData] = useState(undefined);
  const modalComponent = useMemo(() => modalFactory(modalData), [modalData, modalFactory]);
  const [_showModal, hideModal] = useModal(modalComponent, [modalData]);

  const showModal = useCallback(data => {
    setModalData(data);
    _showModal();
  }, [_showModal]);

  return [showModal, hideModal];
}
