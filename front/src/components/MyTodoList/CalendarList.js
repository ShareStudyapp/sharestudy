import React,{useState} from 'react'
import calanderButton from '../../assets/Button/calendar.png';
import calanderCancleButton from '../../assets/Button/calander_button.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarList.css';

function CalendarList() {
    const todayDate = new Date();   
    const year = todayDate.getFullYear(); // 년도
    const month = todayDate.getMonth() + 1;  // 월
    const minusdate = todayDate.getDate()-4;  // -4날짜
    const plusdate = todayDate.getDate()+4;  // +4날짜
    const prevStrip = new Date(year, month, minusdate);
    const nextStrip = new Date(year, month, plusdate);
    const daysOfYear = [];
    for (var d = prevStrip; d <= nextStrip; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(d.getDate());
    }

    const week = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
    const [date,setDate] = useState(new Date())
    
    const [today,setToday] = useState(date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate()+" "+week[date.getDay()]);
    
    const matchtoday = date.getDate()
    const [stripdate, setStripdate] = useState(daysOfYear);
    const [displayCalendar,serDispalyCalendar] = useState(false);
    const onChange = (date) => {
        setDate(date)
        const selectDate =date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate()+" "+week[date.getDay()];
        setToday(selectDate);
 
        caculateStripdate(date)
    }

    /*현재 날짜 기준으로 -4 +4 계산하는 스트립  */
    const caculateStripdate = (date) =>{
        const year = date.getFullYear(); // 년도
        const month = date.getMonth() + 1;  // 월
        const minusdate = date.getDate()-4;  // -4날짜
        const plusdate = date.getDate()+4;  // +4날짜
        const prevStrip = new Date(year, month, minusdate);
        const nextStrip = new Date(year, month, plusdate);
       
        var daysOfYear = [];
        for (var d = prevStrip; d <= nextStrip; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(d.getDate());
        }
        setStripdate(daysOfYear)
    }
    const display = () =>{
        serDispalyCalendar(!displayCalendar);
    }
    const striplist = stripdate.map(day => <li className={matchtoday===day?'active':''}>{day}</li>);
    return ( 
        <div>
            
            {/* <img src={calanderCancleButton} /> */}
           
            <div className="calendar_area">
                <div className="todayText">{today}</div>
                <div onClick={display}><img src={calanderButton} /></div>
            </div>
            {displayCalendar?<Calendar
                onChange={onChange}
                value={date}
            />:('')}
            <ul className="striplist">
                {striplist}
            </ul>
        </div>
    )
}

export default CalendarList
