import React, { useState } from 'react';
import {ImageCrop} from "./ImageCrop";
import {Modal}  from './Modal';
import { verifyFile } from './verifyFile';
import defaultImage from '../../assets/images/user_default.png';

import './style.scss';


const ProfileImage = () => {
    const initialState = {
        userProfileImg: null,
        selectedFile: null,
        editor: null
    };

    let imageEditor= null;
    const [ imageData, setImageData ] = useState(initialState);
    const [ showModal, setShowModal] = useState(false);

    const setEditorRef = (editor) => imageEditor = editor;

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const onCrop = () => {
        if ( imageEditor !== null ){
            const url = imageEditor.getImageScaledToCanvas().toDataURL();     
            setImageData({ userProfileImg : url });
        }
        toggleModal();
    }
   
    const onImageFileChangeHandler = (e) => {
        const file = e.target.files[0];

        if( file !== undefined && verifyFile(file)){
            
            setImageData({ selectedFile : file });
            setShowModal(true);
        }
    }

    const renderProfileImage = () => {
        const profileImage = imageData.userProfileImg ? 
                                imageData.userProfileImg : 
                                defaultImage;

        return(
            <img className='profile-image' src={profileImage} alt='user-logo' />
        )
    }

    return(
        <div className='mainDiv'>
            {renderProfileImage()}
            <br/>
            <label className='labelUpload' title="Select image">  
                <input 
                    hidden
                    type     ='file'
                    name     ='profileImg'
                    accept   ='image/png, image/jpeg, image/jpg'
                    onChange ={onImageFileChangeHandler}
                />
                Select image
            </label>
            
            <Modal 
                show    ={showModal}
                onClose ={toggleModal}
                title   ='Crop'>

                <ImageCrop 
                    imagefile     ={imageData.selectedFile} 
                    setEditorRef  ={setEditorRef} 
                    onCrop        ={onCrop} 
                />  
                
            </Modal>
        </div>
    );
} 
export default ProfileImage
