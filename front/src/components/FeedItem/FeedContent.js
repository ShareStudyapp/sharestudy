import React from 'react';
import './styles.scss';

const FeedContent = () => {
  return (
    <div className="FeedContent">
      <h2>Share</h2>

      <div className="FeedContent-header">
        <div className="FeedContent-header_left">
          <img src="#" alt="" />
          <p className="FeedContent-userId"></p>
        </div>
      
        <div className="FeedContent-header_right">
          <button className="FeedContent-secret">
          </button>

          <button className="FeedContent-menu">
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default FeedContent;