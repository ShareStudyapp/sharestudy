import React from 'react';
import Content from '../Content';
import './styles.scss';

const TodoComment = ({ commentList }) => {
  return (
    <Content title="Today's comment">
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div className="comment" key={comment.id}>
            <p>{comment.title}</p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <div className="comment">
          <p>오늘의 다짐을 입력해 보세요.</p>
        </div>
      )}
    </Content>
  );
};

export default TodoComment;
