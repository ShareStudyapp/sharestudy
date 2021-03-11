import React from 'react';
import Content from '../Content';
import './styles.scss';

const TodoComment = () => {
  return (
    <Content title="To do list">
      {commentList.map((todo) => (
        <div className="comment">
          <p>{todo.title}</p>
          <p>{todo.content}</p>
        </div>
      ))}
    </Content>
  );
};

export default TodoComment;

const commentList = [
  {
    title: '야나두......!',
    content: '오늘 할당량 끝내기! 못끝내면,, 내일 2배 이상으로 공부량 늘리기'
  },
  {
    title: '야나두......!',
    content: '오늘 할당량 끝내기! 못끝내면,, 내일 2배 이상으로 공부량 늘리기'
  }
];
