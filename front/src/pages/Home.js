import React,{useEffect} from 'react'
import Feeds from '../components/Feed/Feeds'
import LoginForm from '../components/LoginForm'
import PostForm from '../components/Feed/PostForm';

import {useSelector,useDispatch } from 'react-redux';
import { USER_INFO_REQUEST } from '../reducers/user';
import GoogleLogin from 'react-google-login';

import ButtonWrite from '../assets/Button/button_write.png';
import './Home.css';
import {Link} from 'react-router-dom';


function Home({history}) {
  const dispatch = useDispatch();
  const { me,userInfo,logOutDone} = useSelector((state) => state.userReducer);
  
  const user = window.sessionStorage.getItem('user')//유저토큰 
  const login = window.sessionStorage.getItem('login_valid')//로그인여부

  useEffect(() => {
    if (me) {
      window.sessionStorage.setItem('user',me);
      window.sessionStorage.setItem('login_valid',"temp");
      
    }
    if (user) {//로그인했을떄 정보 요청
      dispatch({
        type: USER_INFO_REQUEST
      });
    }
  }, [me]);
  useEffect(()=>{
   
  },[])
  
  
  const responseGoogle = (response) => {
    window.sessionStorage.setItem('google_information',JSON.stringify(response));
    //history.push('/signup');
  }
 
    return (
      <>
      <div>
      { login? "":<LoginForm />}
      { login?"":<GoogleLogin
          clientId="731014591837-ej91nk0hfgf42hfssm12j4uop6ig9hce.apps.googleusercontent.com"
          buttonText="연동하기"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />}

      <Feeds />
      </div>
        <Link to="/writefeed"><img src={ButtonWrite} className="button_write"/></Link>
      </>
    )
}

export default Home
