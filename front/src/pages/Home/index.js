import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import FeedContent from '../Feed/NewsFeed';

const Main = ({ history }) => {
  return (
    <>
      <div>
        {/* 고정 Header */}
        <Header />
        <FeedContent history={history} />
        {/* 고정 Bottom */}
        <BottomNav />
      </div>
    </>
  );
};

export default Main;
