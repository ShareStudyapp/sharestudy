import React,{useEffect, useState ,useRef,useCallback} from 'react'
import { Form, Input, Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {UPLOAD_IMAGES_REQUEST,REMOVE_IMAGE,ADD_POST_REQUEST,INIT_ADD_POST} from '../../reducers/post';

function PostForm({history}) {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { imagePaths } = useSelector((state) => state.postReducer);
    const { addPostDone } = useSelector((state) => state.postReducer);
    
    const imageInput = useRef();
    useEffect(() => {
        if (addPostDone) {
          setText('');
          dispatch({
            type: INIT_ADD_POST,
          });
          history.push('/');
        }
      }, [addPostDone]);
    const onSubmit = useCallback(() => {

        const formData = new FormData();
        
        imagePaths.forEach((p) => {
          formData.append('images',p);
        });
        formData.append('content', text);
        
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
          });
        }, [text, imagePaths]);
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);
    
    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('images', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    });
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
          type: REMOVE_IMAGE,
          data: index,
        });
      });
    return (
        <div>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit} >
                <div>
                    <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">완료</Button>
                </div>
                <div>
                {imagePaths.map((v, i) => (
                <div key={v} style={{ display: 'inline-block' }}>
                    <img src={`${v}`} style={{ width: '200px' }} alt={v} />
                    <div>
                    <Button onClick={onRemoveImage(i)}>제거</Button>
                    </div>
                </div>
                ))}
            <Input.TextArea style={{height:500 }} value={text} onChange={onChangeText} maxLength={500} placeholder="오늘 스터디한 내용을 올려주세요~" />
            </div>
            </Form>
        </div>
    )
}

export default PostForm
