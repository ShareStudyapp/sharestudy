import React, { useCallback, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import './styles.scss';
import { Card, Info, BlockDialog } from '../../components/Profile';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PROFILE_POSTS_REQUEST, LOAD_PROFILE_POSTS_CLEAR } from '../../reducers/post';
import {
  OTHER_USER_INFO_REQUEST,
  FOLLOW_REQUEST,
  FOLLOW_CANCLE_REQUEST,
  OTHER_USER_INFO_CLEAR
} from '../../reducers/user';
import useScrollMove from '../../hooks/useScrollMove';
import { useRouteMatch } from 'react-router';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const fetchBlockUser = async () => {
  const result = { error: false, message: '' };
  try {
    const { data } = await axios.get(`/report/my`);
    result.data = data;
  } catch (e) {
    result.error = true;
    result.message = e.response.data;
  }
  return result;
};

const Profile = () => {
  const params = useParams();
  const id = params ? params.id : '';
  const match = useRouteMatch(`/profile/${id}`);
  const history = useHistory();
  const page = useRef(1);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const { userInfo, userinfoError, otheruserInfo } = useSelector((state) => state.userReducer);
  const [isBlocked, setIsBlocked] = useState(false);
  const { profilePosts, loadProfilePostsLoading, hasMoreProfilePosts } = useSelector(
    (state) => state.postReducer
  );
  const { scrollInfos, scrollRemove } = useScrollMove({
    page: `profile_${id}`,
    path: `/profile/${id}`
  });

  const dispatch = useDispatch();

  const isOther = id !== 'my' && userInfo?.id != id;

  useEffect(() => {
    async function getBlockUser() {
      const { data: blockList } = await fetchBlockUser();
      setIsBlocked(
        blockList.some((user) => {
          return user.blockedUserId == id;
        })
      );
    }
    getBlockUser();
  }, [id]);

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
    let profileId = id;
    if (id === 'my') {
      profileId = userInfo.id;
    } else {
      dispatch({
        type: OTHER_USER_INFO_REQUEST,
        data: id
      });
    }
    if (profileId) {
      dispatch({
        type: LOAD_PROFILE_POSTS_REQUEST,
        data: { id: profileId }
      });
    }
    return () => {
      dispatch({
        type: LOAD_PROFILE_POSTS_CLEAR
      });
      dispatch({
        type: OTHER_USER_INFO_CLEAR
      });
    };
  }, [id, dispatch, userInfo]);

  useEffect(() => {
    const fetchPosts = () => {
      let profileId = id;
      if (id === 'my') {
        profileId = userInfo.id;
      }
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight * 0.9 &&
        !loadProfilePostsLoading &&
        hasMoreProfilePosts
      ) {
        page.current += 1;
        dispatch({
          type: LOAD_PROFILE_POSTS_REQUEST,
          data: { id: profileId, page: page.current }
        });
      }
    };
    window.addEventListener('scroll', fetchPosts);
    return () => {
      window.removeEventListener('scroll', fetchPosts);
    };
  }, [loadProfilePostsLoading, hasMoreProfilePosts, dispatch, id, userInfo]);

  const onClickCard = useCallback(
    (id) => {
      history.push(`/feed/${id}`);
    },
    [history]
  );

  const onClickBlock = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setShowBlockDialog(true);
  });

  const onCloseDialog = useCallback(() => {
    document.body.style.overflow = 'unset';
    setShowBlockDialog(false);
  }, [setShowBlockDialog]);

  const onClickFollow = useCallback(() => {
    if (userInfo.id) {
      dispatch({
        type: FOLLOW_REQUEST,
        data: otheruserInfo.id
      });
    } else {
      if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        history.push('/login');
      }
    }
  }, [userInfo, otheruserInfo, history]);

  const onClickUnFollow = useCallback(() => {
    if (userInfo.id) {
      dispatch({
        type: FOLLOW_CANCLE_REQUEST,
        data: otheruserInfo.id
      });
    } else {
      if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        history.push('/login');
      }
    }
  }, [userInfo, otheruserInfo, history]);

  //비로그인시 redirect
  if ((id === 'my' && !window.localStorage.getItem('user')) || userinfoError) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: '/profile/my'
          }
        }}
      />
    );
  }

  return (
    <>
      <Header />
      <section className="profile-container">
        <Info
          user={isOther ? otheruserInfo : userInfo}
          isOther={isOther}
          feedCnt={profilePosts.length}
          onClickFollow={onClickFollow}
          onClickUnFollow={onClickUnFollow}
          onClickBlock={onClickBlock}
        />
        <article className="feed">
          <div className="feed__content">
            {profilePosts.map((post) => (
              <Card key={post.id} post={post} onClickCard={onClickCard} />
            ))}
          </div>
        </article>
      </section>
      {isOther && showBlockDialog && (
        <BlockDialog
          onClose={onCloseDialog}
          id={otheruserInfo?.id}
          name={otheruserInfo.nickname}
          isBlocked={isBlocked}
          setBlockState={setIsBlocked}
        />
      )}
      <BottomNav />
    </>
  );
};

export default Profile;
