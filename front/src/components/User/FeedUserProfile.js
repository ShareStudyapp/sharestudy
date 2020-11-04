import React,{useState,useCallback} from 'react'
import './FeedUserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "../Utils/Modal";
import {FOLLOWER_LIST_REQUEST,FOLLOWING_LIST_REQUEST} from '../../reducers/user';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
//import three_feature from '../../assets/Button/three_feature.png';
import threefeature from '../../assets/Button/threefeature.png';
import { logoutRequestAction } from '../../reducers/user';

function FeedUserProfile({reqUserInfo,openUserInfo}) {
    //reqUserInfo는 마이페이지에 자신프로필인지 타인인지 구별해주는역할
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userReducer);
    const {otheruserInfo} = useSelector((state) => state.userReducer);
    const [modalOpen,setModalOpen]  = useState(false);
    let [modalOpenValue,setModalOpenValue] = useState("");
    const openFollowerModal = useCallback((id)=>{
        setModalOpenValue("followerList")
        setModalOpen(!modalOpen);
        
        dispatch({
            type: FOLLOWER_LIST_REQUEST,
            data: id,
          });
      },[modalOpen,modalOpenValue])
    const onLogOut = useCallback(() => {        
        const token = window.sessionStorage.getItem('user')    
        dispatch(logoutRequestAction(token));    
    }, []);
    const openFollowingModal = useCallback((id)=>{
        setModalOpenValue("followingList")
        setModalOpen(!modalOpen);
       
        dispatch({
            type: FOLLOWING_LIST_REQUEST,
            data: id,
            });
    },[modalOpen,modalOpenValue])
    return (
        <div className="profile_area">
            {reqUserInfo?
            <div>
                <div className="profile_info_area">
                    <div>
                        <img className="user_profile_image" src={userInfo.profileImage}/>
                    </div>
                    <div className="profile_text_area">
                        <div>
                            <span className="profile_nickname">{userInfo.nickname}</span> {userInfo.sex === 'M'?'남':'여'} 30
                        </div>
                        <ul className="profile_follow_area">
                            <li>
                            <button>
                                <Link to="/profile">프로필편집</Link>
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
                            <li>
                                <img src={threefeature} />
                                <a href="#" onClick={onLogOut}>로그아웃</a>
                            </li>
                        </ul>
                        {modalOpen?<><Modal userInfo={userInfo} modalOpenValue={modalOpenValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:""}
                        <div>
                            {userInfo.introduce}
                        </div>
                    </div>
                </div>
            </div>:
            openUserInfo?<div>
                <div className="profile_info_area">
                    <img className="user_profile_image" src={otheruserInfo.profileImage}/>
                    <div className="profile_text_area">
                        <div>
                            <span className="profile_nickname">{otheruserInfo.nickname}</span> {userInfo.sex === 'M'?'남':'여'} 30
                        </div>
                        <ul className="profile_follow_area">
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
            </div>:''
            }
            <Divider />
      </div>
    )
}

export default FeedUserProfile;
