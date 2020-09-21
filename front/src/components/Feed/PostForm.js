import React,{useEffect, useState ,useRef,useCallback} from 'react'
import { Form, Input, Button } from 'antd';
function PostForm() {

    const [text, setText] = useState('');

    const imageInput = useRef();

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
      }, [imageInput.current]);
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        // dispatch({
        //     type: UPLOAD_IMAGES_REQUEST,
        //     data: imageFormData,
        // });
    });
    return (
        <div>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" >
                <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="오늘 스터디한 내용을 올려주세요~" />
                <div>
                    <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">업로드</Button>
                </div>
            </Form>
        </div>
    )
}

export default PostForm
