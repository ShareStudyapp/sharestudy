import React, { useEffect} from 'react'
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { css } from "@emotion/core";
import {SyncLoader} from 'react-spinners';
import FeedUserProfile from '../User/FeedUserProfile';
import Divider from '@material-ui/core/Divider';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Feeds() {
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch({
        type: LOAD_POSTS_REQUEST
      });
      
    }, []);
    const { mainPosts } = useSelector((state) => state.postReducer);
    const { loadPostsDone } = useSelector((state) => state.postReducer);
    
    return (
      <div>
      <div style={{backgroundColor:'#E8E8E8'}}>
        {loadPostsDone?<FeedUserProfile />  :""}
        <Divider />
        {loadPostsDone
          ?mainPosts.map((c) => (
          <PostCard key={c.id} post={c} />
          ))
          :<SyncLoader css={override} size={20} color="green" loading style={{width:50}} /> }        
      </div>
    </div>
    )    
} 

export default Feeds