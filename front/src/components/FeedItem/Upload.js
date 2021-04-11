import React, { useState, useCallback } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {UPLOAD_IMAGES_REQUEST} from '../../reducers/post';
import { useDispatch,useSelector } from 'react-redux';
import { Image } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Button from '../../components/Button';
import '../../components/FeedItem/styles.scss';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UpLoad = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onHandleChange = useCallback((info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    const temp = JSON.stringify({
      name: 'dsf',
      price: 1233,
      sale: 23432 / 100,});
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        const imageFormData = new FormData();
        imageFormData.append('images', info.file.originFileObj);
        imageFormData.append('ffdf', 'dff');     
        setImageUrl(imageUrl);
        setLoading(false);
        
        

        console.log('info.file',info.file.originFileObj);
        console.log('imageFormData',imageFormData)
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData 
        });
      });
      let formData = new FormData();
      formData.append('files', temp);
      console.log('formData',formData)
    }
  }, []);

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>;
  return (
    <>
      <div className="uploadWrap">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:9090/feed/upload"
          beforeUpload={beforeUpload}
          onChange={onHandleChange}
        >
          {uploadButton}
        </Upload>

        <div className="uploadWrap__ImgDel">
          <Image
            width={100}
            height={100}
            src={imageUrl}
          />
          <button className="uploadWrap__ImgDel--delet">
            <CloseOutlined />
          </button>
        </div>

        <hr />
        <h1 className="FeedContent__title feedtxt">Feed Text</h1>
        <textarea
          id="feed__Text"
          name="feed__Text"
          rows="5"
          cols="33"
          placeholder="내용을 입력하세요."
        />
        <Button preBtnNm="삭제하기" nextBtnNm="저장하기" />
      </div>
    </>
  );
};

export default UpLoad;
