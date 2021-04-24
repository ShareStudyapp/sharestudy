import React,{useEffect, useState ,useRef,useCallback,useMemo} from 'react'
import { Form, Input, Button } from 'antd';
import WriteButton from '../Button';
import { useDispatch,useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {UPLOAD_IMAGES_REQUEST,REMOVE_IMAGE,ADD_POST_REQUEST,INIT_ADD_POST} from '../../reducers/post';
import axios from 'axios';

function PostForm({history}) {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { imagePath,imagePaths,uploadImagesDone } = useSelector((state) => state.postReducer);
    const { addPostDone } = useSelector((state) => state.postReducer);
    const [imageList,setImageList] = useState([]);
    const [content,setContent] = useState('');
    const [removeImage,setRemoveImage] = useState([]);
    
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

    useEffect(() => {
      const url = "/feedDetail/263";
      axios.get(url)
      .then(function(response) {
          console.log(response.data)
          setContent(response.data.content);
          setImageList(response.data.uploadfile)

          // response.data.uploadfile.map((item)=>
            
          // )
          
          console.log("성공");
      })
      .catch(function(error) {
          console.log("실패");
      })
    },[])

    useEffect(()=>{
      const obj = {};
      if(uploadImagesDone){
     
//        setImageList(imageList.concat({src:imagePaths.join()}))
        console.log(imagePaths)
        setImageList([...imageList,{src:imagePaths.join()}])
      }
      
    },[uploadImagesDone])
    const onSubmit = useCallback(() => {

        

        const removeFormData = new FormData();
        
        removeImage.map((item)=>{
          removeFormData.append('src',item)  
        })
        
        axios.put('/feed/upload/image/delete',removeImage)
        .then(function(response) {
          
        })
        .catch(function(error) {
        })

        const formData = new FormData();
        imageList.forEach((p) => {
          console.log(p.src)
          formData.append('images',p.src);
        });
        formData.append('content',content);
        axios.patch('/feed/263',formData)
        .then(function(response) {
       
          history.push('/'); 
        })
        .catch(function(error) {
          console.log("실패");
        })
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
          });
  }, [content,imageList,removeImage]);
    const onChangeText = useCallback((e) => {
        setContent(e.target.value);
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
    const onRemoveImage = useCallback((index,src) => () => {
      setImageList(imageList.filter((v, i) => (i !== index)));
      console.log(src)
      setRemoveImage(removeImage.concat(src));
      // const formData = new FormData();
      // formData.append('src',src)
      // axios.put('/feed/upload/image/delete',formData)
      // .then(function(response) {
        
      // })
      // .catch(function(error) {
      // })
    });
    return ( 
        <div className="uploadWrap">
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit} >
                <div className="uploadArea" onClick={onClickImageUpload}>
                    <input type="file" name="image" accept="image/*" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    
                    {/* <Button onClick={onClickImageUpload}>이미지 업로드</Button> */}
                    <div className="uploadAreaPlus">
                      <PlusOutlined />
                    </div>
                </div>
                <div>
                {imageList.map((v, i) => (
                <div key={i} style={{ display: 'inline-block' }}>
                    <img src={`${v.src}`} style={{ width: '100px' }} alt={v} />
                    <div>
                    {v!=='' && <Button onClick={onRemoveImage(i,v.src)}>제거</Button>}
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
                value={content} 
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
