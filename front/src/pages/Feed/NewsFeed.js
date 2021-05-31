import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import HelloLogin from '../../components/FeedItem/HelloLogin';
import FeedContent from '../../components/FeedItem/FeedContent';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { LOAD_POSTS_REQUEST, REMOVE_POST_REQUEST } from '../../reducers/post';
import { LOAD_TODO_ACHIEVEMENT_REQUEST } from '../../reducers/todo';
import HelloGoal from '../../components/FeedItem/HelloGoal';
import useScrollMove from '../../hooks/useScrollMove';
import { ProfileDialog, ReportDialog } from '../../components/Profile';
import ResizeObserver from 'rc-resize-observer';
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
  const scrollRef = useRef(0);
  const { mainPosts, loadPostsLoading, hasMorePosts, removePostDone } = useSelector(
    (state) => state.postReducer
  );
  const { userInfo } = useSelector((state) => state.userReducer);
  const { todoAchievement } = useSelector((state) => state.todoReducer);
  const page = useRef(1);
  const { scrollInfos, scrollRemove } = useScrollMove({ page: 'feed', path: '/' });
  let listRef;

  const [dialogInfo, setDialogInfo] = useState({ open: false, id: '', target: '' });

  const onResize = useCallback(() => {
    cache.clearAll();
    if (listRef) listRef.recomputeRowHeights();
  }, [listRef]);

  const onClickMore = useCallback(
    (id) => {
      document.body.style.overflow = 'hidden';
      setDialogInfo({ id: id, open: true });
    },
    [setDialogInfo]
  );

  const onCloseDialog = useCallback(() => {
    document.body.style.overflow = 'unset';
    setDialogInfo({ id: '', open: false, target: '', content: '' });
  }, [setDialogInfo]);

  const onClickOther = useCallback(
    (id) => {
      document.body.style.overflow = 'hidden';
      setDialogInfo({ id: id, open: true, target: 'report' });
    },
    [setDialogInfo]
  );

  const btnList = useMemo(
    () => [
      {
        name: '피드 수정',
        onClick() {
          onCloseDialog();
          history.push(`feed/edit/${dialogInfo.id}`);
        }
      },
      {
        name: '피드 삭제',
        onClick() {
          if (window.confirm('삭제하시겠습니까?')) {
            dispatch({ type: REMOVE_POST_REQUEST, data: dialogInfo.id });
          }
        },
        isDelete: true
      }
    ],
    [dialogInfo, dispatch]
  );

  useEffect(() => {
    if (removePostDone) {
      onCloseDialog();
    }
  }, [removePostDone, onCloseDialog]);

  useEffect(() => {
    if (mainPosts.length === 0) {
      onResize();
      page.current = 1;
      dispatch({
        type: LOAD_POSTS_REQUEST
      });
    }
  }, [mainPosts.length]);

  useEffect(() => {
    if (scrollInfos && match.isExact) {
      window.scrollTo(0, scrollInfos);
      scrollRemove();
    }
  }, [scrollInfos, scrollRemove, match]);

  useEffect(() => {
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

  const rowRenderer = useCallback(
    ({ parent, style, index, key }) => {
      const post = mainPosts[index];
      return (
        <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
          {({ measure }) => (
            <div key={key} style={style}>
              <ResizeObserver
                onResize={() => {
                  if (match.isExact) measure();
                }}
              >
                <FeedContent
                  post={post}
                  userInfo={userInfo}
                  onClickMore={onClickMore}
                  onClickOther={onClickOther}
                />
              </ResizeObserver>
            </div>
          )}
        </CellMeasurer>
      );
    },
    [mainPosts, userInfo, onClickMore, match]
  );

  const onClickCreate = useCallback(() => {
    if (userInfo.id) {
      history.push('/feed/edit');
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
          let top = scrollTop;
          if (!match.isExact) {
            top = scrollRef.current;
          } else {
            scrollRef.current = scrollTop;
          }
          return (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={(element) => {
                    listRef = element;
                  }}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={top}
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
      {dialogInfo.open &&
        (dialogInfo.target === 'report' ? (
          <ReportDialog onClose={onCloseDialog} id={dialogInfo.id} />
        ) : (
          <ProfileDialog onClose={onCloseDialog} btnList={btnList} />
        ))}
    </>
  );
};

export default NewsFeed;
