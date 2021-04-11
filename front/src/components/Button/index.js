import React from 'react';
import './styles.scss';

const Button = ({ preBtnNm, nextBtnNm, preBtnClick, nextBtnClick }) => {
  return (
    <div className="PreNextBtn">
      {/* <button name="pre" type="button" className="left" onClick={preBtnClick} >
        {preBtnNm}
      </button> */}

      <button name="next" type="button" className="right" onClick={nextBtnClick}>
        {nextBtnNm}
      </button>
    </div>
  );
};

export default Button;
