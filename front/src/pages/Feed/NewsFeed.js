import React, { useEffect, useRef, useCallback } from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_TODO_ACHIEVEMENT_REQUEST } from '../../reducers/todo';
import HelloGoal from '../../components/FeedItem/HelloGoal';
import useScrollMove from '../../hooks/useScrollMove';
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
  const match = useRouteMatch('/');
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector((state) => state.postReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const { todoAchievement } = useSelector((state) => state.todoReducer);
  const page = useRef(1);
  const { scrollInfos, scrollRemove } = useScrollMove();
  let listRef;

  useEffect(() => {
    if (mainPosts.length === 0) {
      page.current = 1;
    }
  }, [mainPosts]);

  useEffect(() => {
    if (scrollInfos && match.isExact) {
      window.scrollTo(0, scrollInfos);
      scrollRemove();
    }
  }, [scrollInfos, scrollRemove, match]);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
    if (userInfo.id) {
      dispatch({
        type: LOAD_TODO_ACHIEVEMENT_REQUEST
      });
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    const fetchPosts = () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const clientHeight = document.documentElement.clientHeight;
      if (
        match.isExact &&
        scrollTop + clientHeight >= scrollHeight * 0.9 &&
        !loadPostsLoading &&
        hasMorePosts
      ) {
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
  }, [loadPostsLoading, hasMorePosts, match, dispatch]);

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

  const onClickCreate = useCallback(() => {
    if (userInfo.id) {
      history.push('/upload');
    } else {
      if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        history.push('/login');
      }
    }
  }, [userInfo, history]);

  return (
    <>
      <div className="FeedContent__create">
        <button onClick={onClickCreate}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.343262 24.3434V30.6566H6.65639L25.2759 12.037L18.9628 5.72391L0.343262 24.3434ZM30.1581 7.15489C30.8146 6.49832 30.8146 5.43772 30.1581 4.78115L26.2187 0.841759C25.5621 0.185193 24.5015 0.185193 23.8449 0.841759L20.7641 3.92257L27.0773 10.2357L30.1581 7.15489Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      {userInfo.id ? (
        <HelloGoal
          nickname={userInfo.nickname}
          percent={
            todoAchievement?.allRatioCnt && todoAchievement?.completeRatioCnt
              ? (todoAchievement.completeRatioCnt / todoAchievement.allRatioCnt) * 100
              : 0
          }
        />
      ) : (
        <HelloLogin history={history} />
      )}
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => {
          return (
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
          );
        }}
      </WindowScroller>
    </>
  );
};

export default NewsFeed;
