import React, { useCallback, useState } from 'react';
import Content from '../Content';
import TodoDialog from './TodoDialog';
import './styles.scss';

const TodoList = ({ todoList }) => {
  const [showDialog, setShowDialog] = useState(false);

  const onCreate = useCallback(() => {
    setShowDialog(true);
  }, []);

  const onClose = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <>
      <Content title="To do list" onCreate={onCreate}>
        {todoList?.length > 0 ? (
          todoList.map((todo) => (
            <div className="todo" key={todo.id}>
              <div className="todo__icon">
                {todo.checked === 'R' ? (
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
      </Content>
      {showDialog && <TodoDialog onClose={onClose} />}
    </>
  );
};

export default TodoList;
