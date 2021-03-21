import React from 'react';
import './styles.scss';

const Search = ({ onClose }) => {
  return (
    <div className="search">
      <header>
        <div className="input-group">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="black"
            />
          </svg>
          <input />
          <button>취소</button>
        </div>
        <button className="close" onClick={onClose}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.75 2.0125L15.9875 0.25L9 7.2375L2.0125 0.25L0.25 2.0125L7.2375 9L0.25 15.9875L2.0125 17.75L9 10.7625L15.9875 17.75L17.75 15.9875L10.7625 9L17.75 2.0125Z"
              fill="#999999"
            />
          </svg>
        </button>
      </header>
      <ul className="tag">
        <li className="tag-item">#고3공부</li>
        <li className="tag-item">#스터디공유</li>
        <li className="tag-item">#공부</li>
        <li className="tag-item">#재수생공부관리</li>
        <li className="tag-item">#다꾸스티커</li>
      </ul>
      <ul className="recent">
        <li className="recent-title">최근검색</li>
        <li className="recent-item">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDTaugvwhAspHwEPN_UsBwu0X1SS3tPwFK5g&usqp=CAU"
              alt=""
            />
          </div>
          <p>hellostudy</p>
          <button>
            <svg
              width="10"
              height="10"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#999999"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Search;
