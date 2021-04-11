import React,{useEffect, useState ,useRef,useCallback} from 'react'
import { Form, Input, Button } from 'antd';
import WriteButton from '../../components/Button';
import { useDispatch,useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
          //history.push('/'); 
        }
      }, [addPostDone]);
    const onSubmit = useCallback(() => {

        const formData = new FormData();
        
        imagePaths.forEach((p) => {
          console.log('p',p)
          formData.append('images',p);
        });
        formData.append('content',text);
        console.log(formData);
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
            console.log('f',f)
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
        <div className="uploadWrap">
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit} >
                <div className="uploadArea" onClick={onClickImageUpload}>
                    <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    
                    {/* <Button onClick={onClickImageUpload}>이미지 업로드</Button> */}
                    <div className="uploadAreaPlus">
                      <PlusOutlined />
                    </div>
                </div>
                <div>
                {imagePaths.map((v, i) => (
                <div key={v} style={{ display: 'inline-block' }}>
                    <img src={`${v}`} style={{ width: '100px' }} alt={v} />
                    <div>
                    {v!=='' && <Button onClick={onRemoveImage(i)}>제거</Button>}
                    </div>
                </div>
                ))}
            {/* <Input.TextArea style={{height:500 }} value={text} onChange={onChangeText} maxLength={500} placeholder="오늘 스터디한 내용을 올려주세요~" /> */}
            
              <hr />
              <h1 className="FeedContent__title feedtxt">Feed Text</h1>
              <textarea
                id="feed__Text"
                name="feed__Text"
                rows="5"
                cols="33"
                value={text} 
                onChange={onChangeText}
                placeholder="내용을 입력하세요."
              />
              {/* <WriteButton preBtnNm="삭제하기" nextBtnNm="저장하기" /> */}
              {/* <Button type="primary" style={{ float: 'right' }} htmlType="submit">완료</Button> */}
                <div className="PreNextBtn">
                  {/* <button name="pre" type="button" className="left" onClick={preBtnClick} >
                    {preBtnNm}
                  </button> */}

                  <button name="next" type="submit" className="right" >
                    {'완료'}
                  </button>
                </div>
              </div>
            
            </Form>
        </div>
    )
}

export default PostForm
