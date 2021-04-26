import React from 'react';
import './styles.scss';

const TodoConent = ({ title, onCreate, useBtn = true, children }) => {
  return (
    <div className="todo-content">
      <header>{title}</header>
      <div className="todo-group">
        <section>
          <article>{children}</article>
        </section>
        <aside>
          {useBtn && (
            <svg
              onClick={onCreate}
              width="25"
              height="25"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="25" fill="#2656FF" />
              <path
                d="M25.9231 24.42H32.8881V26.905H25.9231V34.115H23.4031V26.905H16.4381V24.42H23.4031V17.175H25.9231V24.42Z"
                fill="white"
              />
            </svg>
          )}

          {/* <button>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1.00012L4.92857 4.57155L8.85714 1.00012" stroke="white" strokeWidth="2" />
            </svg>
          </button> */}
        </aside>
      </div>
    </div>
  );
};

export default TodoConent;
