import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { LeftOutlined } from '@ant-design/icons';
import './styles.scss';

//불편신고접수 페이지
const Complaint = () => {
  return (
    <>
      <Header />
      <div className="complaint">
        <header className="complaint__back">
          <button type="button">
            <LeftOutlined />
          </button>
        </header>
        <input type="text" className="complaint__text" />

        <div className="complaint__submit">
          <button type="submit">불편신고 접수하기</button>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Complaint;
