import React, { useEffect, useState ,useRef,useCallback} from 'react'
import FeedList from "./FeedList";
import { Form, Input, Button,Card } from 'antd';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';

const { Meta } = Card;
function Feeds() {
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([])
    const [text, setText] = useState('');
    const imageInput = useRef();
    const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.postReducer);
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
      }, []);
      useEffect(() => {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
        console.log(mainPosts)
      }, []);
    


    return (
      <div>
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" >
          <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="당신의 스토리를 적어주세요" />
          <div>
            <input type="file" multiple hidden ref={imageInput} />
            <Button>이미지 업로드</Button>
            <Button type="primary" style={{ float: 'right' }} htmlType="submit">업로드</Button>
          </div>
      </Form>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </div>
    )    
}

export default Feeds
