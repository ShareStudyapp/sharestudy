import React, { useState,useRef,useEffect } from 'react';
import {ImageCrop} from "./ImageCrop";
import {Modal}  from './Modal';
import { verifyFile } from './verifyFile';
import defaultImage from '../../assets/images/user_default.png';
import { useDispatch,useSelector } from 'react-redux';
import {UPLOAD_PROFILE_IMAGES_REQUEST} from '../../reducers/user';

import './style.scss';


const ProfileImage = ({profileImg}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userReducer);
    
    const initialState = {
        userProfileImg: userInfo.profileImage?userInfo.profileImage:null,
        selectedFile: null,
        editor: null
    };

    useEffect(() => {
        setTempimg(userInfo.profileImage);
    },[userInfo])

    let imageEditor= null;
    const [ imageData, setImageData ] = useState(initialState);
    const [ tempimg,setTempimg] = useState('');
    const [ showModal, setShowModal] = useState(false);
    const [fname,setFname] = useState('');
    const imageInput = useRef();
    const setEditorRef = (editor) => imageEditor = editor;

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    //base 64 to file 변환 함수
    const dataURLtoFile = (dataurl, fileName) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type:mime});
    }
    const onCrop = (e) => {
        if ( imageEditor !== null ){
            const url = imageEditor.getImageScaledToCanvas().toDataURL();     
            setImageData({ userProfileImg : url });
            
            var file = dataURLtoFile(url,fname);
            const imageFormData = new FormData();
            imageFormData.append('images', file);
            console.log(tempimg);
            dispatch({
                type: UPLOAD_PROFILE_IMAGES_REQUEST,
                data: imageFormData,
            });
        }
        toggleModal();
    }
   /*파일첨부.. */
    const onImageFileChangeHandler = (e) => {
        const file = e.target.files[0];
        setFname(file.name);

        if( file !== undefined && verifyFile(file)){
            
            setImageData({ selectedFile : file });
            setShowModal(true);
            
        }
    }

    const renderProfileImage = () => {
        console.log(imageData)
        const profileImage = userInfo.profileImage ? 
                             userInfo.profileImage : 
                                defaultImage;
        return(
            <img className='profile-image' src={profileImage} id="profile-img" alt='user-logo' />
        )
    }

    return(
        <div className='mainDiv'>
            {renderProfileImage()}
            <br/>
            <label className='labelUpload' title="사진 변경">  
                <input 
                    hidden
                    type     ='file'
                    name     ='profileImg'
                    accept   ='image/png, image/jpeg, image/jpg'
                    onChange ={onImageFileChangeHandler}
                />
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
