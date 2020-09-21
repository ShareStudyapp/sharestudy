import React,{useEffect,useState} from 'react'
import Feeds from '../components/Feed/Feeds'
import LoginForm from '../components/LoginForm'
import Signup from './Signup'
import { useSelector } from 'react-redux';

function Home() {
  const { me,logInDone} = useSelector((state) => state.userReducer);

  const user = window.sessionStorage.getItem('user')
  useEffect(() => {
  console.log(logInDone)
    if (me) {
      window.sessionStorage.setItem('user',me);
    }
  }, [me]);
  
    return (
      <div>
        
      { me? <Feeds />:<LoginForm />}
      {/* <Feeds /> */}
      </div>
    )
}

export default Home
