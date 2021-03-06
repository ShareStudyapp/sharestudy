import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

const Main = () => {
  return (
    <>
      <div>
        {/* 고정 Header */}
        <Header />


        {/* 고정 Bottom */}
        <BottomNav />
      </div>
    </>
  );
};

export default Main;
