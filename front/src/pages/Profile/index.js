import React, { useCallback, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import './styles.scss';
import { Info, BlockDialog } from '../../components/Profile';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  OTHER_USER_INFO_REQUEST,
  FOLLOW_REQUEST,
  FOLLOW_CANCLE_REQUEST,
  OTHER_USER_INFO_CLEAR
} from '../../reducers/user';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Content from './Content';
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
  const history = useHistory();
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const { userInfo, userinfoError, otheruserInfo } = useSelector((state) => state.userReducer);
  const [isBlocked, setIsBlocked] = useState(false);

  const dispatch = useDispatch();

  const isOther = id !== 'my' && userInfo?.id != id;

  useEffect(() => {
    async function getBlockUser() {
      const { data: blockList } = await fetchBlockUser();
      setIsBlocked(
        blockList?.some((user) => {
          return user.blockedUserId == id;
        })
      );
    }
    getBlockUser();
  }, [id]);

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
    return () => {
      dispatch({
        type: OTHER_USER_INFO_CLEAR
      });
    };
  }, [id, dispatch, userInfo]);

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
          onClickFollow={onClickFollow}
          onClickUnFollow={onClickUnFollow}
          onClickBlock={onClickBlock}
        />
        <Content id={isOther ? id : userInfo.id} />
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
