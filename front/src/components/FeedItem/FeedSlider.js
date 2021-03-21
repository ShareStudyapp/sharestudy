import React, { useRef, useCallback } from 'react';
import { Carousel } from 'antd';
import '../../components/FeedItem/styles.scss';

const SimpleSlider = ({ post }) => {
  const slider = useRef();
  const contentStyle = {
    height: '500px',
    color: '#fff',
    background: '#364d79',
    dotPosition: '-20px',
    autoplay: false
  };

  const gotoNext = useCallback(() => {
    slider.current.next();
  }, [slider]);

  const gotoPre = useCallback(() => {
    slider.current.prev();
  }, [slider]);

  return (
    <div className="feedSlide">
      <Carousel ref={slider}>
        {post.uploadfile.map((v) => (
          <div>
            <img style={contentStyle} src={v.src} alt={v.src} />
          </div>
        ))}
      </Carousel>
      {post.uploadfile.length > 1 && (
        <div className="sliderBtn">
          <button className="next" onClick={gotoNext}></button>
          <button className="pre" onClick={gotoPre}></button>
        </div>
      )}
    </div>
  );
};

export default SimpleSlider;
