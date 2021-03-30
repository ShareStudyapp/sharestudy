import React, { useState } from 'react';
import './styles.scss';
import { Avatar } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

const FeedCommentItem = () => {
  const [color, setColor] = useState('');
  const onClick = () => {
    setColor('#eb2f96');
  };
  return (
    <>
      <div className="FeedCommentView">
        <p className="FeedCommentView-userProfile">
          <Avatar />
        </p>

        <div className="FeedCommentView__desc">
          <p className="FeedCommentView__userId">helloStudy</p>

          <div className="FeedCommentView__Comment">
            <p className="FeedCommentView__Comment--desc">오늘도 화이팅 !!!!! 열공하세요 !!!!</p>
            <button className="FeedCommentView__Comment--like" onClick={onClick}>
              <HeartTwoTone style={{ fill: color }} />
            </button>
          </div>

          <div className="FeedCommentView__detail">
            <div className="FeedCommentView__detail--left">
              <p className="FeedCommentView__detail--date" style={{ color: '#999999' }}>
                1분전
              </p>
              <button className="FeedCommentView__detail--comment">
                <p>답글 쓰기</p>
              </button>
              <button className="FeedCommentView__detail--like">
                <p>
                  좋아요 <span>2개</span>
                </p>
              </button>
            </div>

            <div className="FeedCommentView__detail--right">
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

          <div className="FeedCommentView__more">
            <button>
              <p style={{ fontSize: '12px', color: '#999999' }}>답글 2개 보기</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCommentItem;
