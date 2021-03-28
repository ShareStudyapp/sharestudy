import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const signupCom = () => {
  return (
    <>
      <div className="completion">
        <div className="completion__wrap">
          <p>
            회원가입이 완료되었습니다.
            <br />
            <strong>Study Share</strong>와 함께
            <br />
            계획적으로 스터디를 관리하세요!
          </p>

          <Link to="/">
            <button type="button">Study Share 시작하기</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default signupCom;
