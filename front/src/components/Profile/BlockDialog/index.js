import React, { useCallback, useState } from 'react';
import axios from 'axios';
import './styles.scss';

const blockUser = async (id) => {
  const result = { error: false, message: '' };
  try {
    await axios.get(`/report/user/${id}`);
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const unBlockUser = async (id) => {
  const result = { error: false, message: '' };
  try {
    await axios.delete(`/report/user/${id}`);
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const BlockDialog = ({ onClose, id, isBlocked, name }) => {
  isBlocked = true;
  const [step, setStep] = useState(1);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onClickBlockProc = useCallback(() => {
    setStep(2);
  }, [setStep]);

  const onClickUnBlock = useCallback(async () => {
    const response = await unBlockUser(id);
    if (response.error) {
      alert(response.message);
    } else {
      setStep(3);
    }
  }, [id]);

  const onClickBlock = useCallback(async () => {
    const response = await blockUser(id);
    if (response.error) {
      alert(response.message);
    } else {
      setStep(3);
    }
  }, [id]);

  return (
    <div className="blockDialog" onClick={onClose}>
      <div className="blockDialog__wrap" onClick={stopPropagation}>
        <div className="header">
          <svg
            width="15"
            height="20"
            viewBox="0 0 20 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClose}
          >
            <path
              d="M19.45 3.45L16.5 0.5L0 17L16.5 33.5L19.45 30.55L5.9 17L19.45 3.45Z"
              fill="black"
            />
          </svg>
          <p>
            {step === 2 && `${name}님을 ${isBlocked ? '차단 해제 ' : '차단'}하시겠어요?`}
            {step === 3 && `${name}님을 ${isBlocked ? '차단 해제 ' : '차단'}했습니다`}
          </p>
        </div>
        <div className="content">
          {step === 1 && <div onClick={onClickBlockProc}>차단</div>}
          {step === 2 && (
            <>
              {' '}
              <div>
                {isBlocked ? (
                  <>
                    <p>상대방은 회원님의 게시글과 프로필을 </p>
                    <p>볼 수 있습니다. </p>
                    <p>또한 상대방에게는 회원님이 </p>
                    <p>차단 해제 했다는 사실을 알리지 않습니다 </p>
                  </>
                ) : (
                  <>
                    <p>상대방은 회원님의 게시글과 프로필을 </p>
                    <p>찾을 수 없습니다. </p>
                    <p>또한 상대방에게는 회원님이 </p>
                    <p>차단했다는 사실을 알리지 않습니다 </p>
                  </>
                )}
              </div>
              <button
                className="confirm"
                type="button"
                onClick={isBlocked ? onClickUnBlock : onClickBlock}
              >
                {isBlocked ? '차단 해제' : '차단'}
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <p>
                  {isBlocked
                    ? '언제든지 차단 할 수있습니다'
                    : '언제든지 차단을 해제 할 수 있습니다.'}
                </p>
              </div>
              <button className="confirm" type="button" onClick={onClose}>
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockDialog;
