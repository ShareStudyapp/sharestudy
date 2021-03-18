import React, { useState, useCallback, useEffect } from 'react';
import CalendarDialog from './CalendarDialog';
import DateList from './DateList';
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
        <button onClick={onClickCalendar}>
          <svg
            width="10"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6767 8.23325L14.6767 6.67672L8.5058 6.67672L8.5058 0.505803L6.94928 0.505803L6.94928 6.67672L0.778359 6.67672L0.778359 8.23325L6.94928 8.23325V14.4042H8.5058L8.5058 8.23325L14.6767 8.23325Z"
              fill="black"
            />
          </svg>
          날짜 수정
        </button>
        <DateList date={date} setDate={setDate} />
      </div>
      {showCalendar && <CalendarDialog date={date} setDate={setDate} onClose={onCloseCalendar} />}
    </>
  );
};

export default Day;
