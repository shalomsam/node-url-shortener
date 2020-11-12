import React, { FC, useState } from 'react';
import './styles.css';

interface ModalProps {
    showModal: boolean;
    title?: string;
}

const Modal: FC<ModalProps> = ({ children, title, showModal = false }) => {
    const [show, setShow] = useState('');
    if (showModal) {
        setTimeout(() => setShow('show'), 50);
        return (
            <div className='modalWrp'>
                <div 
                    className={`modal fade ${show}`}
                    tabIndex={-1}
                    role='dialog'
                >
                    <div 
                        className='modal-dialog'
                        role='document'
                    >
                        <div className='modal-content'>
                            <div className='modal-header'>
                                {title && <h5 className="modal-title" id="exampleModalLabel">{title}</h5>}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Modal;
