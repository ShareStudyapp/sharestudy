import React, { useCallback, useState } from "react";
import { Checkbox, Form, Input, Button } from "antd";
import { useFormik } from "formik";
import "./styles.scss";

const SignUp = () => {
  const [validateState, setValidateState] = useState({
    email: false,
    confirmText: false,
    id: false,
    confirmPassword: false,
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      confirmText: "",
      id: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log("호출!");
      console.log(values);
    },
  });

  const onSendEmail = useCallback(() => {
    if (
      !formik.values.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)
    ) {
      //이메일 포맷이 아님, 에러지정해서 팝업띄우기
      setValidateState((state) => ({ ...state, email: false }));
      return;
    }
    //메일 발송하기
    console.log(formik.values.email, "메일발송");
    setValidateState((state) => ({ ...state, email: true }));
  }, [formik]);

  const onCheckConfirmText = useCallback(() => {
    if (!validateState.email) {
      //메일을 보내지않음, 에러지정해서 팝업띄우기
      setValidateState((state) => ({ ...state, confirmText: false }));
      return;
    }

    console.log(formik.values.confirmText, "문구확인api추가필요");
    if (!formik.values.confirmText) {
      //문구가 다름, 에러지정해서 팝업띄우기
      setValidateState((state) => ({ ...state, confirmText: false }));
      return;
    }
    setValidateState((state) => ({ ...state, confirmText: true }));
  }, [formik, validateState]);

  const onCheckDupId = useCallback(() => {
    console.log(formik.values.id, "중복검사");
    if (!formik.values.id) {
      //id가 존재함 , 에러지정해서 팝업띄우기
      setValidateState((state) => ({ ...state, id: false }));
      return;
    }
    setValidateState((state) => ({ ...state, id: true }));
  }, [formik]);

  const onCheckConfirmPwd = useCallback(() => {
    const { password, confirmPassword } = formik.values;
    if (
      /^((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*\W)|(?=.*\d)(?=.*\W)).{6,}$/.test(
        password
      )
    ) {
      //비밀번호 조합틀림, 에러지정해서 팝업띄우기
      setValidateState((state) => ({ ...state, confirmPassword: false }));
      return;
    }

    if (!password || !confirmPassword || password !== confirmPassword) {
      //비밀번호가 다름, 에러지정해서 팝업띄우기
      setValidateState((state) => ({ ...state, confirmPassword: false }));
      return;
    }
  }, [formik]);

  const onFormChange = useCallback(
    (e) => {
      if (e.target.name === "id") {
        setValidateState((state) => ({
          ...state,
          id: false,
        }));
      }

      formik.handleChange(e);
    },
    [formik]
  );

  return (
    <div className="sign-form">
      <svg
        className="back-btn"
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
      <div style={{ width: "267px" }}>
        <h1
          style={{ marginBottom: "30px", fontWeight: "bold", fontSize: "15px" }}
        >
          회원가입
        </h1>
        <Form onFinish={formik.handleSubmit} onChange={onFormChange}>
          <div className="input-group" style={{ marginBottom: "35px" }}>
            <Input.Search
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요."
              enterButton="확인"
              value={formik.values.email}
              disabled={validateState.email}
              onSearch={onSendEmail}
            />
            <Input.Search
              id="confirmText"
              name="confirmText"
              type="text"
              placeholder="인증메일 문구확인"
              enterButton="확인"
              value={formik.values.confirmText}
              disabled={!validateState.email || validateState.confirmText}
              onSearch={onCheckConfirmText}
            />
          </div>
          <div className="input-group">
            <Input.Search
              className={validateState.id ? "confirm" : ""}
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력해 주세요."
              enterButton="확인"
              value={formik.values.id}
              onSearch={onCheckDupId}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호 6글자 이상.(영문, 숫자, 특수문자중 2포함)"
              value={formik.values.password}
            />
            <Input.Search
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              enterButton="확인"
              value={formik.values.confirmPassword}
              onSearch={onCheckConfirmPwd}
            />
          </div>
          <div className="submit-group">
            <Checkbox>이용약관이 있다면 이곳에</Checkbox>

            <Button htmlType="submit">로그인</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
