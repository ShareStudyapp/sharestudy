import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Card } from '../../components/Profile';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { OTHER_USER_INFO_REQUEST, OTHER_USER_INFO_CLEAR } from '../../reducers/user';
import './styles.scss';
const Day = () => {
  const dispatch = useDispatch();
  const { id, date } = useParams();
  const [posts, setPosts] = useState([]);
  const { otheruserInfo } = useSelector((state) => state.userReducer);
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: OTHER_USER_INFO_REQUEST,
      data: id
    });
    return () => {
      dispatch({
        type: OTHER_USER_INFO_CLEAR
      });
    };
  }, [id, dispatch]);

  const onClickCard = useCallback(
    (id) => {
      history.push(`/feed/${id}`);
    },
    [history]
  );

  const onClickBack = useCallback(() => {
    history.push(`/profile/${id}?date=${date}`);
  }, [id, history]);

  const dayStr = date.substr(4, 2) + '월' + date.substr(6, 2) + '일';

  return (
    <>
      <Header />
      <button style={{ marginLeft: 40 }} onClick={onClickBack}>
        <svg
          width="20"
          height="26"
          viewBox="0 0 20 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.45 3.45L16.5 0.5L0 17L16.5 33.5L19.45 30.55L5.9 17L19.45 3.45Z"
            fill="black"
          ></path>
        </svg>
      </button>
      {otheruserInfo && (
        <section className="profile-container">
          <article className="day-article">
            <strong className="hightligter" style={{ marginBottom: '20px' }}>
              {otheruserInfo.nickname}님의 {dayStr}
            </strong>
          </article>
          <article className="feed">
            <div className="feed__content">
              {posts?.map((post) => (
                <Card key={post.id} post={post} onClickCard={onClickCard} />
              ))}
            </div>
          </article>
        </section>
      )}

      <BottomNav />
    </>
  );
};

export default Day;
