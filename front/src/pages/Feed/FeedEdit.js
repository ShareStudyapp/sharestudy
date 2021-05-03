import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import FeedUpdateForm from '../../components/FeedItem/FeedUpdateForm';
import PostForm from '../../components/FeedItem/PostForm';

import { useParams } from 'react-router-dom';

const FeedEdit = ({ history }) => {
  const { id } = useParams();
  return (
    <>
      <Header />
      {id ? <FeedUpdateForm history={history} postId={id} /> : <PostForm history={history} />}
      <BottomNav />
    </>
  );
};
export default FeedEdit;
