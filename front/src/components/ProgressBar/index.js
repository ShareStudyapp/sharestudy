import React from 'react';
import './styles.scss';

const ProgressBar = () => {
  return (
    <>
    <div className="ProgressBar">
      <p className="ProgressBar-date">21.03.05</p>
      <h1 className="ProgressBar-title">오늘의 달성도</h1>

      {/* ProgressBar 진행막대기 */}
      <div className="ProgressBar-wrap">
        <p className="ProgressBar-wrap-status"></p>
      </div>
    </div>
    </>
  );
};

export default ProgressBar;