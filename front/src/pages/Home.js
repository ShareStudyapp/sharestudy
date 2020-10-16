import React,{useEffect} from 'react'
import Feeds from '../components/Feed/Feeds'
import LoginForm from '../components/LoginForm'
import PostForm from '../components/Feed/PostForm';
import {useSelector,useDispatch } from 'react-redux';
import { USER_INFO_REQUEST } from '../reducers/user';
function Home() {
  const dispatch = useDispatch();
  const { me,logInDone} = useSelector((state) => state.userReducer);

  const user = window.sessionStorage.getItem('user')//유저토큰 
  const login = window.sessionStorage.getItem('login_valid')//로그인여부
  
  useEffect(() => {
    if (me) {
      window.sessionStorage.setItem('user',me);
      window.sessionStorage.setItem('login_valid',"temp");
      dispatch({
        type: USER_INFO_REQUEST
      });
    }
  }, [me]);
  
    return (
      <div>
      { login? <PostForm />:<LoginForm />}
      <Feeds />
      {/* <Feeds /> */}
      </div>
    )
}

export default Home
