import React, { useEffect, useRef, useCallback } from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_TODAY_TODO_REQUEST } from '../../reducers/todo';
import HelloGoal from '../../components/FeedItem/HelloGoal';
import dayjs from 'dayjs';
import {
  List,
  AutoSizer,
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

const cache = new CellMeasurerCache({
  defaultHeight: 280,
  fixedWidth: true
});

const NewsFeed = ({ history }) => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector((state) => state.postReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const { todayTodo } = useSelector((state) => state.todoReducer);
  const page = useRef(1);
  let listRef;

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
    dispatch({
      type: LOAD_TODAY_TODO_REQUEST,
      data: dayjs(new Date()).format('YYYYMMDD')
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight * 0.9 && !loadPostsLoading && hasMorePosts) {
        page.current += 1;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          data: { page: page.current }
        });
      }
    };
    window.addEventListener('scroll', fetchPosts);
    return () => {
      window.removeEventListener('scroll', fetchPosts);
    };
  });

  const resizeHeight = useCallback(
    (index) => () => {
      cache.clear(index);
      if (listRef) listRef.recomputeRowHeights(index);
    },
    [listRef]
  );

  const rowRenderer = useCallback(
    ({ parent, style, index, key }) => {
      const post = mainPosts[index];
      return (
        <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
          <div style={style}>
            <FeedContent post={post} userInfo={userInfo} resizeHeight={resizeHeight(index)} />
          </div>
        </CellMeasurer>
      );
    },
    [mainPosts, userInfo, resizeHeight]
  );

  return (
    <>
      {userInfo.id ? (
        <HelloGoal
          nickname={userInfo.nickname}
          percent={
            todayTodo?.todoList?.length > 0
              ? (todayTodo.completeRatioCnt / todayTodo.allRatioCnt) * 100 + '%'
              : '0%'
          }
        />
      ) : (
        <HelloLogin history={history} />
      )}
      <h2 className="FeedContent__title" style={{ margin: '20px 33px' }}>
        Share
      </h2>
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={(element) => {
                  listRef = element;
                }}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                autoHeight
                width={width}
                height={height}
                rowCount={mainPosts.length}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                list={mainPosts}
                deferredMeasurementCache={cache}
                style={{ outline: 'none' }}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </>
  );
};

export default NewsFeed;
