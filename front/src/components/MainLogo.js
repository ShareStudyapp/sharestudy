import React from 'react'
import logo from '../assets/images/logo.png';
import search from '../assets/Button/search.png';
import noti from '../assets/Button/noti.png';

import './MainLogo.css';

function MainLogo() {
    return (
        <div className="top">
            <div className="top_logo">
                <img src={logo} />
            </div>
            <div className="top_feature">
                <img src={search} />
                <img src={noti} />
            </div>
        </div>
    )
}

export default MainLogo
