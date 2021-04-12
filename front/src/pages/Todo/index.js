import React, { useCallback, useEffect, useState } from 'react';
import { List, Comment, Progress, Day } from '../../components/Todo';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { LOAD_TODO_REQUEST } from '../../reducers/todo';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import './styles.scss';

const Todo = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const { userInfo, userinfoError } = useSelector((state) => state.userReducer);
  const { todo } = useSelector((state) => state.todoReducer);

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
  if (!window.sessionStorage.getItem('user') || userinfoError) {
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
          <section className="todo-container">
            <article>
              <strong className="hightligter">{userInfo.nickname}님의 To do</strong>
              <Day date={date} setDate={setDate} />
            </article>
            <Progress
              date={dayjs(date)}
              percent={
                todo?.todoList?.length > 0
                  ? (todo.completeRatioCnt / todo.allRatioCnt) * 100 + '%'
                  : '0%'
              }
            />
            <List date={dayjs(date)} todoList={todo.todoList} fetchTodo={fetchTodo} />
            <Comment date={dayjs(date)} comment={todo.todoComment} />
          </section>
          <BottomNav />
        </>
      )}
    </>
  );
};

export default Todo;
