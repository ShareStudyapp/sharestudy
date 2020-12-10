import React,{useState,useCallback} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from '../../components/SignUp/ProfileImage';
import MainLogo from '../../components/Common/MainLogo';
import MainNav from '../../components/Common/MainNav';

import Age from '../../components/Common/Select/Age';
import Sex from '../../components/Common/Select/Sex';

import { USERINFO_UPDATE_REQUEST } from '../../reducers/user';

import './Profile.css';

function Profile() {
    const dispatch = useDispatch();
    
    const {userInfo} = useSelector((state) => state.userReducer);

    const [editmode,setEditmode] = useState(false);
    const [editNickname,setEditNickname] = useState(userInfo.nickname);
    const [editText,setEditText] = useState(userInfo.introduce);
    const [editSex,setEditSex] = useState(userInfo.sex);
    const [editAge,setEditAge] = useState(userInfo.age);
    const [editPassword,setEditPassword] = useState('');
    
    console.log(userInfo.nickname+",,,,"+editNickname)

    const UpdateClick = useCallback(()=>{

        const User = new Object();
        User.nickname = editNickname; 
        User.introduce = editText;
        User.sex = editSex;
        User.age = editAge;
        User.password2 = editPassword;
        User.introduce = editText;

        dispatch({
            type: USERINFO_UPDATE_REQUEST,
            data: User,
          });
    },[editNickname,editText,editSex,editAge,editPassword])
    return (
        <>
        <MainLogo />
        <div className="container">
            <header>
                <section className="profile">
                    <div className="image">
                        
                        <ProfileImage />
                    </div>
                    <div className="info">
                        <div className="top-row">
                        {/* {editmode?
                            (
                                <>
                                    <input type="text" name="nickname" size="20" value={editText} onChange={(e)=>setEditText(e.target.value)} />
                                    <button onClick={()=>UpdateProfile({editText})}>수정하기</button>
                                </>
                            ):
                            (
                                <h2>{userInfo.nickname}</h2>
                            )} */}
                            <h2><input type="text" name="nickname" size="20" value={editNickname} onChange={(e)=>setEditNickname(e.target.value)} /></h2>
                        </div>
                        {/* <div className="edit-profile">
                            <button id="edit-profile" type="button" onClick={EditProfile}>Edit Profile</button>
                        </div> */}
                            {/* <div className="settings">
                                <button id="settings" type="button">
                                    <svg aria-label="Options" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path clip-rule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fill-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div> */}
                        <ul className="stats">
                            <li>성별<Sex sex={editSex} setEditSex={setEditSex} /></li>
                            <li>나이<Age age={editAge} setEditAge={setEditAge} /></li>
                        </ul>
                        <textarea value={editText} onChange={(e)=>setEditText(e.target.value)} style={{width:400,height:100,borderStyle:"none"}} />
                        <div className="pw_area">
                            <h1>비밀번호 변경하기</h1>
                            <div className="pw_area_input">
                                <div><input type="password" name="user_password" value={editPassword} onChange={(e)=>setEditPassword(e.target.value)} /></div>
                                <div><input type="password" name="user_password" /></div>
                            </div>
                        </div>
                        <div>
                            <button onClick={UpdateClick}>수정하기</button>
                        </div>
                    </div>
                    
                </section>                
            </header>

        </div>
        <MainNav />
        </>
    )
}

export default Profile
