import React, { useCallback } from 'react';
import { Button, Input } from 'antd';
import useInput from '../../hooks/useInput';

import axios from 'axios';

const findUserId = async (email) => {
  const result = { error: false, message: '' };
  try {
    await axios.get(`/email/find/userId/${email}`);
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const FindIdDialog = ({ onClose }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const [email, onChangeEmail] = useInput('');

  const onFindUser = useCallback(async () => {
    if (!email) {
      alert('이메일을 입력 해주세요.');
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert('이메일을 올바르게 입력 해주세요.');
      return false;
    }

    const response = await findUserId(email);
    if (response.error) {
      alert(response.message);
    } else {
      alert('메일이 발송 되었습니다.');
      onClose();
    }
  }, [email]);

  return (
    <div className="Dialog" onClick={onClose}>
      <div className="Dialog-wrap" onClick={stopPropagation}>
        <h2>아이디 찾기</h2>
        <Input
          name="user-email"
          type="email"
          placeholder="이메일 입력"
          required
          onChange={onChangeEmail}
        />
        <p>입력하신 이메일로 가입한 계정을 보내드립니다.</p>
        <Button className="confirm" onClick={onFindUser}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default FindIdDialog;
