import React from 'react'
import './RequireLogin.css';
import {Link} from 'react-router-dom';

function RequireLogin() {
    return (
        <div className="Login_area">
            <Link to="/signin"><button>로그인하기</button></Link>
        </div>
    )
}

export default RequireLogin
