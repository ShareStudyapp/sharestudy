import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';
import backgroundImg from '../assets/images/login_background.png';
import './LoginForm.css'


const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError,me } = useSelector((state) => state.userReducer);
  const [userid, onChangeUserid] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  
  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ userid, password }));
  }, [userid, password]);
  
  return (
    <div className="login_container">
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-userid">이메일</label>
        <br />
        <Input name="user-userid" type="user-userid" value={userid} onChange={onChangeUserid} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper> 
        <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
      </ButtonWrapper>
    </FormWrapper>
    </div>
  );
};

export default LoginForm;
