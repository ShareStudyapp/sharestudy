import React, { useCallback } from 'react';
import Calendar from '../../Calendar';
import './styles.scss';

const CalendarDialog = ({ date, onClose, setDate }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <div className="Dialog" onClick={onClose}>
      <div className="Dialog-wrap" onClick={stopPropagation}>
        <Calendar date={date} setDate={setDate} />
      </div>
    </div>
  );
};

export default CalendarDialog;
