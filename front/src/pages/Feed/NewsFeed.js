import React, { useEffect } from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import HelloGoal from '../../components/FeedItem/HelloGoal';

const NewsFeed = ({ history }) => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsDone } = useSelector((state) => state.postReducer);
  const { userinfoDone } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, [dispatch]);

  return (
    <>
      {userinfoDone ? <HelloGoal /> : <HelloLogin history={history} />}
      <h2 className="FeedContent__title" style={{ margin: '20px 33px' }}>
        Share
      </h2>
      {loadPostsDone && mainPosts.map((post) => <FeedContent key={post.id} post={post} />)}
    </>
  );
};

export default NewsFeed;
