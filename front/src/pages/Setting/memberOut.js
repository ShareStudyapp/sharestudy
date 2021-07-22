import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

import { Checkbox, Button } from 'antd';

import './styles.scss';

const memberOut = ({ history }) => {
  return (
    <>
      <Header />
      <div className="memberOut">
        <header className="memberOut__back">
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
          <p className="header_text">회원탈퇴</p>
        </header>

        <div className="memberOut__content">
          <div className="content">
            그동안 <b>스터디쉐어</b>를 이용해주셔서 감사합니다. <br />
            개인정보는 모두 삭제 될 예정이며 삭제된 계정은 <br />
            복구 할 수 없습니다.
            <div className="memberOut__button">
              <Checkbox id="trueMemberOut">
                <b>계정 삭제에 동의합니다.</b>
              </Checkbox>
              <br />
              <Button className="successMemberOut" htmlType="submit">
                완료
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default memberOut;
