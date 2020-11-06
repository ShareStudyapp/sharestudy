import React from 'react'
import {Link} from 'react-router-dom';
import home_inactive from '../../assets/MainNav/home_inactive.png';
import todo_inactive from '../../assets/MainNav/todo_inactive.png';
import todofeed_inactive from '../../assets/MainNav/todofeed_inactive.png';
import my_inactive from '../../assets/MainNav/my_inactive.png';
import './MainNav.css';

function MainNav({history}) {
    const login_valid = window.sessionStorage.getItem('login_valid')    

    return (
        <div className="foot_bar">
            <div className="foot_bar_wrap">
                {/* <a href="#none" class="bar_icon search">홈</a>
                <a href="#none" class="bar_icon search">검색</a>
                <a href="#none" class="bar_icon add">추가</a>
                <a href="#none" class="bar_icon info">내정보</a> */}
                <Link to="/"><img src={home_inactive} className="foot_bar_img" /></Link>
                {/* {login_valid?
                <>
                    <a href="#" onClick={onLogOut}>로그아웃</a>
                    <Link to="/profile">내 프로필</Link>
                </>
                :('')} */}
                {/* <Link to="/todolist">목표설정</Link>  */}
                <Link to="/mytodolist"><img src={todo_inactive} className="foot_bar_img" /></Link>
                <Link to="/todofeed"><img src={todofeed_inactive} className="foot_bar_img" /></Link>
                <Link to="/mylist"><img src={my_inactive} className="foot_bar_img" /></Link>
                {/* <Link to="/messenger">메신저</Link> */}
            </div>  
        </div>
    )
}

export default MainNav
