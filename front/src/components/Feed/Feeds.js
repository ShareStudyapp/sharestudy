import React, { useEffect} from 'react'
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { makeStyles } from '@material-ui/core/styles';
import { css } from "@emotion/core";
import {SyncLoader} from 'react-spinners';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
function Feeds() {
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
      dispatch({
        type: LOAD_POSTS_REQUEST
      });
      // dispatch({
      //   type: LOAD_GALLARY_REQUEST
      // });
    }, []);
    const { mainPosts } = useSelector((state) => state.postReducer);
    const { loadPostsDone } = useSelector((state) => state.postReducer);
    
    return (
      <div>
      <div className={classes.root}>
      {loadPostsDone
        ?mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
        ))
        :<SyncLoader css={override} size={50} color="green" loading style={{width:50}} /> }        
      </div>
    </div>
    )    
} 

export default Feeds