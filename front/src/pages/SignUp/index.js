import React from "react";
import { Checkbox, Form, Input } from "antd";
import "./styles.scss";

const SignUp = () => {
  return (
    <div className="sign-form">
      <div style={{ width: "267px" }}>
        <h1 style={{ marginBottom: "30px" }}>회원가입</h1>
        <Form>
          <div className="input-group" style={{ marginBottom: "35px" }}>
            <Input.Search
              placeholder="이메일을 입력해 주세요."
              allowClear
              enterButton="확인"
              //onSearch={onSearch}
            />
            <Input.Search
              placeholder="인증메일 문구확인"
              allowClear
              enterButton="확인"
              //onSearch={onSearch}
            />
          </div>
          <div className="input-group">
            <Input.Search
              placeholder="이메일을 입력해 주세요."
              allowClear
              enterButton="확인"
              //onSearch={onSearch}
            />
            <Input placeholder="비밀번호 6글자 이상.(영문, 숫자, 특수문자중 2포함)" />
            <Input.Search
              placeholder="인증메일 문구확인"
              allowClear
              enterButton="확인"
              //onSearch={onSearch}
            />
          </div>
          <Checkbox>이용약관이 있다면 이곳에</Checkbox>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
