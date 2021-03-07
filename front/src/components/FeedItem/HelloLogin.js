import React from 'react';
import './styles.scss';
import PreNextBtn from '../Button';

const HelloLogin = () => {
  return (
    <>
    <div className="HelloLogin">
      <div className="FeedIntroMsg">
        <p>
          안녕하세요.<br />
          <strong className="hightligter">로그인 하여</strong> 스터디를<br />
          계획하고 공유해보세요!
        </p>
      </div>

      <PreNextBtn />
    </div>
    </>
  );
};

export default HelloLogin;