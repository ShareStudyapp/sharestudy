import React from 'react'
import './UserProfile.css';
import { useSelector } from 'react-redux';
function UserProfile() {
    const {userInfo} = useSelector((state) => state.userReducer);
    
    console.log(userInfo)
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
                <div className="profile_follow_area">
                    <button>
                            프로필편집
                    </button>
                    <div>
                        Follow 100
                    </div>
                    <div>
                        Follower 100
                    </div>
                </div>
                <div>
                    {userInfo.introduce}
                </div>
            </div>
      </div>
    )
}

export default UserProfile;
