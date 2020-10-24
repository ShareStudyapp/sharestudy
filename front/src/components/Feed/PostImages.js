import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imageZoom';
import PreloadImage from 'react-preload-image';
import './PostImages.css';


const PostImages = ({ images }) => {

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
        {/* <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} onClick={onZoom} /> */}
        <div onClick={onZoom}>
          <PreloadImage 
            className="preloadImage"
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
            lazy 
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <div onClick={onZoom}>
          <PreloadImage 
            className="twopreloadImage"
            src={images[0].src}
            alt={images[0].src} 
            onClick={onZoom}
            lazy 
          />
          </div>
          <div onClick={onZoom}>
          <PreloadImage 
            className="twopreloadImage"
            src={images[1].src}
            alt={images[1].src} 
            onClick={onZoom}
            lazy 
          />
          </div>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 3) {
    return (
      <>
        <div>
          <div onClick={onZoom}>
          <PreloadImage 
            className="threepreloadImage"
            src={images[0].src}
            alt={images[0].src} 
            onClick={onZoom}
            lazy 
          />
          </div>
          <div onClick={onZoom}>
          <PreloadImage 
            className="threepreloadImage"
            src={images[1].src}
            alt={images[1].src} 
            onClick={onZoom}
            lazy 
          />
          </div>
          <div onClick={onZoom}>
          <PreloadImage 
            className="threepreloadImage"
            src={images[2].src}
            alt={images[2].src} 
            onClick={onZoom}
            lazy 
          />
          </div>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 4) {
    return (
      <>
        <div>
          {/* <img role="presentation" src={images[0].src} style={imagestyle} alt={images[0].src} width="50%" onClick={onZoom} /> */}
          <PreloadImage 
            className="threepreloadImage"
            src={images[0].src}
            alt={images[0].src} 
            onClick={onZoom}
            lazy 
          />
          <PreloadImage 
            className="threepreloadImage"
            src={images[1].src}
            alt={images[1].src} 
            onClick={onZoom}
            lazy 
          />
          <PreloadImage 
            className="threepreloadImage"
            src={images[2].src}
            alt={images[2].src} 
            onClick={onZoom}
            lazy 
          />
          <PreloadImage 
            className="threepreloadImage"
            src={images[3].src}
            alt={images[3].src} 
            onClick={onZoom}
            lazy 
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <PreloadImage 
            className="threepreloadImage"
            src={images[3].src}
            alt={images[3].src} 
            onClick={onZoom}
            lazy 
        />
        <PreloadImage 
            className="threepreloadImage"
            src={images[3].src}
            alt={images[3].src} 
            onClick={onZoom}
            lazy 
        />
        <PreloadImage 
            className="threepreloadImage"
            src={images[3].src}
            alt={images[3].src} 
            onClick={onZoom}
            lazy 
        />  
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
