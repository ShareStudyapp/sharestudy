import React from 'react';
import './styles.scss';
import FeedSlider from '../FeedItem/FeedSlider';
import { FeedComment } from './FeedComment';

const FeedContent = () => {
  return (
    <div className="FeedContent">
      <h2>Share</h2>

      <div className="FeedContent-header">
        <div className="FeedContent-header_left">
          <p className="FeedContent-userProfile">
            <img src="#" alt="" />
          </p>
          <p className="FeedContent-userId">안알랴줌</p>
        </div>

        <div className="FeedContent-header_right">
          <button className="FeedContent-secret">
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.99999 10.5C2.83332 7.33333 3.49999 1 7.49999 1C11.5 1 12.1667 7.33333 12 10.5"
                stroke="#C4C4C4"
                stroke-width="2"
              />
              <rect y="8.5" width="15" height="15" rx="2" fill="#C4C4C4" />
            </svg>
          </button>
          <button className="FeedContent-menu">
            <svg
              width="30"
              height="30"
              viewBox="0 0 22 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.26676 0.600098C1.8001 0.600098 0.600098 1.8001 0.600098 3.26676C0.600098 4.73343 1.8001 5.93343 3.26676 5.93343C4.73343 5.93343 5.93343 4.73343 5.93343 3.26676C5.93343 1.8001 4.73343 0.600098 3.26676 0.600098ZM19.2668 0.600098C17.8001 0.600098 16.6001 1.8001 16.6001 3.26676C16.6001 4.73343 17.8001 5.93343 19.2668 5.93343C20.7334 5.93343 21.9334 4.73343 21.9334 3.26676C21.9334 1.8001 20.7334 0.600098 19.2668 0.600098ZM11.2668 0.600098C9.80009 0.600098 8.60009 1.8001 8.60009 3.26676C8.60009 4.73343 9.80009 5.93343 11.2668 5.93343C12.7334 5.93343 13.9334 4.73343 13.9334 3.26676C13.9334 1.8001 12.7334 0.600098 11.2668 0.600098Z"
                fill="#BDBDBD"
              />
            </svg>
          </button>
        </div>

        <div className="FeedContent__header--title"></div>
      </div>

      <FeedSlider />
      <FeedComment />
    </div>
  );
};

export default FeedContent;
