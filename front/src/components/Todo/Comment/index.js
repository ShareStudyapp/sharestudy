import React, { useState, useCallback } from 'react';
import Content from '../Content';
import CommentDialog from './CommentDialog';
import './styles.scss';

const TodoComment = ({ date, comment }) => {
  const [showDialog, setShowDialog] = useState(false);

  const onCreate = useCallback(() => {
    setShowDialog(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const onUpdate = useCallback(() => {
    if (comment) {
      setShowDialog(true);
      document.body.style.overflow = 'hidden';
    }
  }, [comment]);

  const onClose = useCallback(() => {
    setShowDialog(false);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <>
      <Content title="Today's comment" useBtn={comment ? false : true} onCreate={onCreate}>
        <div className="todo-comment" onClick={onUpdate}>
          <div className="todo-comment__icon">
            <svg
              width="63"
              height="50"
              viewBox="0 0 63 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.655 42.6514C49.655 42.6514 50.5195 46.8096 53.9777 48.4729C53.9777 48.4729 49.655 50.1362 44.4678 45.1463L42.7474 45.8033C39.272 46.8678 35.4767 47.45 31.4998 47.45C14.7884 47.45 1.24121 37.1127 1.24121 24.3554C1.24121 11.598 14.7884 1.26074 31.4998 1.26074C48.2112 1.26074 61.7585 11.598 61.7585 24.3554C61.7585 31.7902 59.3983 36.7634 52.2486 40.9881L49.655 42.6514Z"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.6041 27.8378C18.3491 27.8378 19.7638 26.4588 19.7638 24.7578C19.7638 23.0567 18.3491 21.6777 16.6041 21.6777C14.859 21.6777 13.4443 23.0567 13.4443 24.7578C13.4443 26.4588 14.859 27.8378 16.6041 27.8378Z"
                fill="black"
              />
              <path
                d="M31.9512 27.8378C33.6963 27.8378 35.1109 26.4588 35.1109 24.7578C35.1109 23.0567 33.6963 21.6777 31.9512 21.6777C30.2062 21.6777 28.7915 23.0567 28.7915 24.7578C28.7915 26.4588 30.2062 27.8378 31.9512 27.8378Z"
                fill="black"
              />
              <path
                d="M47.2989 27.8378C49.044 27.8378 50.4586 26.4588 50.4586 24.7578C50.4586 23.0567 49.044 21.6777 47.2989 21.6777C45.5538 21.6777 44.1392 23.0567 44.1392 24.7578C44.1392 26.4588 45.5538 27.8378 47.2989 27.8378Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={`todo-comment__content ${comment ? '' : 'none'}`}>
            {comment ? (
              <>
                <p className="todo-comment__content_title">{comment.title}</p>
                <p className="todo-comment__content_desc">{comment.content}</p>
              </>
            ) : (
              <p className="todo-comment__content_title">오늘의 다짐을 입력해 보세요.</p>
            )}
          </div>
        </div>
      </Content>
      {showDialog && <CommentDialog date={date} onClose={onClose} comment={comment} />}
    </>
  );
};

export default TodoComment;
