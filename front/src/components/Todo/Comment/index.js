import React from 'react';
import Content from '../Content';
import './styles.scss';

const TodoComment = () => {
  return (
    <Content title="To do list">
      {commentList.map((comment) => (
        <div className="comment" key={comment.id}>
          <p>{comment.title}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </Content>
  );
};

export default TodoComment;

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
