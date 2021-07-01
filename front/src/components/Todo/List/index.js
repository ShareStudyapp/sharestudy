import React, { useCallback, useEffect, useState } from 'react';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Content from '../Content';
import TodoDialog from './TodoDialog';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_TODO_REQUEST, DELETE_TODO_INIT } from '../../../reducers/todo';
import './styles.scss';

const TodoList = ({ date, todoList, fetchTodo }) => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [todo, setTodo] = useState(null);
  const [swipeState, setSwipeState] = useState(false);
  const { deleteTodoDone, deleteTodoError } = useSelector((state) => state.todoReducer);

  useEffect(() => {
    dispatch({
      type: DELETE_TODO_INIT
    });
  }, [deleteTodoDone, deleteTodoError]);

  const onCreate = useCallback(() => {
    setTodo(null);
    setShowDialog(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const onClose = useCallback(() => {
    setTodo(null);
    setShowDialog(false);
    document.body.style.overflow = 'unset';

    fetchTodo();
  }, [fetchTodo]);

  const onUpdate = useCallback(
    (todo) => {
      return () => {
        if (!swipeState) {
          setTodo(todo);
          setShowDialog(true);
          document.body.style.overflow = 'hidden';
        } else {
          setSwipeState(false);
        }
      };
    },
    [swipeState]
  );

  const removeTodo = (id) => {
    dispatch({
      type: DELETE_TODO_REQUEST,
      data: id
    });
  };

  return (
    <>
      {todoList?.length > 0 ? (
        <Content title="To do list" onCreate={onCreate}>
          <SwipeableList threshold={0.85}>
            {todoList?.length > 0 ? (
              todoList.map((todo) => (
                <SwipeableListItem
                  key={todo.id}
                  swipeRight={{
                    content: (
                      <div style={{ width: '100%', height: '100%', verticalAlign: 'middle' }}>
                        <DeleteOutlined
                          style={{ fontSize: '1.5rem', lineHeight: 'inherit', color: '#2656FF' }}
                        />
                      </div>
                    ),
                    action: () => {
                      removeTodo(todo.id);
                    }
                  }}
                  onSwipeStart={() => {
                    setSwipeState(true);
                  }}
                >
                  <div onClick={onUpdate(todo)}>
                    <div className="todo">
                      <div className="todo__icon">
                        {todo.checked === 'R' ? (
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
                        ) : todo.checked === 'C' ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 6.28L7.2 12L14 1" stroke="#2656FF" strokeWidth="3" />
                          </svg>
                        ) : (
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
                        )}
                      </div>
                      <div className="todo__content">
                        <div>
                          <p className="todo__content_time">
                            {todo.startTime} - {todo.endTime}
                          </p>
                          <p className="todo__content_title">{todo.todoTitle}</p>
                        </div>
                        <div className="todo__content_desc">{todo.todoContent}</div>
                      </div>
                    </div>
                  </div>
                </SwipeableListItem>
              ))
            ) : (
              <div className="todo">
                <div className="todo__icon">
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
                </div>
                <div className="todo__content none">
                  <p className="todo__content_title">공부 계획이 없어요.</p>
                </div>
              </div>
            )}
          </SwipeableList>
        </Content>
      ) : (
        <div
          style={{
            borderRadius: 20,
            backgroundColor: '#2656ff',
            marginBottom: 30,
            lineHeight: '4rem',
            width: '100%',
            height: '4rem',
            textAlign: 'center',
            color: 'white',
            fontSize: '1rem'
          }}
          onClick={onCreate}
        >
          여기를 클릭해 오늘의 공부 계획을 작성 해 주세요 :)
        </div>
      )}

      {showDialog && <TodoDialog todo={todo} date={date} onClose={onClose} />}
    </>
  );
};

export default TodoList;
