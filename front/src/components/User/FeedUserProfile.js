import React,{useState,useCallback} from 'react'
import './FeedUserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "../Utils/Modal";
import {FOLLOWER_LIST_REQUEST,FOLLOWING_LIST_REQUEST} from '../../reducers/user';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import threefeature from '../../assets/Button/threefeature.png';
import { logoutRequestAction } from '../../reducers/user';
import {FOLLOW_REQUEST,FOLLOW_CANCLE_REQUEST} from '../../reducers/user';

function FeedUserProfile({reqUserInfo,openUserInfo}) {
    //reqUserInfo는 마이페이지에 자신프로필인지 타인인지 구별해주는역할
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userReducer);
    const {otheruserInfo} = useSelector((state) => state.userReducer);
    const { followInfo,unfollowDone } = useSelector((state) => state.userReducer);
    const [modalOpen,setModalOpen]  = useState(false);
    let [modalOpenValue,setModalOpenValue] = useState("");
    let followingCheck = userInfo.followlist.map(v=>v.fromUser.id===otheruserInfo.id).find(f=>f===true)===true?true:false;;
    

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
    },[modalOpen,modalOpenValue]);
    const follow = useCallback((id) => {
        if (!userInfo.id) {
          return alert('로그인이 필요합니다.');
        }
        //setButtonloading(true);
   
        // setTimeout(()=>{
        //   setButtonloading(false);
        // },500)

        return dispatch({
          type: FOLLOW_REQUEST,
          data: id,
        }); 
      }, [userInfo.id]);
      const followCancle = useCallback((id) => {
        if (!userInfo.id) {
          return alert('로그인이 필요합니다.');
        }

        return dispatch({
          type: FOLLOW_CANCLE_REQUEST,
          data: id,
        }); 
      }, [userInfo.id]);

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
                            {/* <li onClick={() => openFollowingModal(userInfo.id)}>
                                팔로워 
                                {userInfo.followlistsize}                               
                            </li>
                            <li onClick={() => openFollowerModal(userInfo.id)}>
                                팔로잉 
                                {userInfo.followerlistsize}
                            </li> */}
                            <li>팔로워{userInfo.followlistsize} </li>
                            <li>팔로잉{userInfo.followerlistsize} </li>
                            <li>
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
                    {/* 다른사람정보여부 */}
                    <div className="profile_info_area">
                        <img className="user_profile_image" src={otheruserInfo.profileImage}/>
                        <div className="profile_text_area">
                            <div>
                                <span className="profile_nickname">{otheruserInfo.nickname}</span> {userInfo.sex === 'M'?'남':'여'} 30{otheruserInfo.followlistsize}
                            </div>
                            <ul className="profile_follow_area">
                                <li>
                                    <>
                                    {/* {typeof userInfo.followlist !== 'undefined'&&userInfo.followlist.find(e=>e.fromUser.id === otheruserInfo.id) || followInfo.find(e=>e.userkey===otheruserInfo.id) */}
                                    {/* {followingCheck ||typeof userInfo.followlist !== 'undefined'&&userInfo.followlist.find(e=>e.fromUser.id === otheruserInfo.id) || followInfo.find(e=>e.userkey===otheruserInfo.id) */}
                                    {userInfo.id===otheruserInfo.id?"":followingCheck
                                        ?<button className="following_btn" onClick={()=>followCancle(otheruserInfo.id)} />
                                        :<button className="follow_btn" onClick={()=>follow(otheruserInfo.id)} />                                                                        
                                    }
                                    </>
                                </li>
                                <li onClick={() => openFollowingModal(otheruserInfo.id)}>
                                    팔로워 
                                    {otheruserInfo.followlistsize}                               
                                </li>
                                <li onClick={() => openFollowerModal(otheruserInfo.id)}>
                                    팔로잉 
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
