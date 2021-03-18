import React, { useEffect, useState } from 'react';
import { List, Comment, Progress, Day } from '../../components/Todo';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { LOAD_PLAN_REQUEST } from '../../reducers/todolist';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import './styles.scss';
import '../../modules';

const Todo = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const { userInfo, userinfoError } = useSelector((state) => state.userReducer);
  const { mainTodolist } = useSelector((state) => state.todolistReducer);
  useEffect(() => {
    dispatch({
      type: LOAD_PLAN_REQUEST,
      data: dayjs(date).format('YYYYMMDD')
    });
  }, [date, dispatch]);

  // const commentList = [
  //   {
  //     id: 1,
  //     title: '야나두......!',
  //     content: '오늘 할당량 끝내기! 못끝내면,, 내일 2배 이상으로 공부량 늘리기'
  //   },
  //   {
  //     id: 2,
  //     title: '야나두......!',
  //     content: '오늘 할당량 끝내기! 못끝내면,, 내일 2배 이상으로 공부량 늘리기'
  //   }
  // ];

  // const todoList = [
  //   { id: 1, title: '한국사', content: '1단원 ~ 5단원', isDone: false },
  //   { id: 2, title: '토익', content: '토익 RC 1챕터 / 오답체크', isDone: true }
  // ];

  //비로그인시 redirect
  if (!window.sessionStorage.getItem('user') || userinfoError) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      {userInfo && (
        <>
          <Header />
          <section className="container">
            <article>
              <strong className="hightligter">{userInfo.nickname}님의 To do</strong>
              <Day date={date} setDate={setDate} />
            </article>
            <Progress date={dayjs(date)} />
            <List todoList={mainTodolist.todoList} />
            <Comment comment={mainTodolist.todoComment} />
          </section>
          <BottomNav />
        </>
      )}
    </>
  );
};

export default Todo;
