import React,{useEffect, useState ,useRef,useCallback} from 'react'
import { Form, Input, Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {UPLOAD_IMAGES_REQUEST,REMOVE_IMAGE} from '../../reducers/post';

function PostForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { imagePaths } = useSelector((state) => state.postReducer);
    const imageInput = useRef();

    const onSubmit = useCallback(() => {
        console.log('onclick')
        const imageFormData = new FormData();
        imageFormData.append('image', 'test');
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
        });
      }, []);
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
                <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="오늘 스터디한 내용을 올려주세요~" />
                <div>
                    <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">업로드</Button>
                </div>
                <div>
                {imagePaths.map((v, i) => (
                <div key={v} style={{ display: 'inline-block' }}>
                    <img src={`${v.filePath}`} style={{ width: '200px' }} alt={v} />
                    <div>
                    <Button onClick={onRemoveImage(i)}>제거</Button>
                    </div>
                </div>
                ))}
            </div>
            </Form>
        </div>
    )
}

export default PostForm
