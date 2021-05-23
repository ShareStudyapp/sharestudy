import React, { useCallback, useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './styles.scss';

const reportRequest = async (data) => {
  const result = { error: false, message: '' };
  try {
    await axios.post('/report/new', data);
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

//불편신고접수 페이지
const Complaint = ({ history }) => {
  const [complaint, setComplaint] = useState('');
  const { userInfo } = useSelector((state) => state.userReducer);

  const onChangeComplaint = useCallback((e) => {
    setComplaint(e.target.value);
  }, []);

  const onClickReport = useCallback(
    async (e) => {
      const response = await reportRequest({
        content: complaint,
        id: userInfo.id
      });
      if (response.error) {
        alert(response.message);
      } else {
        alert('불편신고가 접수되었습니다.');
      }
    },
    [complaint, userInfo]
  );

  return (
    <>
      <Header />
      <div className="complaint">
        <header className="complaint__back">
          <button className="backBtn" onClick={() => history.goBack()}>
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
          </button>
        </header>
        <textarea className="complaint__text" onChange={onChangeComplaint} />

        <div className="complaint__submit">
          <button type="button" onClick={onClickReport}>
            불편신고 접수하기
          </button>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Complaint;
