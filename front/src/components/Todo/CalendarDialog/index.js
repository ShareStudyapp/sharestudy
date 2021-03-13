import React from 'react';
import Calendar from '../../Calendar';
import './styles.scss';

const CalendarDialog = ({ date, setDate }) => {
  return (
    <>
      <div className="background"></div>
      <div className="Dialog">
        <div className="Dialog-wrap">
          <Calendar date={date} setDate={setDate} />
        </div>
      </div>
    </>
  );
};

export default CalendarDialog;
