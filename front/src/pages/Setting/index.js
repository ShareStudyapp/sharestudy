import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles.scss';

//환경설정 페이지
const Setting = () => {
  return (
    <>
      <Header />

      <div className="setting">
        <ul>
          <li>
            <Link to="/setprofile">
              프로필 수정하기 <RightOutlined />
            </Link>
          </li>
          <li>
            <Link to="/">
              이용약관 <RightOutlined />
            </Link>
          </li>
          <li>
            <Link to="/">
              불편신고 <RightOutlined />
            </Link>
          </li>
          <li>
            <Link to="/">
              로그아웃 <RightOutlined />
            </Link>
          </li>
          <li>
            <Link to="/">
              앱 업데이트 정보 <RightOutlined />
            </Link>
          </li>
        </ul>
      </div>
      <BottomNav />
    </>
  );
};

export default Setting;
