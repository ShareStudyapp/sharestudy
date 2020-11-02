import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';
import Main_Logo from '../assets/images/logo.png';
import './LoginForm.css'


const ButtonWrapper = styled.div`
  margin-top: 5%;
  margin-left:8%;
  button {
    width:279px;
    background-color:#B0B0B0;
    border-color:#B0B0B0;
    &:hover {
      background-color: #B0B0B0;
      border-color:#B0B0B0;
      color: black;
    }
  }
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({history}) => {
  const dispatch = useDispatch();
  const { logInLoading, logInError,logInDone } = useSelector((state) => state.userReducer);
  const [userid, onChangeUserid] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
    if(logInDone){
      history.push("/");
    }
  }, [logInError,logInDone]);
  
  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ userid, password }));
  }, [userid, password]);
  
  return (
    <div className="login_container">
        <FormWrapper onFinish={onSubmitForm}>
          <div className="logo_area">
            <img src={Main_Logo} />
          </div>
          <div className="login_area">
            <div className="userid_area">
              <Input name="user-userid" type="user-userid" value={userid} onChange={onChangeUserid} required />
            </div>
            <div className="password_area">
            <Input
              name="user-password"
              type="password"
              value={password}
              onChange={onChangePassword}
              required
            />
            </div>
          </div>
          <ButtonWrapper> 
            <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
          </ButtonWrapper>
          <div className="find_area">
            <div className="find_id">아이디 찾기</div>
            <div className="find_password">비밀번호 찾기</div>
          </div>
        </FormWrapper>
    </div>
  );
};

export default LoginForm;
