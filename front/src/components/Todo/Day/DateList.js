import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './styles.scss';

const DayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateList = ({ date, setDate }) => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    const nowDate = dayjs(date);
    const newDate = nowDate.subtract(5, 'd');
    const dayArr = [];
    for (let i = 1; i < 10; i++) {
      const date = newDate.add(i, 'd');
      if (nowDate.toString() === date.toString()) {
        dayArr.push({
          select: true,
          date: date,
          num: date.format('DD'),
          name: DayOfWeek[date.day()]
        });
      } else {
        dayArr.push({
          select: false,
          date: date.toDate(),
          num: date.format('DD'),
          name: DayOfWeek[date.day()]
        });
      }
    }
    setDays(dayArr);
  }, [date]);

  const onClickDay = useCallback(
    (e) => {
      setDate(days[e.currentTarget.dataset.idx]?.date);
    },
    [setDate, days]
  );

  return (
    <div className="date-list">
      {days.map((day, idx) => {
        let classNm = 'item';
        if (day.select) {
          classNm += ' active';
        } else {
          if (day.name === 'Sat') {
            classNm += ' sat';
          }

          if (day.name === 'Sun') {
            classNm += ' sun';
          }
        }

        return (
          <div key={day.num} className={classNm} onClick={onClickDay} data-idx={idx}>
            <div>
              <span>{day.num}</span>
            </div>
            <p>{day.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DateList;
