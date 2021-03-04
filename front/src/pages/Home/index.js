import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import LoginForm from '../Login/LoginForm';

const Main = () => {
  return (
    <>
      <div>
        {/* 고정 Header */}
        <Header />

        <LoginForm></LoginForm>

        {/* 고정 Bottom */}
        <BottomNav />
      </div>
    </>
  );
};

export default Main;
