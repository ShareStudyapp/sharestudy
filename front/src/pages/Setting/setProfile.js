import React,{useState,useCallback} from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { RightOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage/ProfileImage';

import { USERINFO_UPDATE_REQUEST } from '../../reducers/user';
import { Button } from 'antd';
import './styles.scss';

//마이 페이지 재설정
const SetProfile = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.userReducer);
  const [nickName,setNickName] = useState(userInfo&&userInfo.nickname);
  const [introduce,setIntroduce] = useState(userInfo&&userInfo.introduce);
  
  const UpdateClick = useCallback(()=>{
    const User = new Object();
    User.nickname = nickName; 
    User.introduce = introduce;

    return dispatch({
        type: USERINFO_UPDATE_REQUEST,
        data: User,
      });
},[nickName,introduce]);
  return (
    <>
      <Header />
      <div className="setProfile">
        <div className="setProfile__myphoto">
          <div className="photo">
            {/* <Avatar /> */}
            <ProfileImage />
            {/* <button>
              <svg
                className="camera"
                width="35"
                height="35"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="37" cy="37" r="37" fill="#999999" />
                <path
                  d="M30.875 18.75L27.4438 22.5H21.5C19.4375 22.5 17.75 24.1875 17.75 26.25V48.75C17.75 50.8125 19.4375 52.5 21.5 52.5H51.5C53.5625 52.5 55.25 50.8125 55.25 48.75V26.25C55.25 24.1875 53.5625 22.5 51.5 22.5H45.5562L42.125 18.75H30.875ZM36.5 46.875C31.325 46.875 27.125 42.675 27.125 37.5C27.125 32.325 31.325 28.125 36.5 28.125C41.675 28.125 45.875 32.325 45.875 37.5C45.875 42.675 41.675 46.875 36.5 46.875Z"
                  fill="white"
                />
              </svg>
            </button> */}
          </div>
        </div>

        <form className="setProfile__form">
          <div className="row">
            <div className="col-25">
              <label for="name">닉네임</label>
            </div>
            <div className="col-75">
              <input type="text" 
                     id="name" 
                     name="name" 
                     value={nickName} 
                     onChange  ={ e => setNickName(e.target.value)} 
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="birth">생년월일</label>
            </div>
            <div className="col-75">
              <input type="text" id="birth" name="birth" value={userInfo.age} disabled/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="email">이메일</label>
            </div>
            <div className="col-75">
              <input type="text" id="email" name="email" value={userInfo.email} disabled/>
            </div>
          </div>
          <div className="row">
            <div className="col-100">
              <label for="Introduce">한줄소개</label>
            </div>

            <div className="col-100 row-40">
              <input 
                  type="text" 
                  id="Introduce" 
                  name="Introduce" 
                  value={introduce} 
                  onChange  ={ e => setIntroduce(e.target.value)} 
               />
            </div>
          </div>
        </form>

        <button className="password" type="submit">
          비밀번호 변경하기 <RightOutlined />
        </button>

        <div className="setProfile__save">
          <Button className="setProfile__save--btn" onClick={UpdateClick}>
            저장하기
          </Button>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default SetProfile;
