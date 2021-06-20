import React, { useState, useEffect, useCallback, useRef } from 'react';
import Calendar from '../../components/Calendar';
import { Card } from '../../components/Profile';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { useLocation } from 'react-router-dom';
import { LOAD_PROFILE_POSTS_REQUEST, LOAD_PROFILE_POSTS_CLEAR } from '../../reducers/post';
import useScrollMove from '../../hooks/useScrollMove';
import dayjs from 'dayjs';
import axios from 'axios';

const fetchMainDayFeed = async (date) => {
  const result = { error: false, message: '' };
  try {
    const { data } = await axios.get(`/feed/One/${dayjs(date).format('YYYYMMDD')}`);
    result.data = data;
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const Content = ({ id }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const dateStr = query.get('date');
  const [type, setType] = useState(dateStr && dateStr.length == 8 ? 'month' : 'day');
  const [date, setDate] = useState(
    dateStr && dateStr.length == 8 ? dayjs(dateStr, 'YYYYMMDD').toDate() : new Date()
  );
  const [mainDayCard, setMainDayCard] = useState(null);
  const history = useHistory();
  const page = useRef(1);
  const dispatch = useDispatch();
  const match = useRouteMatch(`/profile/${id}`);
  const { profilePosts, loadProfilePostsLoading, hasMoreProfilePosts } = useSelector(
    (state) => state.postReducer
  );

  const { scrollInfos, scrollRemove } = useScrollMove({
    page: `profile_${id}`,
    path: `/profile/${id}`
  });

  const onSetDate = useCallback((date) => {
    setDate(date);
  }, []);

  useEffect(() => {
    async function getMainDayFeed() {
      const { data: mainDayCard } = await fetchMainDayFeed(date);
      setMainDayCard(mainDayCard);
    }
    getMainDayFeed();
  }, [date]);

  useEffect(() => {
    if (scrollInfos && match?.isExact) {
      window.scrollTo(0, scrollInfos);
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      if (scrollTop == scrollInfos) {
        scrollRemove();
      }
    }
  }, [scrollInfos, scrollRemove, profilePosts, match]);

  useEffect(() => {
    dispatch({
      type: LOAD_PROFILE_POSTS_REQUEST,
      data: { id: id }
    });
    return () => {
      dispatch({
        type: LOAD_PROFILE_POSTS_CLEAR
      });
    };
  }, [id, dispatch]);

  useEffect(() => {
    const fetchPosts = () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight * 0.9 &&
        !loadProfilePostsLoading &&
        hasMoreProfilePosts &&
        type === 'day'
      ) {
        page.current += 1;
        dispatch({
          type: LOAD_PROFILE_POSTS_REQUEST,
          data: { id: id, page: page.current }
        });
      }
    };
    window.addEventListener('scroll', fetchPosts);
    return () => {
      window.removeEventListener('scroll', fetchPosts);
    };
  }, [loadProfilePostsLoading, hasMoreProfilePosts, dispatch, id, type]);

  const renderDay = (day) => {
    const date = day.getDate();

    return (
      <div className="customCell">
        <div className="customDate">{date}</div>
      </div>
    );
  };

  const onClickCard = useCallback(
    (id) => {
      history.push(`/feed/${id}`);
    },
    [history]
  );

  const onClickMainCard = useCallback(() => {
    history.push(`/profile/${id}/${dayjs(date).format('YYYYMMDD')}`);
  }, [id, history]);
  return (
    <div className="content">
      <ul className="tab">
        <li className={type === 'day' ? 'active' : ''} onClick={() => setType('day')}>
          일별보기
        </li>
        <li className={type === 'month' ? 'active' : ''} onClick={() => setType('month')}>
          월별보기
        </li>
      </ul>
      <div className="dayWrapper" style={{ display: type === 'day' ? 'block' : 'none' }}>
        <article className="feed">
          <div className="feed__content">
            {profilePosts?.map((post) => (
              <Card key={post.id} post={post} onClickCard={onClickCard} />
            ))}
          </div>
        </article>
      </div>
      <div className="monthWrapper" style={{ display: type === 'month' ? 'block' : 'none' }}>
        <div className="month">
          <Calendar date={date} setDate={onSetDate} renderDay={renderDay} />
        </div>
        {mainDayCard && (
          <div
            className="main-card"
            style={{
              background: `no-repeat center / cover url('') ,#bfbfbf`
            }}
            onClick={onClickMainCard}
          >
            <div>
              <div>
                <p className="date">2021.06.20</p>
                <div className="comment">
                  <div>입력한내용입니다.</div>
                </div>
                <p className="like">
                  <span>
                    <button className="heart">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5002 19.2396L8.98975 17.8646C3.62516 13 0.0834961 9.79167 0.0834961 5.85417C0.0834961 2.64583 2.60433 0.125 5.81266 0.125C7.62516 0.125 9.36475 0.96875 10.5002 2.30208C11.6356 0.96875 13.3752 0.125 15.1877 0.125C18.396 0.125 20.9168 2.64583 20.9168 5.85417C20.9168 9.79167 17.3752 13 12.0106 17.875L10.5002 19.2396Z"
                          fill="#FF656E"
                        />
                      </svg>
                    </button>
                    like 3
                  </span>
                  <button className="more">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 -1.39876e-06C7.16345 -2.17128e-06 2.17128e-06 7.16344 1.39876e-06 16C6.26248e-07 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 -6.26248e-07 16 -1.39876e-06ZM14.3111 24.8889L12.7378 23.3156L19.9644 16.0889L12.7378 8.86222L14.3111 7.28889L23.1111 16.0889L14.3111 24.8889Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
