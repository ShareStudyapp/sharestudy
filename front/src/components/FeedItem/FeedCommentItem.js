import React from 'react';
import './styles.scss';
import { Avatar } from 'antd';

const FeedCommentItem = () => {
  return (
    <>
      <div className="FeedCommentView">
        <p className="FeedCommentView-userProfile">
          <Avatar size={60} />
        </p>

        <div className="FeedCommentView__desc">
          <p className="FeedCommentView__userId">helloStudy</p>

          <div className="FeedCommentView__Comment">
            <p className="FeedCommentView__Comment--desc">오늘도 화이팅 !!!!! 열공하세요 !!!!</p>
            <button className="FeedCommentView__Comment--like">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z"
                  fill="#C5C5C5"
                />
              </svg>
            </button>
          </div>

          <div className="FeedCommentView__detail">
            <p className="FeedCommentView__detail--date">1분전</p>
            <button className="FeedCommentView__detail--comment">
              <p>답글 쓰기</p>
            </button>
            <button className="FeedCommentView__detail--like">
              <p>
                좋아요 <span>2개</span>
              </p>
            </button>

            <button className="FeedCommentView__detail--more">
              <svg
                width="22"
                height="6"
                viewBox="0 0 22 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.26628 0.600098C1.79961 0.600098 0.599609 1.8001 0.599609 3.26676C0.599609 4.73343 1.79961 5.93343 3.26628 5.93343C4.73294 5.93343 5.93294 4.73343 5.93294 3.26676C5.93294 1.8001 4.73294 0.600098 3.26628 0.600098ZM19.2663 0.600098C17.7996 0.600098 16.5996 1.8001 16.5996 3.26676C16.5996 4.73343 17.7996 5.93343 19.2663 5.93343C20.7329 5.93343 21.9329 4.73343 21.9329 3.26676C21.9329 1.8001 20.7329 0.600098 19.2663 0.600098ZM11.2663 0.600098C9.79961 0.600098 8.59961 1.8001 8.59961 3.26676C8.59961 4.73343 9.79961 5.93343 11.2663 5.93343C12.7329 5.93343 13.9329 4.73343 13.9329 3.26676C13.9329 1.8001 12.7329 0.600098 11.2663 0.600098Z"
                  fill="#999999"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCommentItem;
