import React,{useState} from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { useDispatch } from 'react-redux';
import { LOAD_PLAN_REQUEST } from '../../reducers/todolist';

function Calender({defaultCalenderValue}) {
    const dispatch = useDispatch();
    let today = new Date();   
    
    const defaultValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      };
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const onClickDate = () =>{
        
        const CalenderDate=selectedDay.year+""+selectedDay.month+""+selectedDay.day
        const nowCalenderDate =defaultCalenderValue.year+""+defaultCalenderValue.month+""+defaultCalenderValue.day
        
        dispatch({
            type: LOAD_PLAN_REQUEST,
            data: CalenderDate
          });
    }
    return (
        <div onClick={onClickDate}>
            <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                shouldHighlightWeekends
                // renderFooter={() => (
                //     <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                //       <button
                //         type="button"
                //         onClick={() => {
                //             const CalenderDate=selectedDay.year+""+selectedDay.month+""+selectedDay.day
                //             console.log(CalenderDate);
                //         }}
                //         style={{
                //           border: '#0fbcf9',
                //           color: '#fff',
                //           backgroundColor:'blue',
                //           borderRadius: '0.5rem',
                //           padding: '1rem 2rem',
                //         }}
                //       >
                //         선택
                //       </button>
                //     </div>
                //   )}
            />
        </div>
    )
}

export default Calender;
