import React,{useState,useEffect} from 'react'
import CalanderList from '../../components/MyTodoList/CalendarList';
import AddSubject from '../../components/MyTodoList/AddSubject';
import MainLogo from '../../components/Common/MainLogo';
import MainNav from '../../components/Common/MainNav';
import axios from 'axios';

function MyTodoList() {
    const week = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
    const [date,setDate] = useState(new Date())
    const [today,setToday] = useState(date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate()+" "+week[date.getDay()]);
    const [colourOptions,setColourOptions] = useState([]);
    const [colorLoading,setcolorLoading] = useState(false);
    useEffect(() => {
        setcolorLoading(false)
        axios.get('/todo/color')
        .then((res)=>{
            console.log(res.data)
            setColourOptions(res.data);
            setcolorLoading(true);
        })
    }, [])
    return (
        <div>
            <MainLogo />
                Todolist
                <CalanderList today={today} setToday={setToday} date={date} setDate={setDate} week={week}/>
                {colorLoading?<AddSubject today={today} colourOptions={colourOptions} />:''}
            <MainNav />
        </div>
    )
}

export default MyTodoList
