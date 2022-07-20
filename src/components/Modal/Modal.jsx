import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ imageAlt, largeImg, onShowModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscClick);

    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEscClick = e => {
    if (e.code === 'Escape') {
      onShowModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onShowModal();
    }
  };

  return createPortal(
    <div onClick={handleOverlayClick} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={largeImg} alt={imageAlt} />
      </div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  onShowModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
