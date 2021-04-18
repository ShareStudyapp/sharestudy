import React, { useEffect, useRef, useCallback, useState } from 'react';
import FeedContent from '../../components/FeedItem/FeedContent';
import FeedCommentItem from '../../components/FeedItem/FeedCommentItem';

import { LOAD_POSTS_COMMENT_REQUEST, ADD_COMMENT_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Input } from 'antd';
function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, delay);
    }
  };
}
const FeedDetail = ({ post, onCloseDetail }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState('');
  const page = useRef(1);
  const detailView = useRef();
  const { loadPostsCommentLoading, hasMoreComments } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_COMMENT_REQUEST,
      data: { id: post.id }
    });
  }, []);

  useEffect(() => {
    const view = detailView.current;
    const fetchComments = () => {
      const scrollHeight = view?.scrollHeight;
      const scrollTop = view?.scrollTop;
      if (scrollHeight && scrollTop) {
        const clientHeight = document.documentElement.clientHeight;
        if (
          scrollTop + clientHeight >= scrollHeight * 0.9 &&
          !loadPostsCommentLoading &&
          hasMoreComments
        ) {
          page.current += 1;
          dispatch({
            type: LOAD_POSTS_COMMENT_REQUEST,
            data: { id: post.id, page: page.current }
          });
        }
      }
    };

    const scrollFnc = throttle(fetchComments, 1000);
    view.addEventListener('scroll', scrollFnc);
    return () => {
      view.removeEventListener('scroll', scrollFnc);
    };
  }, [post, detailView, loadPostsCommentLoading, hasMoreComments, dispatch]);

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmitComment = useCallback(
    (value) => {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: value, id: post.id }
      });
      setComment('');
    },
    [post.id, dispatch]
  );

  return (
    <div className="FeedDetail" ref={detailView}>
      <div style={{ padding: ' 10px 34px 0 34px' }}>
        <button onClick={onCloseDetail}>
          <svg
            width="20"
            height="26"
            viewBox="0 0 20 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.45 3.45L16.5 0.5L0 17L16.5 33.5L19.45 30.55L5.9 17L19.45 3.45Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <FeedContent post={post} userInfo={userInfo} />
      <div style={{ padding: '0 34px', marginBottom: '75px' }}>
        {post?.feedreply?.map((comment) => (
          <FeedCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="FeedDetail__create">
        <div className="FeedCommentView">
          <p className="FeedCommentView-userProfile">
            <Avatar src={userInfo?.userProfileImage?.src} />
          </p>

          <div className="FeedCommentView__desc">
            <Input.Search
              placeholder="댓글달기"
              enterButton="게시"
              size="middle"
              value={comment}
              onChange={onChangeComment}
              onSearch={onSubmitComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
