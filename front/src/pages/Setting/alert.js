import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Switch } from 'antd';

import './styles.scss';

// 알림설정 페이지
const Alert = () => {
  const onChange = (checked) => {
    // checked : true / false
    console.log(`switch : ${checked}`);
  };

  return (
    <>
      <Header />
      <div className="alert">
        <ul>
          <li>새 글 알림</li>
          <li>
            소리 <Switch onChange={onChange} />
          </li>
          <li>
            진동 <Switch onChange={onChange} />
          </li>
        </ul>
      </div>
      <BottomNav />
    </>
  );
};

export default Alert;
