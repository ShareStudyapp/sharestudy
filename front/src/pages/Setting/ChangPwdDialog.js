import React, { useCallback } from 'react';
import { Button, Input } from 'antd';
import useInput from '../../hooks/useInput';

import axios from 'axios';

const changePwd = async (data) => {
  const result = { error: false, message: '' };
  try {
    await axios.post('/api/auth/change/password', data);
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const ChangPwdDialog = ({ onClose, userId }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const [pwd, onChangePwd] = useInput('');
  const [newPwd, onChangeNewPwd] = useInput('');
  const [confirmNewPwd, onChangeConfirmNewPwd] = useInput('');

  const onClickChangePwd = useCallback(async () => {
    if (!/^((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*\W)|(?=.*\d)(?=.*\W)).{6,}$/.test(newPwd)) {
      alert('비밀번호는 영문, 숫자, 특수문자중 2가지 포함 6글자 이상이어야 합니다');
      return false;
    } else if (newPwd !== confirmNewPwd) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    const response = await changePwd({
      newPassword: newPwd,
      password: pwd,
      userId: userId
    });
    if (response.error) {
      alert(response.message);
    } else {
      alert('비밀번호 변경이 완료되었습니다.');
      onClose();
    }
  }, [pwd, newPwd, confirmNewPwd]);

  return (
    <div className="Dialog" onClick={onClose}>
      <div className="Dialog-wrap" onClick={stopPropagation}>
        <h2>비밀번호 변경</h2>
        <Input
          name="password"
          type="password"
          placeholder="현재 비밀번호"
          required
          onChange={onChangePwd}
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="신규 비밀번호"
          required
          onChange={onChangeNewPwd}
        />
        <Input
          name="user-email"
          type="password"
          placeholder="신규 비밀번호 확인"
          required
          onChange={onChangeConfirmNewPwd}
        />
        <Button className="confirm" onClick={onClickChangePwd}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default ChangPwdDialog;
