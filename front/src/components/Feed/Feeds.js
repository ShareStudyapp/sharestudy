import React, { useEffect,useState,useCallback} from 'react'
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { OTHER_USER_INFO_REQUEST } from '../../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { css } from "@emotion/core";
import {SyncLoader} from 'react-spinners';
import FeedUserProfile from '../User/FeedUserProfile';

const override = css`
  padding:0 auto;
`;

function Feeds({reqUserInfo}) {
    const dispatch = useDispatch();
    const user = window.sessionStorage.getItem('user')//로그인여부
    const { mainPosts } = useSelector((state) => state.postReducer);
    const { loadPostsDone } = useSelector((state) => state.postReducer);
    const [targetUserId,setTargetUserId] = useState(null);
    const [openUserInfo,setOpenUserInfo] = useState(false);
    useEffect(() => {
      dispatch({
        type: LOAD_POSTS_REQUEST
      });
      
    }, []);
    const targetUserInfo = useCallback((userId)=>{
      if (!user) {
        return alert('로그인이 필요합니다.');
      }

      setOpenUserInfo(true);
      window.scrollTo(0, 0);
      dispatch({
          type: OTHER_USER_INFO_REQUEST,
          data: userId
        });
    },[openUserInfo])
    
    return (
      <div>
      <div style={{backgroundColor:'#E8E8E8'}}>
        {openUserInfo?
        <>
        <FeedUserProfile reqUserInfo={reqUserInfo} openUserInfo={openUserInfo} />
        </>  :""}
        
        {loadPostsDone
          ?mainPosts.map((c) => (
          <PostCard key={c.id} post={c} setTargetUserId={setTargetUserId} targetUserInfo={targetUserInfo} />
          ))
          :<SyncLoader css={override} size={20} color="green" loading style={{width:50}} /> }        
      </div>
    </div>
    )    
} 

export default Feeds