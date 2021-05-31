import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BLOCK_USER_REQUEST,
  UNBLOCK_USER_REQUEST,
  CLEAR_UNBLOCK_USER,
  CLEAR_BLOCK_USER
} from '../../../reducers/user';
import './styles.scss';

const BlockDialog = ({ onClose, id, isBlocked, name, setBlockState }) => {
  const dispatch = useDispatch();
  const { blockUserDone, blockUserError, unblockUserDone, unblockUserError } = useSelector(
    (state) => state.userReducer
  );
  const [step, setStep] = useState(1);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onClickBlockProc = useCallback(() => {
    setStep(2);
  }, [setStep]);

  const onClickBlock = useCallback(() => {
    dispatch({
      type: isBlocked ? UNBLOCK_USER_REQUEST : BLOCK_USER_REQUEST,
      data: id
    });
  }, [id, isBlocked]);

  useEffect(() => {
    if (blockUserDone || blockUserError) {
      dispatch({
        type: CLEAR_BLOCK_USER
      });
    }
    if (blockUserDone) {
      setStep(3);
    }
    if (blockUserError) {
      alert(blockUserError);
    }
  }, [blockUserDone, blockUserError]);

  useEffect(() => {
    if (unblockUserDone || unblockUserError) {
      dispatch({
        type: CLEAR_UNBLOCK_USER
      });
    }
    if (unblockUserDone) {
      setStep(3);
    }
    if (unblockUserError) {
      alert(unblockUserError);
    }
  }, [unblockUserDone, unblockUserError]);

  const onClickBlockConfirm = useCallback(() => {
    setBlockState(!isBlocked);
    onClose();
  }, [setBlockState]);

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
              <button className="confirm" type="button" onClick={onClickBlock}>
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
              <button className="confirm" type="button" onClick={onClickBlockConfirm}>
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
