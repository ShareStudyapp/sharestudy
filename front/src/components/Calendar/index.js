import React, { useCallback, useMemo, useState, useRef } from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ko';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './styles.scss';
import { render } from 'timeago.js';

function Calendar({ date, setDate, renderDay, onMonthChange }) {
  const [month, setMonth] = useState(date);

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
  const onDayClick = useCallback(
    (newDate) => {
      setDate(newDate);
    },
    [setDate]
  );

  const onDayChange = useCallback((newMonth) => {
    setMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  }, []);

  const option = {};
  if (renderDay) {
    option.renderDay = renderDay;
  }

  if (onMonthChange) {
    option.onMonthChange = onMonthChange;
  }
  return (
    <DayPicker
      onDayClick={onDayClick}
      localeUtils={MomentLocaleUtils}
      locale="ko"
      selectedDays={date}
      month={month}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      captionElement={({ date }) => <YearMonth date={date} onChange={onDayChange} />}
      style={{ lineHeight: 'none' }}
      {...option}
    />
  );
}

const months = MomentLocaleUtils.getMonths();
const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear - 100; i <= currentYear; i++) {
  years.push(i);
}

function YearMonth({ date, onChange }) {
  const yearEl = useRef(null);
  const monthEl = useRef(null);

  const handleChange = useCallback(() => {
    onChange(new Date(yearEl.current.value, monthEl.current.value));
  }, [onChange]);

  return (
    <div className="DayPicker-Caption">
      <select name="year" onChange={handleChange} value={date.getFullYear()} ref={yearEl}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>
      <select name="month" onChange={handleChange} value={date.getMonth()} ref={monthEl}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {i + 1}월
          </option>
        ))}
      </select>
    </div>
  );
}

export default Calendar;
