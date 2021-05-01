import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PostSlider from './PostSlider';
import CropImage from './CropImage';
import { getNormalizedFile } from '../../utils/cropImage';
import { UPLOAD_IMAGES_REQUEST, UPDATE_POST_CLEAR, UPDATE_POST_REQUEST } from '../../reducers/post';
import axios from 'axios';

function PostForm({ history, postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [showCrop, setShowCrop] = useState(false);
  const { imagePath, uploadImagesDone } = useSelector((state) => state.postReducer);
  const { updatePostDone } = useSelector((state) => state.postReducer);
  const [imageList, setImageList] = useState([]);
  const [content, setContent] = useState('');
  const [removeImage, setRemoveImage] = useState([]);
  const [cropImage, setCropImage] = useState({});

  const imageInput = useRef();
  useEffect(() => {
    if (updatePostDone) {
      setText('');
      dispatch({
        type: UPDATE_POST_CLEAR
      });
      history.push('/');
    }
  }, [updatePostDone]);

  useEffect(() => {
    const url = `/feedDetail/${postId}`;
    axios
      .get(url)
      .then(function (response) {
        console.log(response.data);
        setContent(response.data.content);
        setImageList(response.data.uploadfile);
        console.log('성공');
      })
      .catch(function (error) {
        console.log('실패');
      });
  }, [postId]);

  useEffect(() => {
    if (uploadImagesDone) {
      setImageList([...imageList, { src: imagePath.join() }]);
    }
  }, [uploadImagesDone]);
  const onSubmit = useCallback(() => {
    const removeFormData = new FormData();

    removeImage.map((item) => {
      removeFormData.append('src', item);
    });
    if (removeImage.length !== 0) {
      axios
        .put('/feed/upload/image/delete', removeFormData)
        .then(function (response) {})
        .catch(function (error) {});
    }

    const formData = new FormData();
    imageList.forEach((p) => {
      console.log(p.src);
      formData.append('images', p.src);
    });
    formData.append('id', postId);
    formData.append('content', content);
    return dispatch({
      type: UPDATE_POST_REQUEST,
      data: formData
    });
  }, [content, imageList, removeImage]);
  const onChangeText = useCallback((e) => {
    setContent(e.target.value);
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

  const onCrop = useCallback((image) => {
    const imageFormData = new FormData();
    imageFormData.append('images', image);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  }, []);

  const onRemoveImage = useCallback((index, src) => () => {
    setImageList(imageList.filter((v, i) => i !== index));
    setRemoveImage(removeImage.concat(src));
  });

  const onClose = useCallback(() => {
    setShowCrop(false);
    document.body.style.overflow = 'unset';
  });
  console.log(imageList);
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
        {imageList.length > 0 ? (
          <PostSlider images={imageList.map((v) => v.src)} onRemoveImage={onRemoveImage} />
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
            value={content}
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
