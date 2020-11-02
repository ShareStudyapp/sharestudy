import React,{useState,useCallback} from 'react'
import './FeedUserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "../Utils/Modal";
import {FOLLOWER_LIST_REQUEST} from '../../reducers/user';

function FeedUserProfile() {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userReducer);
    const [modalOpen,setModalOpen]  = useState(false);
    const modalOpenValue="followerList";

    const openFollowerModal = useCallback((id)=>{
        
        setModalOpen(!modalOpen)
        if(userInfo.id){
          dispatch({
            type: FOLLOWER_LIST_REQUEST,
            data: id,
          });
        }else{
          alert('로그인을 해주세요')
        }
         
      },[])
    return (
        <div className="profile_area">
            <div>
                <div className="profile_info_area">
                    <img className="user_profile_image" src={userInfo.profileImage}/>
                    <div className="profile_text_area">
                        <div>
                            userNickname 남 30
                        </div>
                        <ul className="profile_follow_area">
                            <li>
                            <button>
                                    프로필편집  
                            </button>
                            </li>
                            <li>
                                Follow 
                                {userInfo.followlistsize}
                               
                            </li>
                            <li onClick={() => openFollowerModal(userInfo.id)}>
                                Follower 
                                {userInfo.followerlistsize}
                                {modalOpen?<><Modal userInfo={userInfo} modalOpenValue={modalOpenValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:""}
                            </li>
                        </ul>
                        <div>
                            {userInfo.introduce}
                        </div>
                    </div>
                </div>
                
            </div>
      </div>
    )
}

export default FeedUserProfile;
