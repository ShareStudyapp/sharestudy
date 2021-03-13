import React, { useState } from 'react';
import { List, Comment, Day } from '../../components/Todo';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import './styles.scss';
import '../../modules';
import axios from 'axios';

const Todo = () => {
  const [date, setDate] = useState(new Date());
  axios.get('adb');
  //비로그인시 화면 필요
  //사용자 정보에서 추출해오기로 수정필요
  const nickname = '채윤';
  const commentList = [
    {
      id: 1,
      title: '야나두......!',
      content: '오늘 할당량 끝내기! 못끝내면,, 내일 2배 이상으로 공부량 늘리기'
    },
    {
      id: 2,
      title: '야나두......!',
      content: '오늘 할당량 끝내기! 못끝내면,, 내일 2배 이상으로 공부량 늘리기'
    }
  ];

  const todoList = [
    { id: 1, title: '한국사', content: '1단원 ~ 5단원', isDone: false },
    { id: 2, title: '토익', content: '토익 RC 1챕터 / 오답체크', isDone: true }
  ];
  return (
    <>
      <Header />
      <section className="container">
        <article>
          <strong className="hightligter">{nickname}님의 To do</strong>
          <Day date={date} setDate={setDate} />
        </article>
        <List todoList={todoList} />
        <Comment commentList={commentList} />
      </section>
      <BottomNav />
    </>
  );
};

export default Todo;
