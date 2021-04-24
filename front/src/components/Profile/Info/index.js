import React from 'react';
import './styles.scss';

const Info = ({ user, isOther, feedCnt, onClickUnFollow, onClickFollow }) => {
  if (!user) {
    return null;
  }
  return (
    <article className="info">
      <div className="photo">
        <div className="img">
          <img src={user.profileImage} alt="" />
        </div>
        {/* {!isOther && (
          <button>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.9998 13.2C11.7671 13.2 13.1998 11.7673 13.1998 9.99999C13.1998 8.23268 11.7671 6.79999 9.9998 6.79999C8.23249 6.79999 6.7998 8.23268 6.7998 9.99999C6.7998 11.7673 8.23249 13.2 9.9998 13.2Z"
                fill="white"
              />
              <path
                d="M7 0L5.17 2H2C0.9 2 0 2.9 0 4V16C0 17.1 0.9 18 2 18H18C19.1 18 20 17.1 20 16V4C20 2.9 19.1 2 18 2H14.83L13 0H7ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15Z"
                fill="white"
              />
            </svg>
          </button>
        )} */}
      </div>
      <div className="desc">
        <div>
          <strong>{user.nickname}</strong>
          <span>
            {user.age?.substr(0, 4)}.{user.age?.substr(4, 2)}.{user.age?.substr(6, 2)}
          </span>
        </div>
        <p>공부인증 {feedCnt}회</p>
        <p>
          Follower {user.followerlistsize} / Following {user.followlistsize}
        </p>
        <p>{user.introduce}</p>
      </div>
      {isOther ? (
        <button
          className={user.following ? 'following' : ''}
          onClick={user.following ? onClickUnFollow : onClickFollow}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 8C16.21 8 18 6.21 18 4C18 1.79 16.21 0 14 0C11.79 0 10 1.79 10 4C10 6.21 11.79 8 14 8ZM5 6V3H3V6H0V8H3V11H5V8H8V6H5ZM14 10C11.33 10 6 11.34 6 14V16H22V14C22 11.34 16.67 10 14 10Z"
              fill="white"
            />
          </svg>
          {user.following ? '팔로잉' : '팔로우'}
        </button>
      ) : (
        <div></div>
      )}
    </article>
  );
};

export default Info;
