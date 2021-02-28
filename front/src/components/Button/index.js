import React from "react";
import { Children } from "react";

const Button = ({ preBtnNm, nextBtnNm }) => {
  return (
    <div>
      <button name="pre" type="button">
        {preBtnNm}
      </button>

      <button name="next" type="button">
        {nextBtnNm}
      </button>
    </div>
  );
};

export default Button;
