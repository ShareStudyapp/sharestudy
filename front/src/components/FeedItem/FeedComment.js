import React from 'react';
import PropTypes from 'prop-types';
import { format, register } from 'timeago.js';
import { localeFunc } from '../Common/localeFunc';

const FeedComment = ({ post }) => {
  register('my-locale', localeFunc);
  const relativeDate = format(post.createdAt, 'my-locale');

  return (
    <div className="FeedComment">
      <section className="FeedComment__center">
        <p className="FeedComment__comment">{post.content}</p>
      </section>
      <section className="FeedComment__header">
        <div className="FeedComment__header--left">
          <button>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
                fill="#BDBDBD"
              />
            </svg>
          </button>
          <button>
            <span>like 500</span>
          </button>
        </div>
        <div className="FeedComment__header--right">
          <p>{relativeDate}</p>
        </div>
      </section>

      <section className="FeedComment__footer">
        <button>댓글 10개</button>
      </section>
    </div>
  );
};

FeedComment.propTypes = {
  post: PropTypes.object
};

export default FeedComment;
