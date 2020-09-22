import React,{useEffect,useState} from 'react'
import Feeds from '../components/Feed/Feeds'
import LoginForm from '../components/LoginForm'
import PostForm from '../components/Feed/PostForm';
import {useSelector,useDispatch } from 'react-redux';
import { USER_INFO_REQUEST } from '../reducers/user';
function Home() {
  const dispatch = useDispatch();
  const { me,logInDone} = useSelector((state) => state.userReducer);

  const user = window.sessionStorage.getItem('user')
  useEffect(() => {
    if (me) {
      window.sessionStorage.setItem('user',me);
      dispatch({
        type: USER_INFO_REQUEST
      });
    }
  }, [me]);
  
    return (
      <div>
        
      { me? <PostForm />:<LoginForm />}
      <Feeds />
      {/* <Feeds /> */}
      </div>
    )
}

export default Home
