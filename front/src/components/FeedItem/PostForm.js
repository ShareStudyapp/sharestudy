import React, { useEffect, useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import PostSlider from './PostSlider';
import { Form, Input, Button } from 'antd';
import WriteButton from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
  INIT_ADD_POST
} from '../../reducers/post';
import getCroppedImg from '../../utils/cropImage';

function PostForm({ history }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { imagePaths } = useSelector((state) => state.postReducer);
  const { addPostDone } = useSelector((state) => state.postReducer);
  const [showCrop, setShowCrop] = useState(false);
  const [cropImage, setCropImage] = useState({});

  const imageInput = useRef();
  useEffect(() => {
    if (addPostDone) {
      setText('');
      dispatch({
        type: INIT_ADD_POST
      });
      history.push('/');
    }
  }, [addPostDone]);
  const onSubmit = useCallback(() => {
    const formData = new FormData();

    imagePaths.forEach((p) => {
      formData.append('images', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths]);
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    if (e.target.files[0]) {
      setShowCrop(true);
      setCropImage({ url: URL.createObjectURL(e.target.files[0]), name: e.target.files[0].name });
    }
  });
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
  });

  const onCrop = useCallback((image) => {
    const imageFormData = new FormData();
    imageFormData.append('images', image);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  }, []);
  return (
    <div className="uploadWrap">
      <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
        <div onClick={onClickImageUpload}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#2656FF" />
            <path
              d="M25.9231 24.42H32.8881V26.905H25.9231V34.115H23.4031V26.905H16.4381V24.42H23.4031V17.175H25.9231V24.42Z"
              fill="white"
            />
          </svg>
          <span style={{ position: 'absolute', lineHeight: '25px', marginLeft: 10 }}>
            사진을 추가해주세요.
          </span>

          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
        </div>
        {showCrop && <CropImage image={cropImage} onCrop={onCrop} setShowCrop={setShowCrop} />}
        {imagePaths.length > 0 ? (
          <PostSlider images={imagePaths} onRemoveImage={onRemoveImage} />
        ) : (
          <div className="uploadArea" style={{ marginTop: '10px' }}>
            <div></div>
          </div>
        )}

        {/* {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`${v}`} style={{ width: '100px' }} alt={v} />
            <div>{v !== '' && <Button onClick={onRemoveImage(i)}>제거</Button>}</div>
          </div>
        ))} */}
        {/* <div
          className="uploadArea"
          onClick={onClickImageUpload}
          style={{ marginTop: '10px' }}
        ></div> */}
        <div>
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

            <button name="next" type="submit" className="right">
              {'완료'}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

const CropImage = ({ image, onCrop, setShowCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onClickCrop = useCallback(async () => {
    const croppedImage = await getCroppedImg(image.name, image.url, croppedAreaPixels, 0);
    console.log(croppedImage);
    onCrop(croppedImage);
    setShowCrop(false);
  }, [croppedAreaPixels]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: '#d3d3d3'
      }}
    >
      <Cropper
        image={image.url}
        crop={crop}
        zoom={zoom}
        aspect={3 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <button
        onClick={onClickCrop}
        type="button"
        style={{
          backgroundColor: 'blue',
          color: 'white',
          position: 'absolute',
          right: '20px',
          top: '2%',
          textAlign: 'center',
          padding: '1% 5%',
          borderRadius: '30px'
        }}
      >
        확인
      </button>
    </div>
  );
};

export default PostForm;
