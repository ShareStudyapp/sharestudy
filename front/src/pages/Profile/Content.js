import React, { useState } from 'react';
import Calendar from '../../components/Calendar';

const Content = () => {
  const [type, setType] = useState('day');
  const [date, setDate] = useState(new Date());
  return (
    <div className="content">
      <ul className="tab">
        <li className={type === 'day' ? 'active' : ''} onClick={() => setType('day')}>
          일별보기
        </li>
        <li className={type === 'month' ? 'active' : ''} onClick={() => setType('month')}>
          월별보기
        </li>
      </ul>
      {
        //TODO
        /* <div></div> */
      }
      <div className="monthWrapper">
        <div className="month">
          <Calendar date={date} setDate={setDate} />
        </div>
      </div>
    </div>
  );
};

export default Content;
