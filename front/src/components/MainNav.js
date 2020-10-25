import React,{useCallback,useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

import './MainNav.css';

function MainNav() {
    const dispatch = useDispatch();
    const { logOutDone} = useSelector((state) => state.userReducer);
    const login_valid = window.sessionStorage.getItem('login_valid')    
    const onLogOut = useCallback(() => {        
        const token = window.sessionStorage.getItem('user')    
        dispatch(logoutRequestAction(token));
        
    }, []);
    

    return (
        <div className="foot_bar">
            <div className="foot_bar_wrap">
                {/* <a href="#none" class="bar_icon search">홈</a>
                <a href="#none" class="bar_icon search">검색</a>
                <a href="#none" class="bar_icon add">추가</a>
                <a href="#none" class="bar_icon info">내정보</a> */}
                <Link to="/">Home</Link>
                <Link to="/signup">회원가입</Link> 
                {login_valid?
                <>
                    <a href="#" onClick={onLogOut}>로그아웃</a>
                    <Link to="/profile">내 프로필</Link>
                </>
                :('')}
                <Link to="/todolist">목표설정</Link> 
                <Link to="/mytodolist">목표설정공사중</Link>
                <Link to="/messenger">메신저</Link>
            </div>  
        </div>
    )
}

export default MainNav
