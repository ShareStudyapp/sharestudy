import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import './styles.scss';

const Card = ({ post, onClickCard }) => {
  const date = dayjs(new Date(post.createdAt)).format('YYYY.MM.DD');
  const image = post?.uploadfile[0] ? post.uploadfile[0] : '';
  const onClick = useCallback(() => {
    onClickCard(post.id);
  }, [post, onClickCard]);
  return (
    <div
      className="card"
      style={{
        background: `no-repeat center / cover url('${image.src}') ,#bfbfbf`
      }}
      onClick={onClick}
    >
      <div>
        <div>
          <p className="date">{date}</p>
          <p className="comment">{post.content}</p>
          <p className="like">
            <button>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5002 19.2396L8.98975 17.8646C3.62516 13 0.0834961 9.79167 0.0834961 5.85417C0.0834961 2.64583 2.60433 0.125 5.81266 0.125C7.62516 0.125 9.36475 0.96875 10.5002 2.30208C11.6356 0.96875 13.3752 0.125 15.1877 0.125C18.396 0.125 20.9168 2.64583 20.9168 5.85417C20.9168 9.79167 17.3752 13 12.0106 17.875L10.5002 19.2396Z"
                  fill="#FF656E"
                />
              </svg>
            </button>
            like {post.totallike}
          </p>
        </div>
        <button>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 -1.39876e-06C7.16345 -2.17128e-06 2.17128e-06 7.16344 1.39876e-06 16C6.26248e-07 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 -6.26248e-07 16 -1.39876e-06ZM14.3111 24.8889L12.7378 23.3156L19.9644 16.0889L12.7378 8.86222L14.3111 7.28889L23.1111 16.0889L14.3111 24.8889Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
