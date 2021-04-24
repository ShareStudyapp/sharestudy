import React, { useCallback } from 'react';
import './styles.scss';

const ProfileDialog = ({ onClose, btnList }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="profileDialog" onClick={onClose}>
      <div className="profileDialog__wrap" onClick={stopPropagation}>
        <div className="header">
          <svg
            width="15"
            height="20"
            viewBox="0 0 20 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClose}
          >
            <path
              d="M19.45 3.45L16.5 0.5L0 17L16.5 33.5L19.45 30.55L5.9 17L19.45 3.45Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="content">
          {btnList?.map((btn) => (
            <div key={btn.name} onClick={btn.onClick} className={btn.isDelete ? 'red' : ''}>
              {btn.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;
