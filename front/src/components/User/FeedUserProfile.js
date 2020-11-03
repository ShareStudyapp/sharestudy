import React,{useState,useCallback} from 'react'
import './FeedUserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "../Utils/Modal";
import {FOLLOWER_LIST_REQUEST,FOLLOWING_LIST_REQUEST} from '../../reducers/user';

function FeedUserProfile({reqUserInfo}) {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userReducer);
    const {otheruserInfo} = useSelector((state) => state.userReducer);
    const [modalOpen,setModalOpen]  = useState(false);
    let [modalOpenValue,setModalOpenValue] = useState("");

    const openFollowerModal = useCallback((id)=>{
        setModalOpenValue("followerList")
        setModalOpen(!modalOpen);
        if(userInfo.id){
          dispatch({
            type: FOLLOWER_LIST_REQUEST,
            data: id,
          });
        }else{
          alert('로그인을 해주세요')
        }
        
      },[modalOpen,modalOpenValue])
    const openFollowingModal = useCallback((id)=>{
        setModalOpenValue("followingList")
        setModalOpen(!modalOpen);
        if(userInfo.id){
            dispatch({
            type: FOLLOWING_LIST_REQUEST,
            data: id,
            });
        }else{
            alert('로그인을 해주세요')
        }
    },[modalOpen,modalOpenValue])
    return (
        <div className="profile_area">
            {reqUserInfo?<div>
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
                            <li onClick={() => openFollowingModal(userInfo.id)}>
                                Follow 
                                {userInfo.followlistsize}                               
                            </li>
                            <li onClick={() => openFollowerModal(userInfo.id)}>
                                Follower 
                                {userInfo.followerlistsize}
                            </li>
                        </ul>
                        {modalOpen?<><Modal userInfo={userInfo} modalOpenValue={modalOpenValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:""}
                        <div>
                            {userInfo.introduce}
                        </div>
                    </div>
                </div>
            </div>:<div>
                <div className="profile_info_area">
                    <img className="user_profile_image" src={otheruserInfo.profileImage}/>
                    <div className="profile_text_area">
                        <div>
                            aaa 남 30
                        </div>
                        <ul className="profile_follow_area">
                            <li>
                            <button>
                                    프로필편집     
                            </button>
                            </li>
                            <li onClick={() => openFollowingModal(otheruserInfo.id)}>
                                Follow 
                                {otheruserInfo.followlistsize}                               
                            </li>
                            <li onClick={() => openFollowerModal(otheruserInfo.id)}>
                                Follower 
                                {otheruserInfo.followerlistsize}
                            </li>
                        </ul>
                        {modalOpen?<><Modal userInfo={otheruserInfo} modalOpenValue={modalOpenValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:""}
                        <div>
                            {otheruserInfo.introduce}
                        </div>
                    </div>
                </div>
            </div>
            }
            
      </div>
    )
}

export default FeedUserProfile;
