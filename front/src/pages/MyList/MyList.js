import React from 'react'
import MainLogo from '../../components/Common/MainLogo';
import MainNav from '../../components/Common/MainNav';
import {useSelector } from 'react-redux';
import Signin from '../../components/LoginForm';
import RequireLogin from '../../components/Common/RequireLogin';

function MyList() {

    const { me,userInfo,logOutDone} = useSelector((state) => state.userReducer);

    return (
        <div>
            <MainLogo />
            {me?<>
                test
                </>
            :<RequireLogin />}
            <MainNav />
        </div>
    )
}

export default MyList
