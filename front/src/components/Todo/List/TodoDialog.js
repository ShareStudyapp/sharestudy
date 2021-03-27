import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import {
  ADD_TODO_INIT,
  ADD_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  DELETE_TODO_INIT,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_INIT
} from '../../../reducers/todo';
import { TimePicker } from 'antd';

const TodoDialog = ({ todo, date, onClose }) => {
  const dispatch = useDispatch();
  const {
    addTodoDone,
    addTodoError,
    deleteTodoDone,
    deleteTodoError,
    updateTodoDone,
    updateTodoError
  } = useSelector((state) => state.todoReducer);
  const [checked, setChecked] = useState(todo?.checked ? todo.checked : 'R');
  const [times, setTimes] = useState([
    todo?.startTime ? todo.startTime : '00:00',
    todo?.endTime ? todo.endTime : '00:00'
  ]);
  const [title, onChangeTitle] = useInput(todo?.todoTitle ? todo.todoTitle : '');
  const [content, onChangeContent] = useInput(todo?.todoContent ? todo.todoContent : '');

  useEffect(() => {
    if (addTodoError || addTodoDone) {
      if (addTodoError) {
        alert('에러가 발생했습니다.');
      } else if (addTodoDone) {
        alert('저장되었습니다.');
        onClose();
      }
      dispatch({
        type: ADD_TODO_INIT
      });
    }
  }, [addTodoDone, addTodoError, onClose, dispatch]);

  useEffect(() => {
    if (deleteTodoError || deleteTodoDone) {
      if (deleteTodoError) {
        alert('에러가 발생했습니다.');
      } else if (deleteTodoDone) {
        alert('저장되었습니다.');
        onClose();
      }
      dispatch({
        type: DELETE_TODO_INIT
      });
    }
  }, [deleteTodoDone, deleteTodoError, onClose, dispatch]);

  useEffect(() => {
    if (updateTodoError || updateTodoDone) {
      if (updateTodoError) {
        alert('에러가 발생했습니다.');
      } else if (updateTodoDone) {
        alert('저장되었습니다.');
        onClose();
      }
      dispatch({
        type: UPDATE_TODO_INIT
      });
    }
  }, [updateTodoDone, updateTodoError, onClose, dispatch]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onClickChecked = useCallback((e) => {
    setChecked(e.currentTarget.dataset.checked);
  }, []);

  const onChangeTime = useCallback((timeArr, timeStringArr) => {
    setTimes(timeStringArr);
  }, []);

  const onDelete = useCallback(() => {
    if (window.confirm('삭제 하시겠습니까?')) {
      dispatch({
        type: DELETE_TODO_REQUEST,
        data: todo.id
      });
    }
  }, [todo, dispatch]);

  const onSubmit = useCallback(() => {
    if (todo) {
      dispatch({
        type: UPDATE_TODO_REQUEST,
        data: {
          id: todo.id,
          savedDate: date.format('YYYYMMDD'),
          todoTitle: title,
          todoContent: content,
          checked: checked,
          startTime: times[0],
          endTime: times[1]
        }
      });
    } else {
      dispatch({
        type: ADD_TODO_REQUEST,
        data: {
          savedDate: date.format('YYYYMMDD'),
          todoTitle: title,
          todoContent: content,
          checked: checked,
          startTime: times[0],
          endTime: times[1]
        }
      });
    }
  }, [todo, checked, times, title, content, date, dispatch]);

  return (
    <div className="Dialog" onClick={onClose}>
      <div className="Dialog__wrap" onClick={stopPropagation}>
        <section className="Dialog__wrap_top">
          <h3>{date.format('YY.MM.DD')}</h3>
          <TimePicker.RangePicker
            bordered={false}
            allowClear={false}
            format="HH:mm"
            size="small"
            suffixIcon={null}
            onChange={onChangeTime}
            placeholder={times}
          />
        </section>
        <section className="Dialog__wrap_middle">
          <aside className="status">
            <button
              className={checked === 'R' ? 'active' : ''}
              data-checked="R"
              onClick={onClickChecked}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.30885 6.5075L12.5303 10.7289L11.0241 12.2351L6.80272 8.01364L2.4328 12.3836L0.905447 10.8562L5.27537 6.48629L1.05394 2.26486L2.56008 0.758727L6.7815 4.98015L11.1726 0.589021L12.7 2.11637L8.30885 6.5075Z"
                  fill="#A9A9A9"
                />
              </svg>
            </button>
            <button
              className={checked === 'P' ? 'active' : ''}
              data-checked="P"
              onClick={onClickChecked}
            >
              <svg
                width="29"
                height="18"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.34128 23.0996L14.5996 3.59961L25.8579 23.0996H3.34128Z"
                  stroke="#34A300"
                  strokeWidth="3"
                />
              </svg>
            </button>
            <button
              className={checked === 'C' ? 'active' : ''}
              data-checked="C"
              onClick={onClickChecked}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6.28L7.2 12L14 1" stroke="#2656FF" strokeWidth="3" />
              </svg>
            </button>
          </aside>
          <article className="content">
            <input value={title} onChange={onChangeTitle} />
            <textarea value={content} onChange={onChangeContent} />
          </article>
        </section>
        <section className="Dialog__wrap_bottom">
          {todo ? (
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

export default TodoDialog;
