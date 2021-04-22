import React, { useEffect, useRef, useCallback, useState } from 'react';
import FeedContent from '../../components/FeedItem/FeedContent';
import FeedCommentItem from '../../components/FeedItem/FeedCommentItem';
import {
  LOAD_POSTS_DETAIL_REQUEST,
  LOAD_POSTS_COMMENT_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_RECOMMENT_REQUEST
} from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Input } from 'antd';
import { useParams } from 'react-router-dom';

const FeedDetail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState('');
  const page = useRef(1);
  const { postDetail, loadPostsCommentLoading, hasMoreComments } = useSelector(
    (state) => state.postReducer
  );

  const [commentId, setCommentId] = useState('');

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_DETAIL_REQUEST,
      data: id
    });
    dispatch({
      type: LOAD_POSTS_COMMENT_REQUEST,
      data: { id: id, page: page.current }
    });
  }, [dispatch, id]);

  useEffect(() => {
    const fetchComments = () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight * 0.9 &&
        !loadPostsCommentLoading &&
        hasMoreComments
      ) {
        page.current += 1;
        dispatch({
          type: LOAD_POSTS_COMMENT_REQUEST,
          data: { id: id, page: page.current }
        });
      }
    };
    window.addEventListener('scroll', fetchComments);
    return () => {
      window.removeEventListener('scroll', fetchComments);
    };
  }, [postDetail, loadPostsCommentLoading, hasMoreComments, dispatch, id]);

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmitComment = useCallback(
    (value) => {
      if (commentId) {
        dispatch({
          type: ADD_RECOMMENT_REQUEST,
          data: { content: value, feedId: postDetail.id, id: commentId }
        });
      } else {
        dispatch({
          type: ADD_COMMENT_REQUEST,
          data: { content: value, id: postDetail.id }
        });
      }
      setCommentId('');
      setComment('');
    },
    [commentId, postDetail, dispatch]
  );

  return (
    <div className="FeedDetail">
      <div style={{ padding: ' 10px 34px 0 34px' }}>
        <button>
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
      <FeedContent post={postDetail} userInfo={userInfo} isDetail={true} />
      <div style={{ padding: '0 34px', marginBottom: '20px' }}>
        {postDetail?.feedreply?.map((comment) => (
          <FeedCommentItem
            key={comment.id}
            comment={comment}
            userInfo={userInfo}
            setCommentId={setCommentId}
          />
        ))}
      </div>
      <div className="FeedDetail__create">
        <div className="FeedCommentView">
          <p className="FeedCommentView-userProfile">
            <Avatar src={userInfo?.profileImage} />
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
