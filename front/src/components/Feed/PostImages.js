import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imageZoom';


const PostImages = ({ images }) => {

  const imagestyle={
    width:"300px",
    height:"300px",
  }

  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[1].src} style={imagestyle} alt={images[1].src} width="50%" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 3) {
    return (
      <>
        <div>
          <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[1].src} style={imagestyle} alt={images[1].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[2].src} style={imagestyle} alt={images[2].src} width="50%" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 4) {
    return (
      <>
        <div>
          <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[1].src} style={imagestyle} alt={images[1].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[2].src} style={imagestyle} alt={images[2].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[3].src} style={imagestyle} alt={images[3].src} width="50%" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} width="50%" onClick={onZoom} />
        <img role="presentation" src={images[1].src} style={imagestyle} alt={images[1].src} width="50%" onClick={onZoom} />
        <img role="presentation" src={images[2].src} style={imagestyle} alt={images[2].src} width="50%" onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 3}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

// PostImages.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.shape({
//     src: PropTypes.string,
//   })).isRequired,
// };

export default PostImages;
