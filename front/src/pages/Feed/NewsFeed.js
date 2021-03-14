import React, { useEffect } from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';

const NewsFeed = ({ history, key, post }) => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsDone } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, []);

  useEffect(() => {
    if (loadPostsDone) {
      console.log(mainPosts);
    }
  }, [loadPostsDone]);

  return (
    <>
      <HelloLogin history={history} />
      {loadPostsDone && mainPosts.map((c) => <FeedContent key={c.id} post={c} />)}
    </>
  );
};

export default NewsFeed;
