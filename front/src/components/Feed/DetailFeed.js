import React,{useEffect,useState,useCallback} from 'react'
import DetailFeedInfo from './DetailFeedInfo';
import { useSelector, useDispatch } from 'react-redux';
import {LOAD_POSTS_DETAIL_REQUEST} from '../../reducers/post';
import PostCard from './PostCard';
import {  Button, Avatar, Comment,Input,Form } from 'antd';
import CommentForm from './CommentForm';
import ReplyContent from './ReplyContent';
import {REMOVE_COMMENT_REQUEST,UPDATE_COMMENT_REQUEST} from '../../reducers/post';
import {ADD_COMMENT_REQUEST} from '../../reducers/post';

import useInput from '../../hooks/useInput';


function DetailFeed({match}) {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userReducer);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [modalOpen,setModalOpen]  = useState(false);
    const [replyeditMode, setReplyeditMode] = useState(false);
    const [replytmp,setReplytmp] = useState('');
    const { postComment,loadPostsDone } = useSelector((state) => state.postReducer);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    const postId = match.params.id;
    console.log(postComment)
    const onSubmitComment = useCallback(() => {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, id: postId },
      });
      setCommentText('')
    }, [commentText,postId]);
    useEffect(() => {
        
        dispatch({
            type: LOAD_POSTS_DETAIL_REQUEST,
            data:  match.params.id
          });

    }, [])
    const onClickReplyUpdate = useCallback((replyid) => {
        setReplytmp(replyid);
        setReplyeditMode(true);
      }, []);
    const onCancleReplyUpdate = useCallback(() => {
      setReplyeditMode(false);
    }, []);
    const onClickReplyDelete = useCallback((id)=>{
    
      if(window.confirm("삭제 하시겠습니까?")) {
        return dispatch({
          type: REMOVE_COMMENT_REQUEST,
          data: id,
        });
      }
    },[])
    const onChangeReplyPost = useCallback((replyid,replyeditText) => () => {
      
      dispatch({
        type: UPDATE_COMMENT_REQUEST,
        data: {
          id: replyid,
          content: replyeditText,
        },
      });
    }, []);
    return (
            <>
              {commentFormOpened&&<CommentForm post={postComment} />}
              <Form onFinish={onSubmitComment}>
              <Form.Item style={{ position: 'relative', margin: 0 }}>
                  <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                  <Button
                    style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
                    type="primary"
                    htmlType="submit"
                  >삐약
                  </Button>
                </Form.Item>
              </Form>
              {loadPostsDone&&postComment.feedreply?postComment.feedreply.map((item,index)=>(
              <>
                  <Comment
                    author={item.user.nickname}
                    avatar={(
                      // <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                        <a><Avatar>{item.user.nickname}</Avatar></a>
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
            )):'loading...'}
            </>         
    )
}

export default DetailFeed