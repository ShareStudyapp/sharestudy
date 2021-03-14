import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import NewsFeed from '../Feed/NewsFeed';

const Main = () => {
  return (
    <>
      <div>
        {/* 고정 Header */}
        <Header />

        <NewsFeed />

        {/* 고정 Bottom */}
        <BottomNav />
      </div>
    </>
  );
};

export default Main;
