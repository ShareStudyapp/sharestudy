import React,{Suspense, lazy,useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux';
import './App.css';
import 'antd/dist/antd.css';
import Home from './pages/Home';

import {SyncLoader} from 'react-spinners';
import { css } from "@emotion/core";
import { USER_INFO_REQUEST } from './reducers/user';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
//const Navbar = lazy(()=>import('./components/Navbar'));
// const Home = lazy(()=>import('./pages/Home'));
const Signin = lazy(()=>import('./components/LoginForm'));
const Signup = lazy(()=>import('./pages/Signup'));
const DetailFeed = lazy(()=>import('./components/Feed/DetailFeed'));
const WriteFeed = lazy(()=>import('./pages/Feed/WriteFeed'));
const Products = lazy(()=>import('./pages/Products'));
const Profile = lazy(()=>import('./pages/Profile/Profile'));
const MyTodoList = lazy(()=>import('./pages/TodoList/MyTodoList'));
const MyList = lazy(()=>import('./pages/MyList/MyList'));
const Messenger = lazy(()=>import('./pages/Messenger'));
const TodoFeed = lazy(()=>import('./pages/TodoFeed/TodoFeed'));
const Main = lazy(()=>import('./pages/Login/Main'));

function App({history}) {
  const dispatch = useDispatch();
  
  
  const user = window.sessionStorage.getItem('user')//로그인여부
  const userPersist = () =>{
    if(user){
      dispatch({
        type: USER_INFO_REQUEST
      });
    }
  }
  userPersist();
  
  return (
    <div className="main_container">
    <Router>
      <Suspense fallback={<SyncLoader css={override} size={20} color="green" loading style={{width:50}} />}>
        <CacheSwitch>
          <CacheRoute exact path="/" component={Home} />
          <Route exact path="/feeddetail/:id" component={DetailFeed} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/writefeed" component={WriteFeed} />
          <Route path="/products" component={Products} />
          <Route path="/profile" component={Profile} />
          {/* <Route path="/todolist" component={TodoList} /> */}
          <Route path="/mytodolist" component={MyTodoList} />
          <CacheRoute path="/mylist" component={MyList} />
          <Route path="/messenger" component={Messenger} />
          <Route path="/todofeed" component={TodoFeed} />
        </CacheSwitch>
      </Suspense>
      {/* {me || user?<MainNav />:""} */}
    </Router>
    </div>
  );
}

export default App;
