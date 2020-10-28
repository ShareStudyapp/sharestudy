import React from 'react'
import './FeedUserProfile.css';
import { useSelector } from 'react-redux';
function FeedUserProfile() {
    const {userInfo} = useSelector((state) => state.userReducer);
    
    return (
        <div className="profile_area">
            <div>
                <div className="profile_info_area">
                    <div>
                        <img className="user_profile_image" src={userInfo.profileImage}/>
                    </div>
                    <div>
                        userNickname 남 30
                    </div>
                </div>
                <ul className="profile_follow_area">
                    <li>
                    <button>
                            프로필편집
                    </button>
                    </li>
                    <li>
                        Follow {userInfo.followlistsize}
                    </li>
                    <li>
                        Follower {userInfo.followerlistsize}
                    </li>
                </ul>
                <div>
                    {userInfo.introduce}
                </div>
            </div>
      </div>
    )
}

export default FeedUserProfile;
