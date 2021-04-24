import React, { useMemo, useEffect, useRef, useCallback, useState } from 'react';
import FeedContent from '../../components/FeedItem/FeedContent';
import FeedCommentItem from '../../components/FeedItem/FeedCommentItem';
import {
  LOAD_POSTS_DETAIL_CLEAR,
  LOAD_POSTS_DETAIL_REQUEST,
  LOAD_POSTS_COMMENT_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_RECOMMENT_REQUEST,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_CLEAR,
  REMOVE_POST_REQUEST,
  REMOVE_POST_CLEAR
} from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Input } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { ProfileDialog } from '../../components/Profile';

const FeedDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState('');
  const [updateCommentId, setUpdateCommentId] = useState('');
  const page = useRef(1);
  const {
    postDetail,
    loadPostsCommentLoading,
    hasMoreComments,
    removePostDone,
    removeCommentDone
  } = useSelector((state) => state.postReducer);

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
    return () => {
      dispatch({
        type: LOAD_POSTS_DETAIL_CLEAR
      });
    };
  }, [dispatch, id]);

  const [dialogInfo, setDialogInfo] = useState({ open: false, id: '', target: '' });

  const onClickMore = useCallback(
    (id, target) => {
      document.body.style.overflow = 'hidden';
      setDialogInfo({ id: id, open: true, target: target });
    },
    [setDialogInfo]
  );

  const onCloseDialog = useCallback(() => {
    document.body.style.overflow = 'unset';
    setDialogInfo({ id: '', open: false, target: '' });
  }, [setDialogInfo]);

  const feedBtnList = useMemo(
    () => [
      {
        name: '피드 수정',
        onClick() {}
      },
      {
        name: '피드 삭제',
        onClick() {
          if (window.confirm('삭제하시겠습니까?')) {
            dispatch({ type: REMOVE_POST_REQUEST, data: dialogInfo.id });
          }
        },
        isDelete: true
      }
    ],
    [dialogInfo, dispatch]
  );

  const commentBtnList = useMemo(
    () => [
      {
        name: '댓글 수정',
        onClick() {
          setUpdateCommentId(dialogInfo.id);
          onCloseDialog();
        }
      },
      {
        name: '댓글 삭제',
        onClick() {
          if (window.confirm('삭제하시겠습니까?')) {
            dispatch({ type: REMOVE_COMMENT_REQUEST, data: dialogInfo.id });
          }
        },
        isDelete: true
      }
    ],
    [dialogInfo, dispatch]
  );

  useEffect(() => {
    if (removePostDone) {
      history.push('/');
    }
    return () => {
      dispatch({ type: REMOVE_POST_CLEAR });
    };
  }, [removePostDone, history, dispatch]);

  useEffect(() => {
    if (removeCommentDone) {
      onCloseDialog();
    }
    return () => {
      dispatch({ type: REMOVE_COMMENT_CLEAR });
    };
  }, [removeCommentDone, history, dispatch]);

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
  }, [loadPostsCommentLoading, hasMoreComments, dispatch, id]);

  const onChangeComment = useCallback(
    (e) => {
      if (userInfo.id) {
        setComment(e.target.value);
      } else {
        if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
          history.push('/login');
        }
      }
    },
    [history, userInfo]
  );

  const onCancelCommentEdit = useCallback(() => {
    setUpdateCommentId('');
  }, [setUpdateCommentId]);

  const onSubmitComment = useCallback(
    (value) => {
      if (userInfo.id) {
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
      } else {
        if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
          history.push('/login');
        }
      }
    },
    [userInfo, history, commentId, postDetail, dispatch]
  );

  return (
    <div className="FeedDetail">
      <div style={{ padding: ' 10px 34px 0 34px' }}>
        <button onClick={() => history.goBack()}>
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
      <FeedContent
        post={postDetail}
        userInfo={userInfo}
        isDetail={true}
        onClickMore={onClickMore}
      />
      <div style={{ padding: '0 34px', marginBottom: '20px' }}>
        {postDetail?.feedreply?.map((comment) => (
          <FeedCommentItem
            key={comment.id}
            comment={comment}
            userInfo={userInfo}
            onClickMore={onClickMore}
            setCommentId={setCommentId}
            isEdit={comment.id === updateCommentId}
            onCancelCommentEdit={onCancelCommentEdit}
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
      {dialogInfo.open && (
        <ProfileDialog
          onClose={onCloseDialog}
          btnList={dialogInfo.target === 'comment' ? commentBtnList : feedBtnList}
        />
      )}
    </div>
  );
};

export default FeedDetail;
