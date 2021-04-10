import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Form, Input, Button } from 'antd';
import CalendarDialog from './CalendarDialog';
import { useFormik } from 'formik';
import axios from 'axios';
import dayjs from 'dayjs';
import './styles.scss';

const checkUserId = async (id) => {
  const result = { error: false, message: '' };
  try {
    await axios.post('/api/auth/check/userid', { userid: id });
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const checkUserEmail = async (email) => {
  const result = { error: false, message: '' };
  try {
    await axios.post('/api/auth/check/useremail', { email: email });
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const checkUserNickname = async (nickname) => {
  const result = { error: false, message: '' };
  try {
    await axios.post('/api/auth/check/username', { username: nickname });
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};
const SignUp = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [error, setError] = useState({
    email: '',
    password: '',
    id: '',
    nickname: '',
    confirmPassword: ''
  });

  const [validateState, setValidateState] = useState({
    email: false,
    nickname: false,
    id: false
  });

  const formik = useFormik({
    initialValues: {
      nickname: '',
      email: '',
      id: '',
      password: '',
      confirmPassword: '',
      birth: '',
      agree: false,
      gender: 'F'
    },
    onSubmit: (values) => {
      console.log(values);
      console.log(validateState);
      console.log(error);
      // const valid = Object.values(validateState).every((state) => state);
      // if (values.agree && valid) {
      //   //회원가입 로직 추가 필요
      // } else {
      //   //상세 알럿 추가 필요
      //   alert('항목을 재확인 해주세요.');
      // }
    }
  });

  const onCheckId = useCallback(async () => {
    let msg = '';
    if (!formik.values.id) {
      msg = '아이디를 입력 해주세요.';
    }
    const response = await checkUserId(formik.values.id);
    if (response.error) {
      msg = response.message;
    }
    setError((error) => ({ ...error, id: msg }));
    setValidateState((state) => ({
      ...state,
      id: true
    }));
  }, [formik]);

  const onCheckEmail = useCallback(async () => {
    let msg = '';
    if (!formik.values.email) {
      msg = '이메일을 입력 해주세요.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)) {
      msg = '이메일을 올바르게 입력 해주세요.';
    }
    const response = await checkUserEmail(formik.values.email);
    if (response.error) {
      msg = response.message;
    }
    setError((error) => ({ ...error, email: msg }));
    setValidateState((state) => ({
      ...state,
      email: true
    }));
  }, [formik]);

  const onCheckNickname = useCallback(async () => {
    let msg = '';
    if (!formik.values.nickname) {
      msg = '닉네임을 입력 해주세요.';
    }
    const response = await checkUserNickname(formik.values.nickname);
    if (response.error) {
      msg = response.message;
    }
    setError((error) => ({ ...error, nickname: msg }));
    setValidateState((state) => ({
      ...state,
      nickname: true
    }));
  }, [formik]);

  const onChangePassword = useCallback((e) => {
    let msg = '';
    if (
      !/^((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*\W)|(?=.*\d)(?=.*\W)).{6,}$/.test(
        e.target.value
      )
    ) {
      msg = '비밀번호는 영문, 숫자, 특수문자중 2가지 포함 6글자 이상이어야 합니다';
    }
    setError((error) => ({
      ...error,
      password: msg
    }));
  }, []);

  const onChangeConfirmPwd = useCallback(
    (e) => {
      let msg = '';
      const { password } = formik.values;

      if (!password || !e.target.value || password !== e.target.value) {
        msg = '비밀번호가 일치하지 않습니다.';
      }
      setError((error) => ({
        ...error,
        confirmPassword: msg
      }));
    },
    [formik]
  );

  const onFormChange = useCallback(
    (e) => {
      const { name } = e.target;
      if (name === 'id' || name === 'email' || name === 'nickname') {
        setValidateState((state) => ({
          ...state,
          [name]: false
        }));
      }

      formik.handleChange(e);
    },
    [formik]
  );

  const onChangeGender = useCallback(
    (e) => {
      formik.values.gender = e?.target?.value;
    },
    [formik]
  );

  const onClickCalendar = useCallback(() => {
    setShowCalendar(true);
  }, []);

  const onCloseCalendar = useCallback(() => {
    setShowCalendar(false);
  }, []);

  const onSetDate = useCallback(
    (date) => {
      formik.values.birth = dayjs(date).format('YYYY-MM-DD');
      setShowCalendar(false);
    },
    [formik]
  );

  return (
    <div className="container">
      <div className="content">
        <Link className="backBtn" to="/login">
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
        </Link>
        <div className="signUp">
          <h1 className="header">회원가입</h1>
          <Form onFinish={formik.handleSubmit} onChange={onFormChange}>
            <div className="input-group" style={{ marginBottom: '35px' }}>
              <Input.Search
                id="id"
                name="id"
                type="text"
                placeholder="아이디를 입력해 주세요."
                enterButton="중복확인"
                value={formik.values.id}
                onSearch={onCheckId}
              />
              {error.id && <p className="error">{error.id}</p>}
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호 6글자 이상.(영문, 숫자, 특수문자중 2포함)"
                onChange={onChangePassword}
                value={formik.values.password}
              />
              {error.password && <p className="error">{error.password}</p>}
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                onChange={onChangeConfirmPwd}
                value={formik.values.confirmPassword}
              />
              {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
            </div>

            <div className="input-group" style={{ marginBottom: '35px' }}>
              <Input.Search
                id="nickname"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력해 주세요."
                enterButton="중복확인"
                value={formik.values.nickname}
                onSearch={onCheckNickname}
              />
              {error.nickname && <p className="error">{error.nickname}</p>}
              <Input.Search
                id="email"
                name="email"
                type="email"
                placeholder="이메일을 입력해 주세요."
                enterButton="중복확인"
                value={formik.values.email}
                onSearch={onCheckEmail}
              />
              {error.email && <p className="error">{error.email}</p>}
            </div>

            <div className="input-group">
              <Input
                id="birth"
                name="birth"
                type="text"
                placeholder="생년월일을 입력해주세요."
                value={formik.values.birth}
                readOnly
                onClick={onClickCalendar}
                style={{ backgroundColor: '#fff' }}
              />
              {showCalendar && <CalendarDialog setDate={onSetDate} onClose={onCloseCalendar} />}
            </div>

            <div className="submit-group">
              <div className="checkbox-group">
                <Checkbox
                  id="female"
                  value="F"
                  checked={true}
                  onClick={onChangeGender}
                  className={formik.values.gender === 'F' ? '' : 'gender_disable'}
                >
                  여자
                </Checkbox>
                <Checkbox
                  id="male"
                  value="M"
                  checked={true}
                  onClick={onChangeGender}
                  className={formik.values.gender === 'M' ? '' : 'gender_disable'}
                >
                  남자
                </Checkbox>
              </div>
              <Checkbox id="agree" name="agree" checked={formik.values.agree}>
                이용약관에 동의합니다.
              </Checkbox>
              <Button htmlType="submit">확인</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
