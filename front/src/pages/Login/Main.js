import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';
import styled from 'styled-components';
import Main_Logo from '../../assets/images/logo.png';
import './Main.css';

const handleColorType = color => {
    switch (color) {
      case "signup":
        return "color: #fff; background: #6A3DE6;border-color:#6A3DE6";
      case "signin":
        return "color: #5858E1; background: #fff;border-color:#fff";
      default:
        return "color: red; background: #eee;";
    }
  };
const ButtonWrapper = styled.div`
  margin-top: 5%;
  text-align: center;
  button {
    width:279px;
    height:48px;
    ${({ color }) => handleColorType(color)};
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

  const onSignup = () =>{
      history.push('/signup')
  }
  const onSignin = () =>{
    history.push('/signin')
}
  return (
    <div className="login_container">
        <FormWrapper>
          <div className="logo_area">
            <img src={Main_Logo} />
          </div>
          <div className="signin_area">
            <div>
                <ButtonWrapper color="signup">
                    <Button onClick={onSignup}>회원가입</Button>
                </ButtonWrapper>
            </div>
            <div className="password_area">
                <ButtonWrapper color="signin">
                    <Button onClick={onSignin}>로그인</Button>
                </ButtonWrapper>
            </div>
          </div>
        </FormWrapper>
    </div>
  );
};

export default LoginForm;
