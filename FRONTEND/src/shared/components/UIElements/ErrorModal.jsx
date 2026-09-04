//import React from 'react';
import Modal from "./Modal";
import Button from "../FormElements/Button";
const ErrorModal = props => {
    return(
        <Modal
            onCancel={props.onClear}
            headers="An error Occured!"
            show={!!props.error}
            footer={<Button onClick={props.onClear}>Okay</Button>} 
        >
            <p>{props.error}</p>

        </Modal>
    );
};
export default ErrorModal;