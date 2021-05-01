import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostSlider from './PostSlider';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
  INIT_ADD_POST
} from '../../reducers/post';
import { getNormalizedFile } from '../../utils/cropImage';
import CropImage from './CropImage';

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

  const readFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        getNormalizedFile(file)
          .then((normalizedFile) => reader.readAsDataURL(normalizedFile))
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const onChangeImages = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (file) {
        const filename = e.target.files[0].name;
        const imageDataUrl = await readFile(file);
        setCropImage({ url: imageDataUrl, name: filename });
        setShowCrop(true);
        document.body.style.overflow = 'hidden';
      }
    },
    [readFile]
  );

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

  const onClose = useCallback(() => {
    setShowCrop(false);
    document.body.style.overflow = 'unset';
  });

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
        {showCrop && <CropImage image={cropImage} onCrop={onCrop} onClose={onClose} />}
        {imagePaths.length > 0 ? (
          <PostSlider images={imagePaths} onRemoveImage={onRemoveImage} />
        ) : (
          <div className="uploadArea" style={{ marginTop: '10px' }}>
            <div></div>
          </div>
        )}

        <div>
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
          <div className="PreNextBtn">
            <button name="next" type="submit" className="right">
              완료
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default PostForm;
