import React, { useCallback, useState } from 'react';
import './styles.scss';
import { Avatar } from 'antd';
import FeedSlider from '../FeedItem/FeedSlider';
import FeedCommentItem from '../FeedItem/FeedCommentItem';
import FeedComment from './FeedComment';

const FeedContent = ({ post, userInfo, resizeHeight }) => {
  const [openComment, setOpenComment] = useState(false);

  const onClickComment = useCallback(() => {
    resizeHeight();
    setOpenComment(true);
  }, [resizeHeight]);

  return (
    <div className="FeedContent">
      <div className="FeedContent-header">
        <div className="FeedContent-header_left">
          <p className="FeedContent-userProfile">
            <Avatar src={post?.userProfileImage?.src} />
          </p>
          <p className="FeedContent-userId">{post.nickname}</p>
        </div>

        <div className="FeedContent-header_right">
          <button className="FeedContent-menu">
            <svg
              width="25"
              height="25"
              viewBox="0 0 22 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.26676 0.600098C1.8001 0.600098 0.600098 1.8001 0.600098 3.26676C0.600098 4.73343 1.8001 5.93343 3.26676 5.93343C4.73343 5.93343 5.93343 4.73343 5.93343 3.26676C5.93343 1.8001 4.73343 0.600098 3.26676 0.600098ZM19.2668 0.600098C17.8001 0.600098 16.6001 1.8001 16.6001 3.26676C16.6001 4.73343 17.8001 5.93343 19.2668 5.93343C20.7334 5.93343 21.9334 4.73343 21.9334 3.26676C21.9334 1.8001 20.7334 0.600098 19.2668 0.600098ZM11.2668 0.600098C9.80009 0.600098 8.60009 1.8001 8.60009 3.26676C8.60009 4.73343 9.80009 5.93343 11.2668 5.93343C12.7334 5.93343 13.9334 4.73343 13.9334 3.26676C13.9334 1.8001 12.7334 0.600098 11.2668 0.600098Z"
                fill="#BDBDBD"
              />
            </svg>
          </button>
        </div>

        <div className="FeedContent__header--title"></div>
      </div>

      <FeedSlider post={post} />
      <FeedComment post={post} onClickComment={onClickComment} />
      {openComment && (
        <FeedCommentItem post={post} userInfo={userInfo} resizeHeight={resizeHeight} />
      )}
    </div>
  );
};

export default FeedContent;
