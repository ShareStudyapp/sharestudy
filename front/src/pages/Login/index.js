import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { loginRequestAction } from '../../reducers/user';
import { LOAD_POSTS_CLEAR } from '../../reducers/post';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import './LoginForm.scss';
import Cookies from 'js-cookie'
import axios from 'axios';


const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const fcmToken = Cookies.get("FCM_TOKEN");
  const { logInLoading, logInError, logInDone } = useSelector((state) => state.userReducer);
  const [userid, onChangeUserid] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [showIdDialog, setShowIdDialog] = useState(false);
  //const [showPwdDialog, setShowPwdDialog] = useState(false);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
    if (logInDone) {
      dispatch({
        type: LOAD_POSTS_CLEAR
      });
      if (!location.state?.from) {
        history.push('/');
      } else {
        history.push(location.state.from);
      }
    }
  }, [logInError, logInDone, history, location, dispatch]);

  const onSubmitForm = useCallback(() => {
    // const fcmToken = cookies.get("FCM_TOKEN");
    // console.log("onlogin")
    // console.log(fcmToken); 
    dispatch(loginRequestAction({ userid, password,fcmToken }));
  }, [userid, password, dispatch]);
  

  const openIdDialog = useCallback(() => {
    setShowIdDialog(true);
  }, []);

  const closeIdDialog = useCallback(() => {
    setShowIdDialog(false);
  }, []);

  return (
    <div className="login">
      <Form onFinish={onSubmitForm}>
        <div className="login__FormWrap">
          <h1 className="login__logo">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
          </h1>
          <Input
            className="login__id loginForm"
            name="user-id"
            type="id"
            placeholder="아이디 입력"
            value={userid}
            required
            onChange={onChangeUserid}
          />

          <Input
            className="login__pw loginForm"
            name="user-password"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            required
            onChange={onChangePassword}
          />

          <Button className="login__btn loginForm" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>          

          <ul className="login__link">
            {/* <li onClick={openIdDialog}>아이디 찾기</li>
            <li className="login__link-center">비밀번호 찾기</li> */}
            <li>
              <Link to="/SignUp">회원가입</Link>
            </li>
          </ul>
        </div>
      </Form>
      {/* {showIdDialog && <FindIdDialog onClose={closeIdDialog} />} */}
    </div>
  );
};
export default Login;
