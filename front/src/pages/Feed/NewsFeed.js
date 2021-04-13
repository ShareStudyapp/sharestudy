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
  defaultWidth: 100,
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

  const rowRenderer = useCallback(
    ({ parent, style, index, key }) => {
      const post = mainPosts[index];
      const resizeHeight = () => {
        cache.clear(index);
        if (listRef) listRef.recomputeRowHeights(index);
      };

      return (
        <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
          <div style={style}>
            <FeedContent post={post} userInfo={userInfo} resizeHeight={resizeHeight} />
          </div>
        </CellMeasurer>
      );
    },
    [mainPosts, userInfo, listRef]
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
                height={height} // 전체 높이
                rowCount={mainPosts.length} // 항목 개수
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
                list={mainPosts} // 배열
                deferredMeasurementCache={cache}
                style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      {/* {mainPosts.map((post) => (
        <FeedContent key={post.id} post={post} userInfo={userInfo} />
      ))} */}
    </>
  );
};

export default NewsFeed;
