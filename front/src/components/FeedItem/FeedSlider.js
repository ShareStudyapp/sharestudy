import React from 'react';
import { Carousel } from 'antd';

const SimpleSlider = ({ post }) => {
  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
    dotPosition: 'bottom',
    autoplay: false
  };

  return (
    <div>
      <Carousel>
        {post.uploadfile.map((v) => (
          <div>
            <img style={contentStyle} src={v.src} alt={v.src} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SimpleSlider;
