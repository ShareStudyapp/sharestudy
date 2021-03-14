import React from 'react';

export const FeedComment = () => {
  return (
    <div className="FeedComment">
      <section className="FeedComment__header">
        <div className="FeedComment__header--left">
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
              fill="#BDBDBD"
            />
          </svg>
          <span>like 500</span>
        </div>
        <div className="FeedComment__header--right">
          <p>50분 전</p>
        </div>
      </section>

      <section className="FeedComment__center">
        <h1>야나두 !!!!</h1>
        <p>오늘 할당량 끝내기! 못 끝내면 내일 2배 이상으로 공부량 늘리기</p>
      </section>

      <section className="FeedComment__footer">
        <button>댓글 10개</button>
      </section>
    </div>
  );
};
