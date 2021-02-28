import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imageZoom';
import PreloadImage from 'react-preload-image';
import './PostImages.css';
import Carousel from 'nuka-carousel';

const PostImages = ({ images }) => {

  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []); 

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  return (
    <>
      <div className="postimage_area">
      <Carousel enableKeyboardControls={false}>
          {images.map((v) => (
            <div onClick={onZoom}>
                    <PreloadImage 
                        className="preloadImage"
                        src={v.src}
                        alt={v.src} 
                        onClick={onZoom}
                        lazy 
                    />
            </div>        
            ))}
          
        </Carousel>
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
