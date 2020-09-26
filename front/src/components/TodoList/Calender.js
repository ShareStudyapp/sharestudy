import React,{useState} from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

function Calender() {
    let today = new Date();   
    
    const defaultValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      };
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    return (
        <div>
            <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                shouldHighlightWeekends
            />
        </div>
    )
}

export default Calender;
