import React, { useCallback } from 'react';
import { TimePicker } from 'antd';

const TodoDialog = ({ onClose }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="Dialog" onClick={onClose}>
      <div className="Dialog__wrap" onClick={stopPropagation}>
        <section className="Dialog__wrap_top">
          <h3>21.04.14</h3>
          <TimePicker.RangePicker
            bordered={false}
            allowClear={false}
            format="HH:mm"
            size="small"
            suffixIcon={null}
            placeholder={['00:00', '00:00']}
          />
        </section>
        <section className="Dialog__wrap_middle">
          <aside className="status">
            <button>
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
            <button>
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
            <button>
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
          </aside>
          <article className="content">
            <input />
            <textarea />
          </article>
        </section>
        <section className="Dialog__wrap_bottom">
          <button className="left">취소하기</button>
          <button className="right">저장하기</button>
        </section>
      </div>
    </div>
  );
};

export default TodoDialog;
