import React, { useState, useCallback, useEffect } from 'react';
import CalendarDialog from './CalendarDialog';
import './styles.scss';

const Day = ({ date, setDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const onClickCalendar = useCallback(() => {
    setShowCalendar(true);
  }, []);

  const onCloseCalendar = useCallback(() => {
    setShowCalendar(false);
  }, []);

  useEffect(() => {
    setShowCalendar(false);
  }, [date]);

  return (
    <>
      <div className="day">
        <span>{date.toLocaleDateString()}</span>
        <svg
          onClick={onClickCalendar}
          width="20"
          height="20"
          viewBox="0 0 14 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.3333 2.12492H11.6666V0.708252H10.3333V2.12492H3.66665V0.708252H2.33331V2.12492H1.66665C0.933313 2.12492 0.333313 2.76242 0.333313 3.54158V14.8749C0.333313 15.6541 0.933313 16.2916 1.66665 16.2916H12.3333C13.0666 16.2916 13.6666 15.6541 13.6666 14.8749V3.54158C13.6666 2.76242 13.0666 2.12492 12.3333 2.12492ZM12.3333 14.8749H1.66665V5.66658H12.3333V14.8749Z"
            fill="black"
          />
        </svg>
      </div>
      {showCalendar && <CalendarDialog date={date} setDate={setDate} onClose={onCloseCalendar} />}
    </>
  );
};

export default Day;
