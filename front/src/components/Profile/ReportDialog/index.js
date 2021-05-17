import React, { useCallback, useState } from 'react';
import './styles.scss';

const reportList = [
  { id: '1', text: '게시판 성격에 부적절함' },
  { id: '2', text: '낚시/혐오/도배' },
  { id: '3', text: '상업적 광고 및 판매' },
  { id: '4', text: '욕설/비하' },
  { id: '5', text: '기타 사유' }
];

const ReportDialog = ({ onClose, id }) => {
  const [step, setStep] = useState(1);
  const [reportIdx, setReportIdx] = useState('');
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onClickReport = useCallback(() => {
    setStep(2);
  }, [setStep]);

  const onClickReportType = useCallback(
    (idx) => () => {
      setStep(3);
      setReportIdx(idx);
    },
    [setStep]
  );

  const onClickConfirm = useCallback(() => {
    console.log(id, reportList[reportIdx]);
    onClose();
  }, [reportIdx]);

  return (
    <div className="reportDialog" onClick={onClose}>
      <div className="reportDialog__wrap" onClick={stopPropagation}>
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
        </div>
        <div className="content">
          {step === 1 && <div onClick={onClickReport}>신고</div>}
          {step === 2 &&
            reportList.map((report, i) => (
              <div key={report.id} onClick={onClickReportType(i)}>
                {report.text}
              </div>
            ))}
          {step === 3 && (
            <div className="content">
              <div>
                <h4>{reportList[reportIdx].text}</h4>
                <p>신고 후에는 신고 철회 및 수정이 불가능하니 다시 한 번 확인해 주세요.</p>
                <p>신고 사유에 맞지 않은 신고를 했을 경우 해당 신고는 처리되지 않습니다.</p>
              </div>
            </div>
          )}
        </div>
        {step === 3 && (
          <div className="button">
            <button className="cancel" type="button" onClick={onClose}>
              취소
            </button>
            <button className="confirm" type="button" onClick={onClickConfirm}>
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDialog;
