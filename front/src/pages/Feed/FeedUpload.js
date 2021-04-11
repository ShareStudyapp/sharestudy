import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Upload from '../../components/FeedItem/Upload';
import PostForm from '../../components/FeedItem/PostForm';

const FeedUpload = ({history}) => {
  return (
    <>
      <Header />
      <PostForm history={history} />
      {/* <Upload /> */}
      <BottomNav />
    </>
  );
};
export default FeedUpload;
