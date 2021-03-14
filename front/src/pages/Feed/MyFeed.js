import React from 'react';
import HelloGoal from '../../components/FeedItem/HelloGoal';
import FeedContent from '../../components/FeedItem/FeedContent';
import '../../components/FeedItem/styles.scss';

const MyFeed = () => {
  return (
    <>
      <HelloGoal />
      <FeedContent />
    </>
  );
};

export default MyFeed;
