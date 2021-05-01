import React, { useState, useCallback } from 'react';
import getCroppedImg from '../../utils/cropImage';
import Cropper from 'react-easy-crop';

const CropImage = ({ image, onCrop, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onClickCrop = useCallback(async () => {
    const croppedImage = await getCroppedImg(image.name, image.url, croppedAreaPixels, 0);
    onCrop(croppedImage);
    onClose();
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

export default CropImage;
