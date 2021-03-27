import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { RightOutlined } from '@ant-design/icons';
import './styles.scss';

//환경설정 페이지
const Setting = () => {
  return (
    <>
      <Header />
      <div className="setting">
        <ul>
          <li>
            <button to="/">
              프로필 수정하기 <RightOutlined />
            </button>
          </li>
          <li>
            <button to="/">
              이용약관 <RightOutlined />
            </button>
          </li>
          <li>
            <button to="/">
              불편신고 <RightOutlined />
            </button>
          </li>
          <li>
            <button to="/">
              로그아웃 <RightOutlined />
            </button>
          </li>
          <li>
            <button to="/">
              앱 업데이트 정보 <RightOutlined />
            </button>
          </li>
        </ul>
      </div>
      <BottomNav />
    </>
  );
};

export default Setting;
