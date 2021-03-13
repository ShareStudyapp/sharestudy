import React, { useMemo } from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ko';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function Calendar({ date, setDate }) {
  const modifiers = useMemo(
    () => ({
      selectDay: date
    }),
    [date]
  );
  const modifiersStyles = {
    selectDay: {
      color: '#2656ff',
      backgroundColor: '#fff'
    },
    today: {
      color: '#999999'
    }
  };
  const onDayClick = (date) => {
    setDate(date);
  };

  return (
    <DayPicker
      onDayClick={onDayClick}
      localeUtils={MomentLocaleUtils}
      locale="ko"
      selectedDays={date}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
    />
  );
}

export default Calendar;
