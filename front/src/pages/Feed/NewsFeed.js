import React from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';

const NewsFeed = ({ history }) => {
  return (
    <>
      <HelloLogin history={history} />
      <FeedContent />
    </>
  );
};

export default NewsFeed;
