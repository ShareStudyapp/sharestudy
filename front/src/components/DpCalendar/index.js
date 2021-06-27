import React from 'react';
import Calendar from '../Calendar';
import './styles.scss';

const DpCalendar = ({ date, onSetDate, renderDay, onMonthChange }) => {
  const options = {};
  if (onMonthChange) {
    options.onMonthChange = onMonthChange;
  }

  return (
    <div className="dp-calendar">
      <Calendar date={date} setDate={onSetDate} renderDay={renderDay} {...options} />
    </div>
  );
};

export default DpCalendar;
