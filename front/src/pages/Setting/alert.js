import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Switch } from 'antd';

import axios from 'axios';

import './styles.scss';

// 알림설정 페이지
const Alert = ({ history }) => {
  const onChange = (checked) => {
    // checked : true / false
    console.log(`switch : ${checked}`);
  };

  return (
    <>
      <Header />
      <div className="alert">
        <header className="alert__back">
          <button className="backBtn" onClick={() => history.goBack()}>
            <svg
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 14L1 7.5L7.5 1"
                stroke="#111111"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        <div className="alert__content">
          <div className="alert__text">
            <p>알림 허용</p>
            <Switch className="alert__swtich" onChange={onChange} />
          </div>

          <div className="content">
            <p>알림 메시지, 소리, 진동을 포함한 앱의 알림을 받습니다.</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Alert;
