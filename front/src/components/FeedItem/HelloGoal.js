import React from 'react';
import './styles.scss';
import ProgressBar from '../ProgressBar';

const HelloGoal = () => {
  return (
    <>
    <div className="HelloGoal">
      <div className="FeedIntroMsg">
        <p>
          안녕하세요 USER님, <br />
          <strong className="hightligter">오늘 목표한 스터디</strong>를<br />
          달성해보세요!
        </p>
      </div>

      <ProgressBar />
    </div>
    </>
  );
};

export default HelloGoal;