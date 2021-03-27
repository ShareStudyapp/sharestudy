import React from 'react';
import './styles.scss';
import { Avatar } from 'antd';

const NotifyCon = () => {
  return (
    <div className="noti">
      <div className="noti__wrap">
        {/* 좋아요 ver */}
        <div className="noti__con like">
          <div className="noti__con--icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 34 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9997 30.5833L14.583 28.3833C5.99967 20.6 0.333008 15.4667 0.333008 9.16667C0.333008 4.03333 4.36634 0 9.49967 0C12.3997 0 15.183 1.35 16.9997 3.48333C18.8163 1.35 21.5997 0 24.4997 0C29.633 0 33.6663 4.03333 33.6663 9.16667C33.6663 15.4667 27.9997 20.6 19.4163 28.4L16.9997 30.5833Z"
                fill="#FF656E"
              />
            </svg>
          </div>
          <div className="noti__con--alarm">
            <h3>hello님이 내 게시물을 좋아합니다.</h3>
            <p className="noti__con--date">
              2020.06.09 <span>18:22</span>
            </p>
          </div>
        </div>

        {/* 팔로우 ver */}
        <div className="noti__con follow">
          <div className="noti__con--icon">
            <Avatar />
          </div>
          <div className="noti__con--alarm">
            <h3>hello님이 나를 팔로우 합니다.</h3>
            <p className="noti__con--date">
              2020.06.09 <span>18:22</span>
            </p>
          </div>
        </div>

        {/* 대댓글 ver */}
        <div className="noti__con comment">
          <div className="noti__con--icon">
            <svg
              width="23"
              height="23"
              viewBox="0 0 35 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.833 0.333496H4.16634C2.33301 0.333496 0.833008 1.8335 0.833008 3.66683V33.6668L7.49967 27.0002H30.833C32.6663 27.0002 34.1663 25.5002 34.1663 23.6668V3.66683C34.1663 1.8335 32.6663 0.333496 30.833 0.333496ZM30.833 23.6668H7.49967L4.16634 27.0002V3.66683H30.833V23.6668Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="noti__con--alarm">
            <h3>hello님이 내 게시물을 단 댓글</h3>
            <p>@gongbu 이거 보고 열심히 하자!</p>
            <p className="noti__con--date">
              2020.06.09 <span>18:22</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyCon;
