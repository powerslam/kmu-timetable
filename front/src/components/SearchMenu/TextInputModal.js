import { useState } from "react";

import Modal from "../common/Modal";
import TextField from "../common/TextField";

const TextInputModal = ({ isOpen, onClose, onSubmit, placeholder, title }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} handleSubmit={handleSubmit}>
            <TextField type="text" addStyle="mb-4" placeholder={placeholder} 
                onChange={(e) => setText(e.target.value)} value={text}/>
        </Modal>
    );
};

export default TextInputModal;
  