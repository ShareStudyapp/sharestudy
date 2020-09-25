import React, { useState, useCallback,useEffect } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import {REMOVE_POST_REQUEST,UPDATE_POST_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST,REMOVE_COMMENT_REQUEST} from '../../reducers/post';
import CommentForm from './CommentForm';
import ReplyContent from './ReplyContent';

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
    const {userInfo} = useSelector((state) => state.userReducer);
    //const [liked, setLiked] = useState(false); 
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [replyeditMode, setReplyeditMode] = useState(false);
    const [replytmp,setReplytmp] = useState('');

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
    const onChangeReplyPost = useCallback((replyeditText) => () => {
      console.log(replyeditText)
      
    }, [post]);
    
    const onToggleComment = useCallback(() => {
      setCommentFormOpened((prev) => !prev);
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
      return dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }, [userInfo.id]);
    const onUnlike = useCallback(() => {
      if (!userInfo.id) {
        return alert('로그인이 필요합니다.');
      }
      return dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    }, [userInfo.id]);
    const liked = post.feedlike.find((v) => v.userkey===userInfo.id);
    return (
      
      <CardWrapper key={post.id}>
      <Card
        cover={post.uploadfile[0]&& <PostImages images={post.uploadfile} />}
        actions={[
          liked
          ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
          : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                { post.user.id === userInfo.id
                  ? (
                    <>
                      <Button onClick={onClickUpdate}>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}  >삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        // extra={<FollowButton post={post} />}
      >
        <Card.Meta
          // avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.user.nickname}
          description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} totallike={post.totallike} postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.feedreply? post.feedreply.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.feedreply || []}
            renderItem={(item) => (
              <li>
                
                <Comment
                  // author={item.user.nickname}
                  // avatar={(
                  //   // <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                  //     <a><Avatar>{item.user.nickname}</Avatar></a>
                  //   // </Link>
                  // )}  
                  // content={<ReplyContent editMode={item.id === replytmp?replyeditMode:''} replyid={item.id} content={item.content} userid={item.user.id} onChangeReplyPost={onChangeReplyPost} onCancleReplyUpdate={onCancleReplyUpdate} />}
                    content={item.content}
                />
                {/* { item.user.id === userInfo.id
                  ?(
                  <>
                    <Button onClick={()=>onClickReplyUpdate(item.id)} >수정</Button>
                    <Button onClick={()=>onClickReplyDelete(item.id)} >삭제</Button>
                  </>
                ):<>회원만 수정가능</>} */}
              </li>
            )}
          />
        </>
      )}
      
    </CardWrapper>
    
    )
}

export default PostCard
