import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { loginRequestAction } from '../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { useLocation } from 'react-router-dom';
import './LoginForm.scss';

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const { logInLoading, logInError, logInDone } = useSelector((state) => state.userReducer);
  const [userid, onChangeUserid] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
    if (logInDone) {
      if (!location.state?.from) {
        history.push('/');
      } else {
        history.push(location.state.from);
      }
    }
  }, [logInError, logInDone, history, location]);

  const onSubmitForm = useCallback(() => {
    console.log(userid, password);
    dispatch(loginRequestAction({ userid, password }));
  }, [userid, password, dispatch]);

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
            <li>
              <a href="#this">아이디 찾기</a>
            </li>
            <li className="login__link-center">
              <a href="#this">비밀번호 찾기</a>
            </li>
            <li>
              <Link to="./SignUp">
                <a href="./SignUp" className="blue">
                  회원가입
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Form>
    </div>
  );
};
export default Login;
