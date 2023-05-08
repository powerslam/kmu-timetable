import { useState } from "react";

import Modal from "../common/Modal";

import "../../styles/Modal.css";

const CheckInputModal = ({ isOpen, onClose, onSubmit, options, title }) => {
    const [selectedOption, setSelectedOption] = useState(Array(options.length).fill(false));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(Object.keys(selectedOption).filter(v => selectedOption[v]));
        setSelectedOption(Array(options.length).fill(false));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} handleSubmit={handleSubmit}>
            <div className="CheckInput-Modal-Container">
                {options.map(({label, value}) => (
                    <div key={value}>
                        <input type="checkbox" value={value}
                            onChange={() => {
                                setSelectedOption({
                                    ...selectedOption,
                                    [value]: !selectedOption[value],
                                })
                            }}/>
                        <label style={{ marginLeft: "0.5rem"}}>{label}</label>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default CheckInputModal;
  