import React from 'react';
import './styles.scss';

const TodoConent = ({ title, onCreate, onDelete, children }) => {
  return (
    <div className="todo-content">
      <header>{title}</header>
      <div className="todo-group">
        <section>
          <article>{children}</article>
        </section>
        <aside>
          <button onClick={onCreate}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.6532 3.818H9.1272V5.492H5.6532V9.002H3.9612V5.492H0.505196V3.818H3.9612V0.272H5.6532V3.818Z"
                fill="white"
              />
            </svg>
          </button>
          <button>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1.00012L4.92857 4.57155L8.85714 1.00012" stroke="white" strokeWidth="2" />
            </svg>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default TodoConent;
