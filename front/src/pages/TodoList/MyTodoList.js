import React,{useState,useEffect} from 'react'
import CalanderList from '../../components/MyTodoList/CalendarList';
import AddSubject from '../../components/MyTodoList/AddSubject';
import TodoList from '../../components/MyTodoList/TodoList';
import MainLogo from '../../components/Common/MainLogo';
import MainNav from '../../components/Common/MainNav';
import TodoTop from '../../components/MyTodoList/TodoTop';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { LOAD_PLAN_REQUEST,LOAD_TODO_COUNT_REQUEST } from '../../reducers/todolist';
import RequireLogin from '../../components/Common/RequireLogin';
function MyTodoList() {
    const dispatch = useDispatch();
    const { userInfo} = useSelector((state) => state.userReducer);
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
    useEffect(() => {
        
        dispatch({
            type: LOAD_PLAN_REQUEST,
            data: today
        });
        dispatch({
            type: LOAD_TODO_COUNT_REQUEST,
            data: today
        });
    }, [today])
    return (
        <div>
            <MainLogo />
            {userInfo.length != 0?
                <>
                    <TodoTop />
                    <CalanderList today={today} setToday={setToday} date={date} setDate={setDate} week={week}/>
                    {colorLoading?<AddSubject today={today} colourOptions={colourOptions} />:''}
                    <TodoList today={today}/>
                </>
            :<RequireLogin /> }
            <MainNav />
        </div>
    )
}

export default MyTodoList
