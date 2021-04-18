import React from 'react';
import './styles.scss';

const ProgressBar = ({ title, date, percent }) => {
  return (
    <>
      <div className="ProgressBar">
        {date && <p className="ProgressBar-date">{date}</p>}
        <h1 className="ProgressBar-title">{title}</h1>

        {/* ProgressBar 진행막대기 */}
        <div className="ProgressBar-wrap">
          <p className="ProgressBar-wrap-status" style={{ width: percent + '%' }}></p>
        </div>

        {percent > 0 && <span style={{ marginLeft: percent - 2 + '%' }}>{percent}%</span>}
      </div>
    </>
  );
};

export default ProgressBar;
