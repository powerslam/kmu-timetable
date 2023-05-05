import "../../styles/Modal.css";

import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, handleSubmit, children }) => {
  return !isOpen ? null : ReactDOM.createPortal(
    <div className="Container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-600" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="flex justify-end">
              <button type="submit" className="SubmitBtn">
                  확인
              </button>
              <button type="button" className="CancelBtn" onClick={onClose}>
                  취소
              </button>
          </div>
        </form>
    </div>,
    document.body
  );
};

export default Modal;
