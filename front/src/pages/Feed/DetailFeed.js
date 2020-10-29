import React,{useEffect} from 'react'
import DetailFeedInfo from '../../components/Feed/DetailFeedInfo';
import { useSelector, useDispatch } from 'react-redux';
import {LOAD_POSTS_DETAIL_REQUEST} from '../../reducers/post';
import PostCard from '../../components/Feed/PostCard';

function DetailFeed({match}) {
    const dispatch = useDispatch();
    const { mainPosts,loadPostsDone } = useSelector((state) => state.postReducer);
    useEffect(() => {
        
        dispatch({
            type: LOAD_POSTS_DETAIL_REQUEST,
            data:  match.params.id
          });
    }, [])
    return (
        <div>
            {loadPostsDone?
            <PostCard key={mainPosts.id} post={mainPosts} />
            :""}
            {/* <DetailFeedInfo /> */}
        </div>
    )
}

export default DetailFeed