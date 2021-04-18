import React, { useRef, useCallback } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import '../../components/FeedItem/styles.scss';

const SimpleSlider = ({ images }) => {
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
        {images?.map((v, i) => (
          <div key={i}>
            <img style={contentStyle} src={v.src} alt={v.src} />
          </div>
        ))}
      </Carousel>
      {images?.length > 1 && (
        <div className="sliderBtn">
          <button className="next" onClick={gotoNext}>
            <LeftCircleFilled style={{ color: '#fff', opacity: '80%' }} />
          </button>
          <button className="pre" onClick={gotoPre}>
            <RightCircleFilled style={{ color: '#fff', opacity: '80%' }} />
          </button>
        </div>
      )}
    </div>
  );
};

SimpleSlider.propTypes = {
  post: PropTypes.object
};

export default SimpleSlider;
