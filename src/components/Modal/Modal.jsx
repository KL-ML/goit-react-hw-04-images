import React, { useEffect } from 'react'; 
import { createPortal } from 'react-dom';
import { Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    };

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <div>{children}</div>
        </Overlay>,
        modalRoot
    );
};