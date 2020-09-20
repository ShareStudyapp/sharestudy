import React,{useCallback} from 'react'
import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';


function Navbar() {
    const dispatch = useDispatch();
    const onLogOut = useCallback(() => {
        //dispatch(logoutRequestAction());
        window.sessionStorage.removeItem('user');
        window.location.reload()
    }, []);
    return ( 
        <>
         <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to="/signup">회원가입</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            <a onClick={onLogOut}>로그아웃</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}

export default Navbar
