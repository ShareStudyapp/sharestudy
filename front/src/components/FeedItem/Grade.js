import React from 'react';

import magnifier from '../../assets/images/magnifier.png';
import small_pencil from '../../assets/images/small_pencil.png';
import large_pencil from '../../assets/images/large_pencil.png';
import fountain_pen from '../../assets/images/fountain_pen.png';

// 등급
const Grade = ({ post }) => {
  //console.log(post.grade);

  let image = '';
  switch (post.grade) {
    case 0:
      image = magnifier;
      break;
    case 1:
      image = small_pencil;
      break;
    case 2:
      image = large_pencil;
      break;
    case 3:
      image = fountain_pen;
      break;
  }

  return (
    <div>
      <img className="grade_image" src={image} />
    </div>
  );
};

export default Grade;
