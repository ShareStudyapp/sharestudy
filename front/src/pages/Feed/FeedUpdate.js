import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import FeedUpdateForm from '../../components/FeedItem/FeedUpdateForm';
import { useParams } from 'react-router-dom';

const FeedUpdate = ({ history }) => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <FeedUpdateForm history={history} postId={id} />
      {/* <Upload /> */}
      <BottomNav />
    </>
  );
};
export default FeedUpdate;
