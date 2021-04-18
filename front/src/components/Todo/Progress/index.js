import React from 'react';
import ProgressBar from '../../ProgressBar';
import './styles.scss';
const Progress = ({ date, percent }) => {
  return (
    <div className="todo_progress">
      <ProgressBar title="오늘의 달성도" date={date.format('YY.MM.DD')} percent={percent} />
    </div>
  );
};

export default Progress;
