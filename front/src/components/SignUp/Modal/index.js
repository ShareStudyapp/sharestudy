import React from "react";
import './style.scss';

export const Modal = (props) => {    
    const { show, onClose, children, title }     = props;
    if (!show) {
        return null;
    }    

    return (
        <>
            { show ? <div onClick={onClose} className="back-drop"></div> : null }
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <span className="close-modal-btn" onClick={onClose}>×</span>
                </div>
                <div className="modal-body">
                        {children}
                </div>                         
            </div>
        </>
    );  
}