import React from "react";
import ReactModal from "react-modal";
import { ModalProps } from '../types/components';

const CustomModal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={open}
            onRequestClose={onClose}
            style={{
                overlay: {
                    background: "rgba(0,0,0,0.7)",
                },
            }}
            className="z-50 w-1/3 rounded-2xl absolute top-1/4 left-1/3 right-1/3 bottom-auto"
        >
            {children}
        </ReactModal>
    );
};

export default CustomModal; 