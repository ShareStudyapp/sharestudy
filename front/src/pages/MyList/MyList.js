import React from 'react'
import MainLogo from '../../components/Common/MainLogo';
import MainNav from '../../components/Common/MainNav';
import {useSelector } from 'react-redux';
import Signin from '../../components/LoginForm';
import RequireLogin from '../../components/Common/RequireLogin';
import {Link} from 'react-router-dom';
import Feeds from '../../components/Feed/Feeds'
import ButtonWrite from '../../assets/Button/button_write.png';
function MyList() {

    const { me,userInfo,logInDone} = useSelector((state) => state.userReducer);
    const reqUserInfo = true;
    return (
        <div>
            <MainLogo />
            {userInfo.length != 0||me?
                <>
                    <Feeds reqUserInfo={reqUserInfo} /><Link to="/writefeed"><img src={ButtonWrite} className="button_write"/></Link>
                </>
            :<RequireLogin />}
            <MainNav />
        </div>
    )
}

export default MyList
