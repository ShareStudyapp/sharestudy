import React from 'react';
import './style.scss';

export const Button = (props) => {
    const { title, onClick, buttonClass, childern, hidden} = props

    let classNames = ['button'];
    
    if (buttonClass) {
        classNames.push(buttonClass);
    }
    
    return (
        <button hidden={hidden} className={classNames.join(' ')} onClick={onClick}>
            {title}
            {childern}
        </button>
    );
}