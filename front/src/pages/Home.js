import React,{useState} from 'react'
import Feeds from '../components/Feed/Feeds'
import LoginForm from '../components/LoginForm'
import PostForm from '../components/Feed/PostForm';

import {useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';

import ButtonWrite from '../assets/Button/button_write.png';
import './Home.css';
import {Link} from 'react-router-dom';

import MainLogo from '../components/Common/MainLogo';
import MainNav from '../components/Common/MainNav';

function Home({history}) {
  
  const { me,userInfo,logOutDone} = useSelector((state) => state.userReducer);
  const reqUserInfo = false;//내정보인지 타인의정보인지..
  const responseGoogle = (response) => {
    window.sessionStorage.setItem('google_information',JSON.stringify(response));
    //history.push('/signup');
  }
    return (
      <>
      <div>
        <MainLogo />
        
        <>
          <Feeds reqUserInfo={reqUserInfo}/><Link to="/writefeed"><img src={ButtonWrite} className="button_write"/></Link>
        </>
      {/* { user? <><Feeds /><Link to="/writefeed"><img src={ButtonWrite} className="button_write"/></Link></>:<LoginForm />}  */}
      {/* {user?<Feeds />: <LoginForm />} */}
      {/* { login?"":<GoogleLogin
          clientId="731014591837-ej91nk0hfgf42hfssm12j4uop6ig9hce.apps.googleusercontent.com"
          buttonText="연동하기"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />} */}

        <MainNav />
      </div>
        
      </>
    )
}

export default Home
