import React, { useCallback, useEffect, useState } from 'react';
import { List, Comment, Day } from '../../components/Todo';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import './styles.scss';

const Todo = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Header />
      <section className="container">
        <article>
          <strong className="hightligter">채윤님의 To do</strong>
          <Day date={date} setDate={setDate} />
        </article>
        <List />
        <Comment />
      </section>
      <BottomNav />
    </>
  );
};

export default Todo;
