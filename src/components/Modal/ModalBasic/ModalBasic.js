import React from 'react';
import { Modal } from "semantic-ui-react";
import "./ModalBasic.scss";

export default function ModalBasic(props) {
    const { show, setShow, title, children,size } = props;

    const onClose = () => {
        setShow(false);
    };

    return (
        <Modal size={size} open={show} onClose={onClose} className="modal-basic">
            {title && <Modal.Header>{title}</Modal.Header>}
            {children}

        </Modal>
    )
}
