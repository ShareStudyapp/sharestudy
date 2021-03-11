import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';
import dayjs from 'dayjs';

const DayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SlideCalender = () => {
  const [nowDate, setNowDate] = useState(dayjs());
  const [days, setDays] = useState([]);
  useEffect(() => {
    console.log(nowDate.format('YYYY-MM-DD'), 'callEffect');
    const newDate = nowDate.subtract(5, 'd');
    console.log(newDate.format('YYYY-MM-DD'), 'newDate');
    const dayArr = [];
    for (let i = 1; i < 10; i++) {
      const date = newDate.add(i, 'd');
      dayArr.push({ date: date, num: date.format('DD'), name: DayOfWeek[date.day()] });
    }
    console.log(dayArr);
    setDays(dayArr);
  }, [nowDate]);

  const settings = {
    className: 'center',
    focusOnSelect: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    //centerPadding: '50px',
    initialSlide: 4,
    slidesToShow: 9,
    centerPadding: '60px',
    //slidesToScroll: 1,
    centerMode: true,
    swipe: true,
    //variableWidth: true,
    beforeChange: (oldIndex, newIndex) => {
      console.log(days[newIndex], 'calls');
      setNowDate(days[newIndex].date);
    },
    onSwipe: () => {
      console.log('calls');
    },
    swipeToSlide: true
  };
  return (
    <div style={{ width: 400, marginTop: 20 }}>
      <Slider {...settings}>
        {days.map((day) => (
          <div key={day.num} className="item">
            <div>
              <span>{day.num}</span>
            </div>
            <p>
              {/* {day.name} */}
              {day.date.format('MMDD')}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideCalender;
