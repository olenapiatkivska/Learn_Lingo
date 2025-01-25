import ReactDOM from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
import Icon from '../Icon.jsx';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          ×
          {/* <Icon
            id="close"
            className={css.closeIcon}
            width={32}
            height={32}
            ariaLabel="Close button"
          /> */}
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default Modal;
