import React from 'react';
import { Button } from 'antd';
import './styles.scss';

const Dialog = ({text, onClick}) => {
  return (
    <>
    <div className="Dialog">
      <div className ="Dialog-wrap">
      <h2>{text}</h2>
      <Button onClick={onClick}>확인</Button>
      </div>
    </div>
    </>
  );
};

export default Dialog;