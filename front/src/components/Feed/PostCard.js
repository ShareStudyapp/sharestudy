import React, { useState, useCallback } from 'react';
import {  Button,Comment} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import {REMOVE_POST_REQUEST,UPDATE_POST_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST,REMOVE_COMMENT_REQUEST,LOAD_POSTS_COMMENT_REQUEST,UPDATE_COMMENT_REQUEST,LIKE_LIST_REQUEST} from '../../reducers/post';
import CommentForm from './CommentForm';
import ReplyContent from './ReplyContent';
import './PostCard.css';
import userdefaultimg from '../../assets/images/user_default.png';
import { FaHeart,FaRegHeart,FaRegCommentAlt } from "react-icons/fa";
import Spinner from '../Utils/Spinner';
import PostCardContent from './PostCardContent';
import Modal from "../Utils/Modal";

import { format,register } from 'timeago.js';
import {localeFunc} from './Common/localeFunc';


function PostCard({post,setTargetUserId,targetUserInfo}) {
    
    const dispatch = useDispatch();
    const { removePostLoading} = useSelector((state) => state.postReducer);
    const { mainPosts } = useSelector((state) => state.postReducer);
    const {userInfo} = useSelector((state) => state.userReducer);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [replyeditMode, setReplyeditMode] = useState(false);
    const [replytmp,setReplytmp] = useState('');
    const [buttonloading,setButtonloading] = useState(false);
    const [modalOpen,setModalOpen]  = useState(false);
    const modalOpenValue="likelist";
    register('my-locale', localeFunc);
    const relativeDate = format(post.createdAt,'my-locale');

    const onClickUpdate = useCallback(() => {
      setEditMode(true);
    }, []);
  
    const onCancelUpdate = useCallback(() => {
      setEditMode(false);
    }, []);
    const onClickReplyUpdate = useCallback((replyid) => {
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
  
    const onRemovePost = useCallback(() => {
      if (!userInfo.id) {
        return alert('로그인이 필요합니다.');
      }
      if(window.confirm("삭제 하시겠습니까?")) {
        return dispatch({
          type: REMOVE_POST_REQUEST,
          data: post.id,
        });
      }

    }, []);
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
    const openLikeModal = useCallback((id)=>{
      
      setModalOpen(!modalOpen)
      if(userInfo.id){
        dispatch({
          type: LIKE_LIST_REQUEST,
          data: id,
        });
      }else{
        alert('로그인을 해주세요')
      }
       
    },[modalOpen])
    const testClick = useCallback(()=>{
      setModalOpen(true);

    },[])
    const onToggleComment = useCallback((postid) => {
      setCommentFormOpened((prev) => !prev);
      dispatch({
        type: LOAD_POSTS_COMMENT_REQUEST,
        data:  postid
      });
    }, []);
    
    const liked = post.feedlike.find((v) =>v.userkey===userInfo.id);
    return(
      <div className="FeedContainer" key={post.id}>
        <div className="Feed_area">
            <div className="FeedUser">
              <div className="user_zone" onClick={()=>targetUserInfo(post.user.id)}>
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
                  ?<FaHeart style={{color:'red'}} className="bar-icon" onClick={onUnlike}/>
                  :<FaRegHeart className="bar-icon" onClick={onLike}/>}
                  <div onClick={() => openLikeModal(post.id)}>{post.totallike}</div>
                  {modalOpen?<><Modal userInfo={userInfo} modalOpenValue={modalOpenValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:""}
                </div>
                <FaRegCommentAlt className="bar-icon" onClick={()=>onToggleComment(post.id)} />
                {/* <Link to={`/feeddetail/${post.id}`} style={{ textDecoration: 'none', color: 'inherit',marginLeft:40 }}><FaRegCommentAlt className="bar-icon"/></Link> */}
                {/* <FaRegCommentAlt className="bar-icon" onClick={onToggleComment} /> */}
                <div className="bar-item comment">{post.feedreplysize}</div>
                </div>
                      { post.user.id === userInfo.id
                      ? (
                        <>
                          <Button onClick={onClickUpdate}>수정</Button>
                          <Button type="danger" loading={removePostLoading} onClick={()=>onRemovePost(post)}  >삭제</Button>
                        </>
                      )
                      : <Button onClick={testClick}>신고</Button>}
                <div>
                  <div className="create_time">
                    {relativeDate}
                  </div>
                  {commentFormOpened && <CommentForm post={post} />}
                  {commentFormOpened&&post.feedreply.map((item,index)=>(
                    <>
                        <Comment
                          author={item.user.nickname}
                          avatar={(
                            // <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                              <a><img src={item.user.userProfileImage.src}></img></a>
                            // </Link>
                          )}  
                          content={<ReplyContent replyeditMode={replyeditMode} replyid={item.id} content={item.content} userid={item.user.id} onChangeReplyPost={onChangeReplyPost} onCancleReplyUpdate={onCancleReplyUpdate} />}
                          datetime={
                            item.createdAt.substring(0,10)+"  "+item.createdAt.substring(11,20)
                          }
                        />
                        {/* { item.user.id === userInfo.id
                          ?(
                          <>
                            <Button onClick={()=>onClickReplyUpdate(item.id)} >수정</Button>
                            <Button onClick={()=>onClickReplyDelete(item.id)} >삭제</Button>
                          </>
                        ):<>회원만 수정가능</>} */}
                    </>                  
                  ))}
              </div>
            </div>
          </div>
        </div>
    )
    
}

export default PostCard
