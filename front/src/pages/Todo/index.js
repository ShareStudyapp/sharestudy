import React, { useCallback, useEffect, useState } from 'react';
import { List, Comment, Progress, Day } from '../../components/Todo';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import DpCalendar from '../../components/DpCalendar';
import { LOAD_TODO_REQUEST } from '../../reducers/todo';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import './styles.scss';

const fetchMonthData = async (id, monthStr) => {
  const result = { error: false, message: '' };
  try {
    const { data } = await axios.get(`/todo/${id}/monthly/achievement/${monthStr}`);
    result.data = data;
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const Todo = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const { userInfo, userinfoError } = useSelector((state) => state.userReducer);
  const { todo } = useSelector((state) => state.todoReducer);
  const [monthData, setMonthData] = useState({});
  const [monthStr, setMonthStr] = useState(dayjs(date).format('YYYYMM'));

  const onSetDate = useCallback(
    (date) => {
      const changeMonthStr = dayjs(date).format('YYYYMM');
      if (monthStr !== changeMonthStr) {
        setMonthStr(changeMonthStr);
      }
      setDate(date);
    },
    [monthStr]
  );

  const renderDay = (day) => {
    const dateStr = dayjs(day).format('YYYYMMDD');
    let dateStyle = {
      borderRadius: '50%'
    };

    if (dateStr !== dayjs(date).format('YYYYMMDD') && monthData && monthData[dateStr]) {
      dateStyle.background = `conic-gradient(rgba(38, 86, 255, 0.5) 0% ${
        monthData[dateStr]
      }%,#E4E4E4 ${monthData[dateStr] - 1}% 100%)`;
    }

    return (
      <div className="customCell" style={dateStyle}>
        <div className="customDate">{day.getDate()}</div>
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getMonthData() {
      let { data: monthData } = await fetchMonthData(userInfo.id, monthStr);
      setMonthData(monthData);
    }
    getMonthData();
  }, [userInfo, monthStr]);

  const fetchTodo = useCallback(() => {
    dispatch({
      type: LOAD_TODO_REQUEST,
      data: dayjs(date).format('YYYYMMDD')
    });
  }, [date, dispatch]);

  useEffect(() => {
    fetchTodo();
  }, [date, dispatch, fetchTodo]);

  //비로그인시 redirect
  if (!window.localStorage.getItem('user') || userinfoError) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: '/todo'
          }
        }}
      />
    );
  }
  return (
    <>
      {userInfo && (
        <>
          <Header />
          <section id="todo-container" className="todo-container">
            <article>
              <strong className="hightligter" style={{ marginBottom: '20px' }}>
                {userInfo.nickname}님의 To do
              </strong>
              <Day date={date} setDate={onSetDate} />
            </article>
            <Progress
              date={dayjs(date)}
              percent={
                todo?.todoList?.length > 0 ? (todo.completeRatioCnt / todo.allRatioCnt) * 100 : 0
              }
            />
            <List date={dayjs(date)} todoList={todo.todoList} fetchTodo={fetchTodo} />
            <Comment date={dayjs(date)} comment={todo.todoComment} />

            <DpCalendar
              date={date}
              onSetDate={onSetDate}
              renderDay={renderDay}
              onMonthChange={onSetDate}
            />
          </section>

          <BottomNav />
        </>
      )}
    </>
  );
};

export default Todo;
