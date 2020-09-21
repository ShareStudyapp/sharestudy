import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PostImages from './PostImages';
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
    const { removePostLoading } = useSelector((state) => state.postReducer);
    const {me} = useSelector((state) => state.userReducer);
    const [liked, setLiked] = useState(false); 
    
    console.log('postcard------------------')
    console.log(me)
    return (
      
      <CardWrapper key={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart"  />
            : <HeartOutlined key="heart"  />,
          <MessageOutlined key="message"  />,
          <Popover
            key="ellipsis"
            // content={(
            //   <Button.Group>
            //     {id && post.UserId === id
            //       ? (
            //         <>
            //           <Button>수정</Button>
            //           <Button type="danger"  >삭제</Button>
            //         </>
            //       )
            //       : <Button>신고</Button>}
            //   </Button.Group>
            // )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        // extra={<FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
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
