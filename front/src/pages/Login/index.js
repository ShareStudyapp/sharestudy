import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { loginRequestAction } from '../../reducers/user';
import { LOAD_POSTS_CLEAR } from '../../reducers/post';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import FindDialog from './FindDialog';
import './LoginForm.scss';
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  // let fcmToken = Cookies.get('FCM_TOKEN');
  


  const { logInLoading, logInError, logInDone } = useSelector((state) => state.userReducer);
  const [userid, setUserId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [dialogInfo, setDialogInfo] = useState({ type: '', open: false });

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
    let rnCheck = false
    if (logInDone) {
      
      if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage(JSON.stringify({"userid":userid}));
      }
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
   
    dispatch(loginRequestAction({ userid, password }));
  
  }, [userid, password, dispatch]);

  const openIdDialog = useCallback(() => {
    setDialogInfo({ type: 'id', open: true });
  }, []);

  const openPwdDialog = useCallback(() => {
    setDialogInfo({ type: 'pwd', open: true });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogInfo({ type: '', open: false });
  }, []);
 
  const onChangeUserId = (e) =>{
   
    setUserId(e)
 }
  
  return (
    <div className="login">
      <Form onFinish={onSubmitForm} id="frm">
        <div className="login__FormWrap">
          <h1 className="login__logo">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
          </h1>
          <Input
            className="login__id loginForm"
            name="user-id"
            type="id"
            id="user-id"
            placeholder="아이디 입력"
            value={userid}
            required
            onChange={(e)=>onChangeUserId(e)}
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
          
          <Button id="loginClick"className="login__btn loginForm" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
          <ul className="login__link">
            <li onClick={openIdDialog}>아이디 찾기</li>
            <li onClick={openPwdDialog} className="login__link-center">
              비밀번호 찾기 
            </li>
            <li>
              <Link to="/SignUp">회원가입</Link>
            </li>
          </ul>
        </div>
      </Form>
      {dialogInfo.open && <FindDialog onClose={closeDialog} type={dialogInfo.type} />}
    </div>
  );
};
export default Login;
