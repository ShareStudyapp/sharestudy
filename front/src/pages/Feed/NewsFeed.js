import React, { useEffect } from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_TODAY_TODO_REQUEST } from '../../reducers/todo';
import HelloGoal from '../../components/FeedItem/HelloGoal';
import dayjs from 'dayjs';

const NewsFeed = ({ history }) => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsDone } = useSelector((state) => state.postReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const { todayTodo } = useSelector((state) => state.todoReducer);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
    dispatch({
      type: LOAD_TODAY_TODO_REQUEST,
      data: dayjs(new Date()).format('YYYYMMDD')
    });
  }, [dispatch]);

  return (
    <>
      {userInfo.id ? (
        <HelloGoal
          nickname={userInfo.nickname}
          percent={
            todayTodo?.todoList?.length > 0
              ? (todayTodo.completeRatioCnt / todayTodo.allRatioCnt) * 100 + '%'
              : '0%'
          }
        />
      ) : (
        <HelloLogin history={history} />
      )}
      <h2 className="FeedContent__title" style={{ margin: '20px 33px' }}>
        Share
      </h2>
      {loadPostsDone &&
        mainPosts.map((post) => <FeedContent key={post.id} post={post} userInfo={userInfo} />)}
    </>
  );
};

export default NewsFeed;
