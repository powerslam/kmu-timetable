import "../../styles/Modal.css";

import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, handleSubmit, children }) => {
  return !isOpen ? null : ReactDOM.createPortal(
    <div className="Modal-Container">
        <div className="Modal-Header">
          <h2 className="Modal-Header-Title">{title}</h2>
          <button className="Modal-CloseBtn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="Modal-Btn-Container">
              <button type="submit" className="Modal-SubmitBtn">
                  확인
              </button>
              <button type="button" className="Modal-CancelBtn" onClick={onClose}>
                  취소
              </button>
          </div>
        </form>
    </div>,
    document.body
  );
};

export default Modal;
