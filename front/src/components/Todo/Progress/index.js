import React from 'react';
import ProgressBar from '../../ProgressBar';
import './styles.scss';
const Progress = ({ date }) => {
  return (
    <div className="todo_progress">
      <ProgressBar date={date.format('YY.MM.DD')} />
    </div>
  );
};

export default Progress;
