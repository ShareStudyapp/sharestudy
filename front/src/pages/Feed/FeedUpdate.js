import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import FeedUpdateForm from '../../components/FeedItem/FeedUpdateForm';

const FeedUpdate = ({history}) => {
  return (
    <>
      <Header />
      <FeedUpdateForm history={history} />
      {/* <Upload /> */}
      <BottomNav />
    </>
  );
};
export default FeedUpdate;
