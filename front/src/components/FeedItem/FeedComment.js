import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, register } from 'timeago.js';
import { localeFunc } from '../Common/localeFunc';
import { useDispatch, useSelector } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';

const likeColor = {
  on: '#eb2f96',
  off: '#ccc'
};

const FeedComment = ({ post }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userReducer);
  const [like, setLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);

  const toggleLike = useCallback(
    (id) => {
      const likeType = like ? UNLIKE_POST_REQUEST : LIKE_POST_REQUEST;
      dispatch({
        type: likeType,
        data: id
      });
      setLike(!like);
      setLikeCnt(like ? likeCnt - 1 : likeCnt + 1);
    },
    [like, likeCnt, dispatch]
  );

  useEffect(() => {
    setLike(post?.feedlike?.some((feed) => feed?.userkey === userInfo?.id));
    setLikeCnt(post?.totallike);
  }, [post, userInfo]);

  register('my-locale', localeFunc);
  const relativeDate = format(post.createdAt, 'my-locale');

  return (
    <div className="FeedComment">
      <section className="FeedComment__center">
        <p className="FeedComment__comment">{post.content}</p>
      </section>
      <section className="FeedComment__header">
        <div className="FeedComment__header--left">
          <button onClick={() => toggleLike(post.id)} type="button">
            <svg width="20" height="20" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
                fill={like ? likeColor.on : likeColor.off}
              />
            </svg>
          </button>
          <button>
            <span>like {likeCnt}</span>
          </button>
        </div>
        <div className="FeedComment__header--right">
          <p>{relativeDate}</p>
        </div>
      </section>

      <section className="FeedComment__footer">
        <button>댓글 {post.feedreply.length}개</button>
      </section>
    </div>
  );
};

FeedComment.propTypes = {
  post: PropTypes.object
};

export default FeedComment;
