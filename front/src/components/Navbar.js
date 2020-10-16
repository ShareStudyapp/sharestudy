//MainNav로 갈아탐
// import React,{useCallback,useEffect} from 'react'
// import {Link} from 'react-router-dom';
// import { Breadcrumb } from 'antd';
// import { useDispatch,useSelector } from 'react-redux';
// import { logoutRequestAction } from '../reducers/user';
// import './Navbar.css';

// function Navbar() {
//     const dispatch = useDispatch();
//     const { logOutDone} = useSelector((state) => state.userReducer);
//     const login_valid = window.sessionStorage.getItem('login_valid')    
//     const onLogOut = useCallback(() => {        
//         const token = window.sessionStorage.getItem('user')    
//         dispatch(logoutRequestAction(token));
//         window.sessionStorage.removeItem('login_valid');
      
//     }, []);
//     useEffect(() => {
//         if(logOutDone){
//             window.sessionStorage.removeItem('user');
//         } 
//     }, [logOutDone])

//     return ( 
//         <div className="nav_menu">
//          <Breadcrumb>
//             <Breadcrumb.Item>
//                 <Link to="/">Home</Link>
//             </Breadcrumb.Item>
//             {login_valid?
//             (''):
//             <Breadcrumb.Item>
//                 <Link to="/signup">회원가입</Link>
//             </Breadcrumb.Item>}
//             {login_valid?
//             <>
//             <Breadcrumb.Item>
//                 <a onClick={onLogOut}>로그아웃</a>
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>
//                 <Link to="/profile">내 프로필</Link>
//             </Breadcrumb.Item>
//             </>
//             :('')}
//             <Breadcrumb.Item>스터디그룹 찾기</Breadcrumb.Item>            
//             <Breadcrumb.Item>
//                 <Link to="/todolist">목표설정</Link>
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>
//                 <Link to="/messenger">메신저</Link>
//             </Breadcrumb.Item>
//         </Breadcrumb>
//         </div>
//     )
// }

// export default Navbar
