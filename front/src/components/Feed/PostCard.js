import React, { useState, useCallback,useEffect } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import {REMOVE_POST_REQUEST,UPDATE_POST_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST} from '../../reducers/post';

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
    const [liked, setLiked] = useState(false); 
    const [editMode, setEditMode] = useState(false);

  console.log(post)

    const onClickUpdate = useCallback(() => {
      setEditMode(true);
    }, []);
  
    const onCancelUpdate = useCallback(() => {
      setEditMode(false);
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
    
    return (
      
      <CardWrapper key={post.id}>
      <Card
        cover={post.uploadfile[0]&& <PostImages images={post.uploadfile} />}
        actions={[
          liked
          ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
          : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="message"  />,
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
          description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content} />}
        />
      </Card>
      {/* {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )} */}
    </CardWrapper>
    )
}

export default PostCard
