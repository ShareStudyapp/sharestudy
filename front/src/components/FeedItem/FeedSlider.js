import React, { Component } from 'react';
import { Carousel } from 'antd';

export default class SimpleSlider extends Component {
  render() {
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
          <div>
            <img src="" alt="" style={contentStyle} />
          </div>
          <div>
            <img src="" alt="" style={contentStyle} />
          </div>
          <div>
            <img src="" alt="" style={contentStyle} />
          </div>
        </Carousel>
      </div>
    );
  }
}
