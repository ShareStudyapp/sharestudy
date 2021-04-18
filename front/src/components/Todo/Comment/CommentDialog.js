import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import {
  ADD_TODO_COMMENT_INIT,
  ADD_TODO_COMMENT_REQUEST,
  DELETE_TODO_COMMENT_REQUEST,
  DELETE_TODO_COMMENT_INIT,
  UPDATE_TODO_COMMENT_INIT,
  UPDATE_TODO_COMMENT_REQUEST
} from '../../../reducers/todo';

const CommentDialog = ({ date, onClose, comment }) => {
  const dispatch = useDispatch();
  const {
    addTodoCommentDone,
    addTodoCommentError,
    updateTodoCommentDone,
    updateTodoCommentError,
    deleteTodoCommentDone,
    deleteTodoCommentError
  } = useSelector((state) => state.todoReducer);
  const [title, onChangeTitle] = useInput(comment?.title ? comment.title : '');
  const [content, onChangeContent] = useInput(comment?.content ? comment.content : '');

  useEffect(() => {
    if (addTodoCommentError || addTodoCommentDone) {
      if (addTodoCommentError) {
        alert('에러가 발생했습니다.');
      } else if (addTodoCommentDone) {
        alert('저장되었습니다.');
        onClose();
      }
      dispatch({
        type: ADD_TODO_COMMENT_INIT
      });
    }
  }, [addTodoCommentDone, addTodoCommentError, onClose, dispatch]);

  useEffect(() => {
    if (updateTodoCommentError || updateTodoCommentDone) {
      if (updateTodoCommentError) {
        alert('에러가 발생했습니다.');
      } else if (updateTodoCommentDone) {
        alert('저장되었습니다.');
        onClose();
      }
      dispatch({
        type: UPDATE_TODO_COMMENT_INIT
      });
    }
  }, [updateTodoCommentDone, updateTodoCommentError, onClose, dispatch]);

  useEffect(() => {
    if (deleteTodoCommentError || deleteTodoCommentDone) {
      if (deleteTodoCommentError) {
        alert('에러가 발생했습니다.');
      } else if (deleteTodoCommentDone) {
        alert('저장되었습니다.');
        onClose();
      }
      dispatch({
        type: DELETE_TODO_COMMENT_INIT
      });
    }
  }, [deleteTodoCommentDone, deleteTodoCommentError, onClose, dispatch]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onDelete = useCallback(() => {
    if (window.confirm('삭제 하시겠습니까?')) {
      dispatch({
        type: DELETE_TODO_COMMENT_REQUEST,
        data: comment.id
      });
    }
  }, [comment, dispatch]);

  const onSubmit = useCallback(() => {
    if (comment && comment.id > 0) {
      dispatch({
        type: UPDATE_TODO_COMMENT_REQUEST,
        data: {
          id: comment.id,
          savedDate: date.format('YYYYMMDD'),
          title: title,
          content: content
        }
      });
    } else {
      dispatch({
        type: ADD_TODO_COMMENT_REQUEST,
        data: {
          savedDate: date.format('YYYYMMDD'),
          title: title,
          content: content
        }
      });
    }
  }, [comment, title, content, date, dispatch]);

  return (
    <div className="commentDialog" onClick={onClose}>
      <div className="commentDialog__wrap" onClick={stopPropagation}>
        <section className="commentDialog__wrap_middle">
          <article className="content">
            <input value={title} onChange={onChangeTitle} />
            <textarea value={content} onChange={onChangeContent} />
          </article>
        </section>
        <section className="commentDialog__wrap_bottom">
          {comment && comment.id > 0 ? (
            <button className="left" onClick={onDelete}>
              삭제하기
            </button>
          ) : (
            <button className="left" onClick={onClose}>
              취소하기
            </button>
          )}

          <button className="right" onClick={onSubmit}>
            저장하기
          </button>
        </section>
      </div>
    </div>
  );
};

export default CommentDialog;
