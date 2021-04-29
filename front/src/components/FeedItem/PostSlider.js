import React, { useRef, useCallback } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../components/FeedItem/styles.scss';

const SimpleSlider = ({ images, onRemoveImage }) => {
  const slider = useRef();

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
          <div className="wrapper" key={i}>
            <img style={contentStyle} src={v} alt={v} />
            <div style={{ position: 'absolute', right: 0, margin: '0.2em' }}>
              <CloseOutlined
                style={{ fontSize: 25, color: '#d3d3d3' }}
                onClick={onRemoveImage(i)}
              />
            </div>
          </div>
        ))}
      </Carousel>
      {images?.length > 1 && (
        <div className="sliderBtn">
          <button className="pre" onClick={gotoPre} type="button">
            <LeftOutlined style={{ color: '#d3d3d3' }} />
          </button>
          <button className="next" onClick={gotoNext} type="button">
            <RightOutlined style={{ color: '#d3d3d3' }} />
          </button>
        </div>
      )}
    </div>
  );
};

const contentStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  color: '#fff',
  background: '#d3d3d3',
  dotPosition: '-20px',
  autoplay: false
};

SimpleSlider.propTypes = {
  post: PropTypes.object
};

export default SimpleSlider;
