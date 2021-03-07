import React from 'react';
import './styles.scss';
import PreNextBtn from '../Button';
import { Link } from 'react-router-dom';

const HelloLogin = ({history}) => {
  const onclickSignUp = ( )=> {
    history.push('/Signup')
  }

  function onclickLogin() {
    history.push('/Login')
  }

  return (
    <>
    <div className="HelloLogin">
      <div className="FeedIntroMsg">
        <p>
          안녕하세요.<br />
          <strong className="hightligter">로그인 <span className="hightligter-none">하여</span></strong> 스터디를<br />
          계획하고 공유해보세요!
        </p>
      </div>

      <PreNextBtn preBtnNm="회원가입" preBtnClick={onclickSignUp} nextBtnNm="로그인" nextBtnClick={onclickLogin} >
        <Link to="/signup"></Link>
      </PreNextBtn>
    </div>
    </>
  );
};

export default HelloLogin;