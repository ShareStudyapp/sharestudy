import React, { useState, useCallback,useEffect } from 'react';
import { Card, Button, Avatar, Comment,Input } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PostImages from './PostImages';
import {REMOVE_POST_REQUEST,UPDATE_POST_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST,REMOVE_COMMENT_REQUEST,LOAD_POSTS_COMMENT_REQUEST,UPDATE_COMMENT_REQUEST} from '../../reducers/post';
import CommentForm from './CommentForm';
import ReplyContent from './ReplyContent';
import './PostCard.css';
import userdefaultimg from '../../assets/images/user_default.png';
import { FaHeart,FaRegHeart,FaRegCommentAlt } from "react-icons/fa";
import Spinner from '../Utils/Spinner';
import PostCardContent from './PostCardContent';

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;
const images = [
  'https://source.unsplash.com/random/400x400',
  'https://source.unsplash.com/random/400x400',
  'https://source.unsplash.com/random/400x400',
];
function PostCard({post}) {
    
    const dispatch = useDispatch();
    const { removePostLoading,removePostDone } = useSelector((state) => state.postReducer);
    const { postComment } = useSelector((state) => state.postReducer);
    const {userInfo} = useSelector((state) => state.userReducer);
    //const [liked, setLiked] = useState(false); 
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [replyeditMode, setReplyeditMode] = useState(false);
    const [replytmp,setReplytmp] = useState('');
    const [buttonloading,setButtonloading] = useState(false);
    //const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    
    useEffect(()=>{
      
    },[])
    const onClickUpdate = useCallback(() => {
      setEditMode(true);
    }, []);
  
    const onCancelUpdate = useCallback(() => {
      setEditMode(false);
    }, []);
    const onClickReplyUpdate = useCallback((replyid) => {
      console.log(replyid);
      setReplytmp(replyid);
      setReplyeditMode(true);
    }, []);
    const onCancleReplyUpdate = useCallback(() => {
      setReplyeditMode(false);
    }, []);
    const onChangePost = useCallback((editText) => () => {

      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          id: post.id,
          content: editText,
        },
      });
    }, [post]);
    const onChangeReplyPost = useCallback((replyid,replyeditText) => () => {
      
      dispatch({
        type: UPDATE_COMMENT_REQUEST,
        data: {
          id: replyid,
          content: replyeditText,
        },
      });
    }, []);
    let clickdupl = true;
    const onToggleComment = useCallback((postid) => {
      
      //setCommentFormOpened(commentFormOpened === false ? true : false);
      console.log(postid)
      setCommentFormOpened((prev) => !prev);
        
      dispatch({
        type: LOAD_POSTS_COMMENT_REQUEST,
        data: {
          id: postid,
        },
      });
      if(clickdupl){
       
        clickdupl = !clickdupl;
      }else{
        console.log('중복됨')
      }
      
    }, [commentFormOpened]);
    const onRemovePost = useCallback(() => {
      if (!userInfo.id) {
        return alert('로그인이 필요합니다.');
      }
      if(window.confirm("삭제 하시겠습니까?")) {
        console.log(post.id)
        return dispatch({
          type: REMOVE_POST_REQUEST,
          data: post.id,
        });
      }

    }, [userInfo.id]);
    const onClickReplyDelete = useCallback((id)=>{
      
      if(window.confirm("삭제 하시겠습니까?")) {
        return dispatch({
          type: REMOVE_COMMENT_REQUEST,
          data: id,
        });
      }
    },[])
    const onLike = useCallback(() => {
      if (!userInfo.id) {
        return alert('로그인이 필요합니다.');
      }
      setButtonloading(true);

      setTimeout(()=>{
        setButtonloading(false);
      },500)
      return dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }, [userInfo.id]);
    const onUnlike = useCallback(() => {
      if (!userInfo.id) {
        return alert('로그인이 필요합니다.');
      }
      setButtonloading(true);

      setTimeout(()=>{
        setButtonloading(false);
      },500)
      return dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      }); 
    }, [userInfo.id]);
    
    const liked = post.feedlike.find((v) =>v.userkey===userInfo.id);
   
    return(
      <div className="FeedContainer" key={post.id}>
          <div className="FeedUser">
            <div className="user_zone">
              {post.userProfileImage
              ?<img className="user_image" src={post.userProfileImage.src} alt={post.userProfileImage.src} />
              :<img className="user_image" src={userdefaultimg} alt={userdefaultimg} />}
              
              <span className="user_name">{post.user.nickname}</span>
            </div>
          </div>
          <div className="Feed_Content"> 
            <div className="content_image_zone">
              {post.uploadfile[0]&& <PostImages images={post.uploadfile} />}
            </div>
            <div className="content_zone">
              {editMode
              ?<div><PostCardContent content={post.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} /></div>
              :post.content} <span>더보기</span>
            </div>
            <div className="content_feature">
              <div className="bar-item like">
                {buttonloading?<div style={{marginLeft:15}}><Spinner /></div>
                :liked 
                ?<FaHeart className="bar-icon" onClick={onUnlike}/>
                :<FaRegHeart className="bar-icon" onClick={onLike}/>}
                {post.totallike} 
                {/* {liked 
                ?<FaHeart className="bar-icon" onClick={onUnlike}/>
                :<FaRegHeart className="bar-icon" onClick={onLike}/>}
                {post.totallike} */}
              </div>
              <FaRegCommentAlt className="bar-icon" onClick={()=>onToggleComment(post.id)} />
              <div className="bar-item comment">{post.feedreplysize}</div>
            </div>
                  { post.user.id === userInfo.id
                  ? (
                    <>
                      <Button onClick={onClickUpdate}>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={()=>onRemovePost(post)}  >삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
          <div>
          {commentFormOpened&&<CommentForm post={post} />}
          {commentFormOpened && postComment.map((item,index)=>(
            <>
                <Comment
                  author={item.user.nickname}
                  avatar={(
                    // <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                      <a><Avatar>{item.user.nickname}</Avatar></a>
                    // </Link>
                  )}  
                  content={<ReplyContent replyeditMode={replyeditMode} replyid={item.id} content={item.content} userid={item.user.id} onChangeReplyPost={onChangeReplyPost} onCancleReplyUpdate={onCancleReplyUpdate} />}
                    
                />
                { item.user.id === userInfo.id
                  ?(
                  <>
                    <Button onClick={()=>onClickReplyUpdate(item.id)} >수정</Button>
                    <Button onClick={()=>onClickReplyDelete(item.id)} >삭제</Button>
                  </>
                ):<>회원만 수정가능</>}
            </>                  
          ))}
          </div>
        </div>
      </div>
    )
    // return (
      
    //   <CardWrapper key={post.id}>
    //   <Card
    //     cover={post.uploadfile[0]&& <PostImages images={post.uploadfile} />}
    //     actions={[
    //       liked
    //       ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
    //       : <HeartOutlined key="heart" onClick={onLike} />,
    //       <MessageOutlined key="comment" onClick={onToggleComment} />,
    //       <Popover
    //         key="ellipsis"
    //         content={(
    //           <Button.Group>
    //             { post.user.id === userInfo.id
    //               ? (
    //                 <>
    //                   <Button onClick={onClickUpdate}>수정</Button>
    //                   <Button type="danger" loading={removePostLoading} onClick={onRemovePost}  >삭제</Button>
    //                 </>
    //               )
    //               : <Button>신고</Button>}
    //           </Button.Group>
    //         )}
    //       >
    //         <EllipsisOutlined />
    //       </Popover>,
    //     ]}
    //     // extra={<FollowButton post={post} />}
    //   >
    //     <Card.Meta
    //       // avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
    //       title={post.user.nickname}
    //       description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} totallike={post.totallike} postData={post.content} />}
    //     />
    //   </Card>
    //   {commentFormOpened && (
    //     <>
    //       <CommentForm post={post} />
    //       <List
    //         //header={`${post.feedreply? post.feedreply.length : 0} 댓글`}
    //         itemLayout="horizontal"
    //         dataSource={post.feedreply || []}
    //         renderItem={(item) => (
    //           <li>
                
    //             <Comment
    //               author={item.user.nickname}
    //               avatar={(
    //                 // <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
    //                   <a><Avatar>{item.user.nickname}</Avatar></a>
    //                 // </Link>
    //               )}  
    //               content={<ReplyContent replyeditMode={replyeditMode} replyid={item.id} content={item.content} userid={item.user.id} onChangeReplyPost={onChangeReplyPost} onCancleReplyUpdate={onCancleReplyUpdate} />}
    //                 content={item.content}
    //             />
    //             { item.user.id === userInfo.id
    //               ?(
    //               <>
    //                 <Button onClick={()=>onClickReplyUpdate(item.id)} >수정</Button>
    //                 <Button onClick={()=>onClickReplyDelete(item.id)} >삭제</Button>
    //               </>
    //             ):<>회원만 수정가능</>}
    //           </li>
    //         )}
    //       />
    //     </>
    //   )}
      
    // </CardWrapper>
    
    // )
}

export default PostCard
